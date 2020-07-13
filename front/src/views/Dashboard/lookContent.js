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
      Your Look에서는 사용자가 업로드한 사진에 있는
    <br/>Attribute를 노란색 네모 박스로 표시해줍니다.
    </div>
  </div>
);
