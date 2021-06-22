import { combineReducers } from 'redux';
import countReducer from '../components/counter/reducer';

// 用来测试useReducer是否可以和总的redux合并，看样子不行
import { testReducer } from '../components/testHook/testReducer';

const reducer = combineReducers({
  count: countReducer,
  // testUseReducer: testReducer,
});

export type ReduxState = ReturnType<typeof reducer>;

export default reducer;
