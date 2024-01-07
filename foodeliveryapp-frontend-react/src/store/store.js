import { createStore } from 'redux';
import loginLogoutReducerFunction from '../reducer/loginlogoutreducer';

const store =  createStore(loginLogoutReducerFunction);

export default store;