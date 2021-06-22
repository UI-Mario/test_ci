/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { createRef, RefObject } from 'react';

/**
 * 必须的用类组件才能挂载上去，因为函数组件没有实例
 * 但是函数式组件可以用useRef来实现
 */
class TestRefFuctionComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>Im fc_component_ref_TEST</p>
      </div>
    );
  }
}

// const TestRefFuctionComponent = () => (
//   <div>
//     <p>Im fc_component_ref_TEST</p>
//   </div>
// );

// eslint-disable-next-line import/prefer-default-export
export const TestRef = () => {
  // 比较扯的的是我必须加个这类型声明，怎么才能写成通用的呢
  const myRef: RefObject<any> = createRef();

  const myClick = () => {
    console.log(myRef.current);
    // myRef.current!.value = 'hhh';
  };

  return (
    <div>
      <p>123</p>
      <input type="text" />
      <TestRefFuctionComponent ref={myRef} />
      <input type="button" value="focus" onClick={myClick} />
    </div>
  );
};
