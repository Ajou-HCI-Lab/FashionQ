/* eslint-disable react/display-name,react/prop-types,prettier/prettier */
import React from 'react';

class AttributeDescription extends React.Component {

    erasenumAndUnderbar(str) {
        var res;
        res = str.replace(/[^a-zA-Z_]/g, "").replace(/_/g, ' ');
        return res;
    }


    render(close) {
        return (
            <div className="modal">
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="content">
                    <h5>{this.erasenumAndUnderbar(this.props.styleName)}</h5>
                </div>
            </div>
        )
    }
}

export default AttributeDescription;
// export default ({ close }) => (
//   <div  className="modal">
//     <a className="close" onClick={close}>
//       &times;
//     </a>
//     <div className="header"> Your Look </div>
//     <div className="content">
//         <h1>{this.props.styleName}</h1>
//     </div>
//   </div>
// );
