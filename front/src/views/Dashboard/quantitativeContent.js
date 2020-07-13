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
      Quantitative style X는 사용자가 선택한 Style의 상세정보를
    <br/>제공하는 기능이다. 해당 스타일 대표 look과
        <br/>10년간 인기 추 세를 그래프로 확인할 수 있다.
    </div>
  </div>
);
