import dispatcher from '../dispatcher';

export function setActiveTab(value)
{
   dispatcher.dispatch({
    type:"SET_SELECTED_INDEX",
    index : value
   }); 
}