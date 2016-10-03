import {combineReducers} from 'redux';

import summary from './summary';
import transactions from './transactions';
import reportsFilter from './reportFilter';

const rootReducer = combineReducers({
	summary,
	transactions,
	reportsFilter
});

export default rootReducer;