import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* const initialData = loadState()
 */
const store = createStore(
    Reducer,
  /*initialData, */    
composeEnhancers(applyMiddleware(thunk))
)