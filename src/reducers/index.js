import {combineReducers} from 'redux';

import summary from './summary';
import transactions from './transactions';
import reportsFilter from './reportFilter';
import shop from './shop';

const rootReducer = combineReducers({
	summary,
	transactions,
	reportsFilter,
	shop
});

export default rootReducer;