/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, createRef, RefObject, useEffect, useReducer, useRef, useState } from 'react';
// eslint-disable-next-line import/prefer-default-export
export const TreeMap = () => {
  // 比较扯的的是我必须加个这类型声明，怎么才能写成通用的呢
  const myRef: RefObject<any> = createRef();
  const [data, setData] = useState({
    name: 'root',
    value: 55,
    children: [
      {
        name: '分类 1',
        value: 2,
      },
      {
        name: '分类 2',
        value: 10,
      },
      {
        name: '分类 3',
        value: 4,
      },
      {
        name: '分类 4',
        value: 3,
      },
      {
        name: '分类 5',
        value: 7,
      },
      {
        name: '分类 6',
        value: 5,
      },
      {
        name: '分类 7',
        value: 9,
      },
      {
        name: '分类 8',
        value: 8,
      },
      {
        name: '分类 9',
        value: 1,
      },
      {
        name: '分类 10',
        value: 6,
      },
    ],
  });
  // 对于层级地递归很多的函数，不想直接用setstate一个一个
  // 直接放最后，整个替换
  // const treeMap = (parent, x0, y0, x1, y1) => {
  //   var nodes = parent.children,
  //     i,
  //     n = nodes.length,
  //     sum,
  //     sums = new Array(n + 1);

  //   for (sums[0] = sum = i = 0; i < n; ++i) {
  //     sums[i + 1] = sum += nodes[i].value;
  //   }

  //   partition(0, n, parent.value, x0, y0, x1, y1);

  //   function partition(i, j, value, x0, y0, x1, y1) {
  //     if (i >= j - 1) {
  //       var node = nodes[i];
  //       (node.x0 = x0), (node.y0 = y0);
  //       (node.x1 = x1), (node.y1 = y1);
  //       return;
  //     }

  //     var valueOffset = sums[i],
  //       valueTarget = value / 2 + valueOffset,
  //       k = i + 1,
  //       hi = j - 1;

  //     while (k < hi) {
  //       var mid = (k + hi) >>> 1;
  //       if (sums[mid] < valueTarget) k = mid + 1;
  //       else hi = mid;
  //     }

  //     if (valueTarget - sums[k - 1] < sums[k] - valueTarget && i + 1 < k) --k;

  //     var valueLeft = sums[k] - valueOffset,
  //       valueRight = value - valueLeft;

  //     if (x1 - x0 > y1 - y0) {
  //       var xk = (x0 * valueRight + x1 * valueLeft) / value;
  //       partition(i, k, valueLeft, x0, y0, xk, y1);
  //       partition(k, j, valueRight, xk, y0, x1, y1);
  //     } else {
  //       var yk = (y0 * valueRight + y1 * valueLeft) / value;
  //       partition(i, k, valueLeft, x0, y0, x1, yk);
  //       partition(k, j, valueRight, x0, yk, x1, y1);
  //     }
  //   }
  // };
  const getSvgRectElements = () =>
    data.children.map((item) => {
      console.log(item);
      return (
        <rect
          key={item.name}
          x="50"
          y="20"
          width="150"
          height="150"
          style={{
            fill: 'blue',
            stroke: 'pink',
            strokeWidth: 5,
            fillOpacity: 0.1,
            strokeOpacity: 0.9,
          }}
        />
      );
    });
  const test = () => {
    console.log('test');
  };
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <g>{getSvgRectElements()}</g>
      </svg>
    </div>
  );
};
