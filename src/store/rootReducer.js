import { combineReducers } from '@reduxjs/toolkit';
import logInReducer from 'modules/auth/login/loginSlice';
export default combineReducers({
  login: logInReducer,
});
