/* eslint-disable react/display-name,react/prop-types,prettier/prettier */
import React from 'react';

export default ({ close }) => (
  <div  className="modal">
    <a className="close" onClick={close}>
      &times;
    </a>
    <div className="header"> Your Look </div>
    <div className="content">
      {''}
      Attribute box는 Attribute 정보를 단순 시각화 시킨 것을 의미하며
    <br/>2개의 박스가 존재한다. 사용자의 look의 attribute 정보를 정리한
        <br/>box(blue)와 FashionQ 에서 정의한 25개 중 사용자의 attribute box와
        <br/>유사한 style의 box이다. Top 3 Style과 각각의 유사 정도 정보를 제공한다.
        <br/>사용자는 Top3 정보 중 선택을 할 수가 있다.
    </div>
  </div>
);
