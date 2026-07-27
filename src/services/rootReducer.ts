import { combineReducers } from '@reduxjs/toolkit';

import burgerConstructorReducer from './slices/burgerConstructorSlice';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { userReducer } from './slices/userSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import feedReducer from './slices/feedSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  profileOrders: profileOrdersReducer,
  feed: feedReducer,
  user: userReducer
});
