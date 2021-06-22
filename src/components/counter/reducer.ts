import * as A from './action';
// eslint-disable-next-line no-unused-vars
import { counterActionType } from './actionType';

// 每个reducer都有各自的state和action，最后进行组合
function counterReducer(state = { count: 0 }, action: counterActionType) {
  const { count } = state;
  switch (action.type) {
    case A.INCREASE:
      return { count: count + 1 };
    case A.DECREASE:
      return { count: count - 1 };
    case 'something else':
      return { ...state, test: action.payload };
    default:
      return state;
  }
}

export default counterReducer;
