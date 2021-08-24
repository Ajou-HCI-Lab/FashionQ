/* eslint-disable prettier/prettier,react/prop-types,no-console */
import React from 'react';
// import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import AttributeDescription from './AttributeDescription';
import Popup from 'reactjs-popup';
// import {makeStyles} from "@material-ui/core";
// import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
//
//
// const useStyles = makeStyles(styles);
// const classes = useStyles();

// var list = ['collar',
//     'Top_Sweater_Boxy',
//     'Pants_Straight',
//     'Top_Cardigan_Regular',
//     'crochet',
//     'Argyle',
//     'pink',
//     'Houndstooth',
//     'Floral']

class Attribute extends React.Component {
    constructor(props) {
        super(props);
    }

    // constructor(props) {
    //     super(props);
    //     this.state ={
    //         group: this.props.group,
    //         length: null,
    //     };
    //
    //     this.state.length= this.getlength()
    //     console.log(this.state.length)
    //
    // }
    //
    // getlength(){
    //     if(this.props.group =='Type of clothes') return 60;
    // }

    returnColor() {
        var attr = this.props.attr;
        if (this.props.list.indexOf(attr) >= 0) {
            return '#159fec';
        }
        return null
    }


    render() {
        return (
            <TableCell
                style={{
                    width: '1px',
                    padding: '3.5px', margin: '0',
                    border: '1px solid #000000',
                    backgroundColor: this.returnColor(),
                }}
            >
                <Popup
                    trigger={open => (
                        <button style={{
                            backgroundColor: this.returnColor(),
                            padding: '0px',
                            height: '150px',
                            width: '150%',
                        }}
                                className="button"
                        ></button>
                    )}
                    style={{
                        zIndex: '99999999 !important',
                    }}
                    position="right center"
                >
                    {close => (
                        <AttributeDescription styleName={this.props.attr} close={close}/>
                    )}
                </Popup>
            </TableCell>
        );
    }
}

export default Attribute;
