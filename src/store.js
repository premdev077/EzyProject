import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
    key: 'basketState',
    storage: storage,
    whitelist: ['basketState']
};

const pReducer = persistReducer(persistConfig, rootReducer);
const middleware =  composeWithDevTools(applyMiddleware(thunk));
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
export { persistor, store };