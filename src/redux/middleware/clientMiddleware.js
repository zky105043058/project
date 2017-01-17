export default (client)=>(store)=>(next)=>(action)=>{
    const {promise, types, ...rest} = action;
    if(typeof promise != 'function'){
        return next(action);
    }
    const [request, success, failure] = types;
    next({type: request, ...rest});
    return promise(client).then(
        (result) => next({result, type: success, ...rest}),
        (error) => next({error, type: failure, ...rest})
    ).catch((error)=>{
        console.log('数据请求出错');
       next({error, type: failure, ...rest});
    })
}