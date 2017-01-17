import superagent from 'superagent';
function formatUrl(url){
    if(global.__SERVER__){
        url = 'http://localhost:8000' + url;
    }else{
        url = '/graphql' + url;
    }
    return url;
}


export default class ApiClient{
    methods = ['get', 'post', 'del', 'put', 'patch'];
    constructor(){
        for(let method of this.methods){
            this[method] = (url,data,params)=>new Promise((resolve, reject)=>{

                let isQraphql;
                if(typeof url === 'object'){
                    params = data;
                    data = url;
                    url = '/graphql';
                    data.query = `{ rootQuery { ${data.query} } }`;
                    isQraphql = true;
                }

                const request = superagent[method](formatUrl(url));
                request.set("Content-Type", "application/json")
                       .set("Accept", "application/json");
                params && request.query(params);
                data && request.send(data);
                request.end((err,{body}) => err? reject(body || err) : resolve(isQraphql ? body.data.rootQuery : body));
            });;
        }
    }
}