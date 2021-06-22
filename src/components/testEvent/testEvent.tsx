// import React from 'react';

// /**
//  * 用来测试react事件和原生事件的顺序
//  * 当然最好是读源码
//  * 但本人太菜
//  */
// export default class testEvent extends React.Component {
//   componentDidMount() {
//     // this.parent.addEventListener('click', (e) => {
//     //   console.log('dom parent');
//     // });
//     // this.child.addEventListener('click', (e) => {
//     //   console.log('dom child');
//     // });
//     document.addEventListener('click', (e) => {
//       console.log('document');
//     });
//   }

//   childClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     console.log('react child');
//   };

//   parentClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     console.log('react parent');
//   };

//   render() {
//     return (
//       // <div onClick={this.parentClick} ref={(ref) => (this.parent = ref)}>
//       //   <div onClick={this.childClick} ref={(ref) => (this.child = ref)}>
//       //     test
//       //   </div>
//       // </div>
//       <div>
//         lll
//       </div>
//     )
//   }
// }
