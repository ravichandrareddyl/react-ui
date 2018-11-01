import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { loader } from './loading.reducer';
import { forms } from './forms.reducers';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  loader,
  forms
});

export default rootReducer;