


export const calculate = (value) => {
    return {type: 'CALCULATE', value}
}

export const clear = () => {
    return {type: 'CLEAR'}
}

export const change = value => {
    return {type: 'CHANGE', value}
}

export const split = value => {
    return {type: 'SPLIT', value}
}

export * as actions from './Actions'