import { adminAuthApi } from './API/adminAuth';
import adminAuthReducer from './pages/login/LoginSlice'
export default ({
    reducer: { 
        adminAuth:adminAuthReducer,
        [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminAuthApi.middleware),
});