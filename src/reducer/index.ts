import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Account, OAuth, userInfo, logout, attributes } from './account';
import { Polls, latest, respond, comment, all } from './poll';
import thunk from 'redux-thunk';

const composedEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const store = createStore(
    combineReducers({
        Polls, 
        Account
    }), 
    composedEnhancer(applyMiddleware(
        thunk
    )),
);

const Actions = {
    poll: {
        latest,
        respond,
        comment,
        all
    },
    account: {
        OAuth,
        userInfo,
        logout,
        attributes
    }
}

export {
    store, Actions
}