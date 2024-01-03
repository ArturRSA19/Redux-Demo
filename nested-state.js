const redux = require('redux')
const produce = require('immer').produce

const initialState = {
    name: 'Artur',
    address: {
        street: 'Ipê Amarelo',
        number: 701,
        city: 'BSB'
    }
}

const CHANGE_CITY = 'CHANGE_CITY'

const changeCity = (city) => {
    return {
        type: CHANGE_CITY,
        payload: city
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CITY:
            return {
                ...state,
                address: {
                    ...state.address,
                    city: action.payload
                }
            }
            default:
                return state
    }
}

const store = redux.createStore(reducer)
console.log('Estado Inicial: ', store.getState())
const unsubscribe = store.subscribe(() => {
    console.log('Estado Atual: ', store.getState())
})
store.dispatch(changeCity('Orlando'))
unsubscribe()