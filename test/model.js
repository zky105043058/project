const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/graphql');
const UserSchema = new mongoose.Schema({
    name: String
});

db.connection.once('open',()=>{
    console.log('连接成功！');
    const p = db.model('User',UserSchema).find().then((docs)=>console.log(docs));
    console.log(p);
});