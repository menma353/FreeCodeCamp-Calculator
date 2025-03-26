import { combineReducers } from "redux";

const pattern = /([+\-*/])/

const calculateReducer = (state = 0, action) => {
    switch(action.type){
        case 'CALCULATE':
            return eval(action.value);
        case 'CLEAR':
            return 0;
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