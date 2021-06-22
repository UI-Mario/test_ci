/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React from 'react';
// 这是抽什么风，告诉我never used
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ReduxState } from 'Src/redux/reducer';
import { actionDecrease, actionIncrease } from './action';
import Store from '../../redux/store';

// 真正从父组件获取的props，或者叫ownProps
interface CounterProps {}

interface CounterState {}

interface routeProps {}

type Iprops = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps> & CounterProps & routeProps;

class Counter extends React.Component<Iprops, CounterState> {
  constructor(props: Iprops) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('this is render');
    const { value, onIncreaseClick, onDecreaseClick } = this.props;
    return (
      <div>
        <span>{value.count}</span>
        <button
          type="button"
          onClick={() => {
            onIncreaseClick();
          }}
        >
          Increase
        </button>
        <button
          type="button"
          onClick={() => {
            onDecreaseClick();
          }}
        >
          Decrease
        </button>
        {/* 算是个小测试吧，因为redux的getstate输出的不是拷贝，直接是引用，所以可以改 */}
        <button
          type="button"
          onClick={() => {
            Store.getState().count.count = 100;
          }}
        >
          change store
        </button>
      </div>
    );
  }
}

// 返回一个对象，里面的每一个键值对就是一个对象
function mapStateToProps(state: ReduxState) {
  console.log('this is state2props');
  return {
    value: state.count,
  };
}

// 可以返回函数或对象
function mapDispatchToProps(dispatch: Dispatch, ownProps: CounterProps) {
  console.log('this is dispatch2props');
  return {
    onIncreaseClick: () => dispatch(actionIncrease()),
    onDecreaseClick: () => dispatch(actionDecrease()),
  };
}

// eslint-disable-next-line import/prefer-default-export
// 这些api自动完成subscribe
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
