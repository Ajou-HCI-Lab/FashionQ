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
      Style map은 25개 style 대표 attribute를 차원
        <br/>축소하여 2차원 점 그래프로 표현한 map을 의미한다.
        <br/>사용자는 Style check에서 선택한 style의 위치를 볼 수 있다.
        <br/>또한, 이번 시즌 트 렌디한 스타일을 3개 스타일 위치를 파악할 수 있다.
    <br/>Attribute를 노란색 네모 박스로 표시해줍니다.
    </div>
  </div>
);
