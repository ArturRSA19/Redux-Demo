const redux = require('redux')

const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qtt = 1){
    return {
        type: CAKE_RESTOCKED,
        payload: qtt
    }
}

function orderIceCream(qtt = 1){
    return {
        type: ICECREAM_ORDERED,
        payload: qtt
    }
}

function restockIceCream(qtt = 1){
    return {
        type: ICECREAM_RESTOCKED,
        payload: qtt
    }

}

const initialStateCake = {
    numOfCakes: 10
}

const initialStateIceCream = {
    numOfIceCreams: 15
}

const cakeReducer = (state = initialStateCake, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = initialStateIceCream, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({ // Combinando os reducers
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer)
console.log('Estado inicial', store.getState())

const unsubscribe = store.subscribe(() => 
    console.log('Estado atualizado', store.getState())
)

const actions = bindActionCreators(
    { orderCake, restockCake, orderIceCream, restockIceCream }, 
    store.dispatch
)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(2)
console.log('Estado atualizado depois de modificar os bolos: ', store.getState())
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(4)
console.log('Estado atualizado depois de modificar os sorvetes: ', store.getState())

unsubscribe()