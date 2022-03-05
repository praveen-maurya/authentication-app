import { configureStore} from '@reduxjs/toolkit';
import LoginReduxReducer from './LoginReduxSlice'

const ReduxStore = configureStore({
    reducer: {
    loginRedux: LoginReduxReducer
}
}
);

export default ReduxStore;