import { configureStore } from '@reduxjs/toolkit';
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducers/UserReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';
import { otherReducer } from './reducers/otherReducer';

// export const server = 'https://tfpcoding.vercel.app/api/v1';
export const server = 'http://localhost:5000/api/v1';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    courses: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    other: otherReducer,
  },
});

export default store;
