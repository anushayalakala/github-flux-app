import dispatcher from '../dispatcher';

export function getUser(isEdit){
    dispatcher.dispatch({
        type:"GET_USER",
        isEdit
    });
}
export function errorHandeling(){
    dispatcher.dispatch({
        type:"ERROR_MSG",
        text:"error"
    })
}