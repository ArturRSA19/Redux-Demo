const redux = require('redux')
const produce = require('immer').produce

const initialState = {
    name: 'Artur',
    address: {
        street: 'Ipê Amarelo',
        number: 701,
        city: 'BSB',
        country: 'Brasil'
    }
}

const CHANGE_CITY = 'CHANGE_CITY'

const changeCity = (city) => {
    return {
        type: CHANGE_CITY,
        payload: city
    }
}

const CHANGE_COUNTRY = 'CHANGE_COUNTRY'

const changeCountry = (country) => {
    return {
        type: CHANGE_COUNTRY,
        payload: country
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CITY:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         city: action.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.city = action.payload
            })
        case CHANGE_COUNTRY:
            return produce(state, (draft) => {
                draft.address.country = action.payload
            })
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
store.dispatch(changeCountry('EUA'))
unsubscribe()