import { createStore, applyMiddleware, compose } from "redux";
import Reducer from "./reducers";
import thunk from "redux-thunk";
import {loadState, saveState} from './localStorage'

function saveToLocalStorage(state){
  try{
    const serializeState= JSON.stringify(state)
    localStorage.setItem('state', serializeState)
  }
  catch(e){
    console.log(e)
  }
}

function loadFromLocalStorage(){
  try{
    const serializedState = localStorage.getItem('state')
    if(serializedState === null) return undefined
    return JSON.parse(serializedState)
  }
  catch(e){
    console.log(e)
    return undefined
  }
}

const initialData = loadState()

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    Reducer,
    initialData, 
    composeEnhancers(
        applyMiddleware(thunk)
      )
    );

    store.subscribe(function(){
      saveState(store.getState().Order.guestCart)
    })

export default store
