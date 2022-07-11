import { adminAuthApi } from './API/adminAuth';
import adminAuthReducer from './pages/login/LoginSlice'
import frontAuthReducer from './Front/login/LoginSlice'
import {authApi} from './API/auth'
export default ({
    reducer: { 
        adminAuth:adminAuthReducer,
        [adminAuthApi.reducerPath]: adminAuthApi.reducer,
        auth:frontAuthReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminAuthApi.middleware),
});