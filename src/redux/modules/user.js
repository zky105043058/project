const LOAD = 'user/load';
const LOAD_SUCCESS = 'user/load_success';
const LOAD_FAIL = 'user/load_fail';
export default function reducer(state = {}, action = {}){
    switch(action.type){
        case LOAD: 
            return {loading: true, ...state};
        case LOAD_SUCCESS:
            return {loaded: true, result: action.result.users, ...state};
        case LOAD_FAIL:
            return {laoding: false, loaded: false, error: action.error, ...state};
        default:
            return state;
    }
}

export function load(){
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client) => {
            return client.post({
                query: `users {id name}`
            });
        }
    }
}