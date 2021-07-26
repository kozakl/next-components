import {applyMiddleware, combineReducers,
        createStore} from 'redux';
import {toasts} from './toasts';
import {StoreState} from '../types';
import thunk from 'redux-thunk';

const reducers = combineReducers<StoreState>({
    toasts
});

export const store = createStore(reducers, applyMiddleware(thunk));
