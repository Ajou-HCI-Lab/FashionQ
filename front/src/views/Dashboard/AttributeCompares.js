/* eslint-disable prettier/prettier,react/prop-types,no-console */
import React from 'react';
// import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import AttributeDescription from "./AttributeDescription";
import Popup from "reactjs-popup";
import representativeAttrs from '../../datas_json/representative_attributes'
// import {makeStyles} from "@material-ui/core";
// import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
//
//
// const useStyles = makeStyles(styles);
// const classes = useStyles();


class Attribute extends React.Component {
    constructor(props) {
        super(props);
    }

    returnColor() {
        let attr = this.props.attr;
        let jaccard_position= this.props.jaccard_position;
        if(this.props.groupNum !==null){
            if (representativeAttrs[this.props.groupNum].indexOf(attr) >= 0) {
                if(jaccard_position == 0){
                    return '#5fa038';
                }else if(jaccard_position == 1){
                    return '#fb4c3d'
                }else{
                    return '#fdb40b'
                }
            }
        }else{
            return null
        }


    }

    render() {
        return (
            <TableCell
                style={{
                    width: '1px',
                    padding: '3.5px', margin: '0',
                    border: '1px solid #000000',
                    backgroundColor: this.returnColor(),
                }}>
                <Popup trigger={open => (
                    <button style={{
                        backgroundColor: this.returnColor(),
                        padding: '0px',
                        height: '150px',
                        width: '150%',
                    }}
                            className="button"
                    ></button>)}
                       style={{
                           zIndex: '99999999 !important',
                       }}
                       position="right center">
                    {close => <AttributeDescription styleName={this.props.attr} close={close}/>}
                </Popup></TableCell>
        )
    }
}

export default Attribute;
