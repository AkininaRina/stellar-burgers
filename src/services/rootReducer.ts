import { combineReducers } from '@reduxjs/toolkit';

import burgerConstructorReducer from './slices/burgerConstructorSlice';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { userReducer } from './slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer
});
