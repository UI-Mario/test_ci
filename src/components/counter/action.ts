// eslint-disable-next-line no-unused-vars
import { counterActionType } from './actionType';
// md又说我没用counterActionType，佛了

export const INCREASE = 'increase';
export function actionIncrease(): counterActionType {
  return {
    type: INCREASE,
    payload: {},
  };
}

export const DECREASE = 'decrease';
export function actionDecrease(): counterActionType {
  return {
    type: DECREASE,
    payload: {},
  };
}

/**
 * 可以新建一个fetchDataReducer.ts
 */
export const SEND_REQUEST = 'send_request';
export function sendRequest(data: any) {
  return {
    type: SEND_REQUEST,
    payload: data,
  };
}

export const SEND_REQUEST_SUCCESS = 'send_request_success';
export function sendRequestSuccess(user: any) {
  return {
    type: SEND_REQUEST_SUCCESS,
    payload: user,
  };
}

export const SEND_REQUEST_FAIL = 'send_request';
export function sendRequestFail(error: any) {
  return {
    type: SEND_REQUEST_FAIL,
    payload: {},
    error,
  };
}
