/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const TestPreLoadComponent = (): JSX.Element => {
  const nor_bg = 'https://i.imgur.com/01JdFPl.png';
  const act_bg = 'https://assets.codepen.io/222599/image+112.jpg';
  const [bg, setBg] = useState(nor_bg);
  //   情况是这样的
  // 假设有一个按钮，按下去之后会进行背景图片切换
  // 但是当图片太大，会有明显的延迟感，
  // 所以要想办法preload
  // 目前来说比较好的就是，拿img标签先去请求完所有图片资源，只是给个display:none，这样就完成了preload
  // 可也太丑了
  return (
    <div>
      <div
        onClick={() => {
          if (bg === nor_bg) {
            setBg(act_bg);
          } else {
            setBg(nor_bg);
          }
        }}
        style={{
          width: '300px',
          height: '300px',
          background: `url(${bg}) center center/100% 100% no-repeat`,
        }}
      >
        change Bg
      </div>
    </div>
  );
};
