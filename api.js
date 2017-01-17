const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const expressGraphql = require('express-graphql');
const {buildSchema} = require('graphql');
const app = express();
const schema = buildSchema(`
type User {id: Int, name: String}
type Weapon {id: Int, name: String}
type RootQueryType {users: [User], weapons: [Weapon]}
type Query {rootQuery: RootQueryType}
type Mutation {
    createUser(name: String): User
    deleteUser(id: Int): User
    updateUser(id: Int, name: String): User
}
`);
const rootValue = {
    rootQuery: function(){
        return {users: this.getUserList, weapons: this.getWeaponList}
    },
    getUserList: function(){
        return mongoose.model('User').find();
    },
    getWeaponList: function(){
        return [{id: 1, name: '方天画戟'},{id: 2, name: '青龙偃月刀'},{id: 3, name: '龙胆枪'}]
    },
    createUser: function(name){
        return {id: 102, name};
    }
};

app.use(expressGraphql({
    schema,
    rootValue,
    graphiql: true
}));

const modelDir = path.join(__dirname, 'src/models');
fs.readdirSync(modelDir)
  .forEach((file) => /\.js$/.test(file) && require(path.join(modelDir, file)));
  
const db = mongoose.connect('mongodb://localhost/graphql');
db.connection.once('open', () => {
    app.listen(8000,()=>console.log('api服务器启动成功！'));
})
