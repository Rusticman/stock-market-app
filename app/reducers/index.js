import { combineReducers } from 'redux';
import DataReducer from './data_reducer';
import ErrorReducer from './error_reducer';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
data:DataReducer,
error:ErrorReducer,
form:formReducer
});

export default rootReducer;
