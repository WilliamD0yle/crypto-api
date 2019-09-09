import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

const initialState = {};

export const store = createStore(
    rootReducer,
    initialState,
    process.env.NODE_ENV === 'development'
        ? composeWithDevTools(applyMiddleware(thunk))
        : applyMiddleware(thunk)
);

export const configureStore = () => {
    return store;
};
