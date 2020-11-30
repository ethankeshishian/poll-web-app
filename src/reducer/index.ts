import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Login, OAuth } from './login';
import { Register } from './register';
import { Polls, latest } from './poll';
import { Comments } from './comments';
import { Profile } from './profile';
import thunk from 'redux-thunk';

const composedEnhancer = compose;
  
const store = createStore(
    combineReducers({
        Polls, 
        Login
    }), 
    composedEnhancer(applyMiddleware(
        thunk
    ))
);

const Actions = {
    poll: {
        latest
    },
    login: {
        OAuth
    }
}

export {
    store, Actions
}