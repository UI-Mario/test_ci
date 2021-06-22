/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/**
 * @description 讲道理也是神奇，我都不用创建store啥的，
 * 不过这样redux插件也看不见，也不太好
 */
interface testUseReducerStateType {
  testCount: number;
}
interface testUseReducerActionType {
  type: string;
  payload?: object;
}
export const initialState: testUseReducerStateType = { testCount: 0 };
export const testReducer = (testUseReducerState: testUseReducerStateType, action: testUseReducerActionType) => {
  switch (action.type) {
    case 'increment':
      return { testCount: testUseReducerState.testCount + 1 };
    case 'decrement':
      return { testCount: testUseReducerState.testCount - 1 };
    default:
      throw new Error();
  }
};
