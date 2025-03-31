import { combineReducers } from "redux";

const pattern = /([+\-*/])/

const calculateReducer = (state = 0, action) => {
    switch(action.type){
        case 'CALCULATE':
            try{
                return eval(action.value)
            }
            catch{
                return " "
            }
        case 'CLEAR':
            return 0;
        case 'CHANGE':
            return action.value
        default:
            return state;

    }
}




const splitReducer = (state='', action) => {
    
    switch(action.type){
        case 'SPLIT':
            return action.value.split(pattern);
        default:
            return state
    }
}

const allReducers = combineReducers({
    calculate: calculateReducer,
    split: splitReducer
})

export default allReducers