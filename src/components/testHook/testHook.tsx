/* eslint-disable max-len */
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import axios from 'axios';
// redux-watch这个包只是为了测试写一个.d.ts文件，⚠️：.d.ts文件/文件夹必须在tsconfig里声明，
// 目前使用方法是tsconfig的include里写进types文件夹
import watch from 'redux-watch';

import { testReducer, initialState } from './testReducer';

// useState来传数据================y
// useEffect来模拟生命周期==========half
// useContext跳过=================
// useReducer感觉用的不普及，因为缺乏统一管理啥的吧，代码还是挺简单的======y
// useCallback
// useMemo
// useRef========================y
// useImperativeHandle
// useLayoutEffect
// useDebugValue
function TestHook() {
  const [data, setData] = useState({
    products: [
      {
        productId: '123',
        productName: 'macbook',
      },
      {
        productId: '321',
        productName: 'microsoft',
      },
    ],
    customer: {
      name: 'UI-Mario',
    },
  });

  // 太多useState很烦
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [count, setCount] = useState(0);
  const [state, setState] = useState({
    name: 'Mary',
    surname: 'Poppins',
    width: window.innerWidth,
  });

  /**
   * @description 通过依赖项数组来模拟生命周期(重新渲染前后依赖项不变，就跳过effect)，
   * 可以写多个，这样可以把不同的逻辑处理
   * 拆分开来，便于阅读
   * 一定要深刻理解它跟class生命周期之间的区别优劣
   * TODO:至今没搞明白，官网上这玩意儿可以返回一个函数，有啥应用场景吗
   */
  useEffect(() => {
    // 在没有依赖项的情况下，每次重新render后会被执行
    // 有依赖项的时候，每次render后对比依赖项的引用，想通就跳过本次effect
    console.log('this is useEffect');
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios('https://kkk');
        setData(result.data);
      } catch (e) {
        console.error(e);
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    // }, [count]);
  }, []);

  useEffect(() => {
    console.log('this is useEffect');
  });

  /**
   * @description 至今没搞懂这玩意用来干啥
   */
  const testUseCallback = useCallback(() => {
    console.log('count has been changed');
  }, [count]);

  const handleSetdata = () => {
    // Object.assign和扩展运算符，对于对象内的引用类型，都是浅拷贝
    const newData = { ...data };
    newData.products[0].productName = '111';
    setData(newData);
  };

  const handleSetSount = () => {
    setCount(0);
  };

  // 注释内容已被移到testReducer
  // /**
  //  * @description 讲道理也是神奇，我都不用创建store啥的，
  //  * 不过这样redux插件也看不见，也不太好
  //  */
  // interface testUseReducerStateType {
  //   testCount: number;
  // }
  // interface testUseReducerActionType {
  //   type: string;
  //   payload?: object;
  // }
  // const initialState: testUseReducerStateType = { testCount: 0 };
  // const reducer = (testUseReducerState: testUseReducerStateType, action: testUseReducerActionType) => {
  //   switch (action.type) {
  //     case 'increment':
  //       return { testCount: testUseReducerState.testCount + 1 };
  //     case 'decrement':
  //       return { testCount: testUseReducerState.testCount - 1 };
  //     default:
  //       throw new Error();
  //   }
  // };
  /**
   * @description 尝试与总的redux对接
   * react-redux还提供了一个useDispatch的api，why?
   */
  const [testUseReducer, dispatch] = useReducer(testReducer, initialState);

  const textEl = useRef<HTMLParagraphElement>(null);
  const changeText = () => {
    // console.log(textEl)
    // 这写得这么奇怪是因为不知道ref是否存在，找个好点写法（ts专有）
    // (textEl.current as unknown as HTMLElement).textContent += '1';
    // 改进后的写法：
    const { current: textElCur } = textEl;
    if (textElCur) {
      textElCur.textContent += '1';
    }
  };

  return (
    <div>
      <img src="./test_url_loader.png" alt="png to test url_loader" />
      <h5>-------------useState:</h5>
      <span>
        {state.name}
        {state.surname}
        {state.width}
      </span>
      <h5>-------------useEffect:</h5>
      {isError && <div>出错了...</div>}
      {isLoading ? <div>is loading</div> : null}
      <h5>-------------another use of useState</h5>
      <ul>
        {data.products.map((i) => (
          <li key={i.productId}>{i.productName}</li>
        ))}
      </ul>
      <p>{count}</p>
      <button type="button" onClick={handleSetSount}>
        change count
      </button>
      <button type="button" onClick={() => setCount((prevCount) => prevCount - 1)}>
        -
      </button>
      <button type="button" onClick={() => setCount((prevCount) => prevCount + 1)}>
        +
      </button>
      {testUseCallback()}
      <h5>-------------test of usereducer</h5>
      <p>
        Count:
        {testUseReducer.testCount}
      </p>
      <button type="button" onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button type="button" onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <h5>-------------test of useRef</h5>
      <p ref={textEl}>gggg</p>
      <button type="button" onClick={changeText}>
        change text
      </button>
      <h5>-------------custom hook</h5>
      {/* TODO: */}
    </div>
  );
}

export default TestHook;
