/* eslint-disable prettier/prettier,react/prop-types,no-console */
import React from 'react';
import Card from 'components/Card/Card.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import ModalImage from "react-modal-image";
import intersectionInformation from "../../datas_json/intersection_information";
import fashionShowLink from "../../datas_json/fashionShowLink";

// import ReactDOM from "react-dom";

class FashionQComponent extends React.Component {

    constructor(props) {
        super(props);
        this.intersectString = null;
        this.firstColor = null;
        this.secondColor = null;

        let first = this.props.first;
        let second = this.props.second;
        if (parseInt(this.stringTonumber(first)) < parseInt(this.stringTonumber(second))) {
            this.intersectString = first + '&' + second;
        } else {
            this.intersectString = second + '&' + first;
        }

        let firstPosition = this.props.positionfirst;
        console.log(firstPosition);
        if(firstPosition == 0){
            this.firstColor =  '#5fa038';
        }else if(firstPosition == 1){
            this.firstColor =  '#fb4c3d'
        }else{
            this.firstColor =  '#fdb40b'
        }

        let secondPosition = this.props.positionSecond;
        console.log(firstPosition);
        if(secondPosition == 0){
            this.secondColor =  '#a50000';
        }else if(secondPosition == 1){
            this.secondColor =  '#6dc365'
        }else{
            this.secondColor =  '#1979fe'
        }

    }


    stringTonumber(str) {
        var res;
        res = str.replace(/[^0-9]/g, "");
        return res;
    }

    erasenumAndUnderbar(str) {
        var res;
        res = str.replace(/[^a-zA-Z0-9_-]/g, "").replace(/_/g, ' ').replace(/-/g, ' ');
        return res;
    }

    erasenumAndUnderbar2(str) {
        console.log(str);
        var res;
        res = str.replace(/[^a-zA-Z_-]/g, "").replace(/_/g, ' ').replace(/-/g, ' ');
        console.log(res);
        return res;
    }

    intersectionAttributes() {

        const intersectionJson = intersectionInformation[this.intersectString];

        const intersectionWholeAttr = intersectionJson[0]['Whole_attribute'].map(key => {
            return (<Card
                style={{
                    display: 'inline-block', width: '47%', fontFamily: 'BebasNeue-Bold', fontSize: '28px', margin: '2px'
                }}
                key={key}>{this.erasenumAndUnderbar2(key)}</Card>);
        });

        const intersectionPartAttr = intersectionJson[0]['Part_attribute'].map(key => {
            return (<Card
                style={{
                    width: '47%',
                    display: 'inline-block',
                    fontFamily: 'BebasNeue-Bold',
                    fontSize: '28px',
                    margin: '2px'
                }}
                key={key}>{this.erasenumAndUnderbar2(key)}</Card>);
        });


        // this.intersectionLook(intersectionJson[0]['image']);


        return (
            <div>
                <div>
                    <div
                        style={{
                            textAlign: 'left', fontSize: '35px', fontFamily: 'BebasNeue-Bold'
                        }}>
                        WHOLE ATTRIBUTES <span style={{color: this.firstColor}}>STYLE {this.stringTonumber(this.props.first)}</span>
                    </div>
                    <div style={{
                        textAlign: 'left',
                    }}>
                        {intersectionWholeAttr}
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            textAlign: 'left', fontSize: '35px', fontFamily: 'BebasNeue-Bold'
                        }}>
                        PART ATTRIBUTES <span style={{color: this.secondColor}}>STYLE {this.stringTonumber(this.props.second)}</span>
                    </div>
                    <div style={{
                        textAlign: 'left',
                    }}>
                        {intersectionPartAttr}
                    </div>
                </div>
            </div>)

    }

    intersectionAttributesChange() {

        const intersectionJson = intersectionInformation[this.intersectString];

        const intersectionWholeAttr = intersectionJson[1]['Whole_attribute'].map(key => {
            return (<Card
                style={{
                    display: 'inline-block', width: '47%', fontFamily: 'BebasNeue-Bold', fontSize: '33px', margin: '2px'
                }}
                key={key}>{this.erasenumAndUnderbar2(key)}</Card>);
        });

        const intersectionPartAttr = intersectionJson[1]['Part_attribute'].map(key => {
            return (<Card
                style={{
                    width: '47%',
                    display: 'inline-block',
                    fontFamily: 'BebasNeue-Bold',
                    fontSize: '33px',
                    margin: '2px'
                }}
                key={key}>{this.erasenumAndUnderbar2(key)}</Card>);
        });


        return (
            <div>
                <div>
                    <div
                        style={{
                            textAlign: 'left', fontSize: '35px', fontFamily: 'BebasNeue-Bold'
                        }}>
                        WHOLE ATTRIBUTES <span style={{color: this.secondColor}}>STYLE {this.stringTonumber(this.props.second)}</span>
                    </div>
                    <div style={{
                        textAlign: 'left',
                    }}>
                        {intersectionWholeAttr}
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            textAlign: 'left', fontSize: '35px', fontFamily: 'BebasNeue-Bold'
                        }}>
                        PART ATTRIBUTES <span style={{color: this.firstColor}}>STYLE {this.stringTonumber(this.props.first)}</span>
                    </div>
                    <div style={{
                        textAlign: 'left',
                    }}>
                        {intersectionPartAttr}
                    </div>
                </div>
            </div>)

    }

    intersectionLook(imageList) {
        return (
            <div style={{
                textAlign: 'left'
            }}>
                {imageList.map(img => {
                    console.log(img);
                    return (
                        <div key={img}
                             style={{width: '20%', display: 'inline-block',}}>
                        <ModalImage
                            small={'/static/runway_images/' + img}
                            medium={'/static/runway_images/' + img}
                            large={'/static/runway_images/' + img}
                        /></div>
                    );
                })}
            </div>
        );
    }

    intersectionShow(brandList) {
        return (
            brandList.map(brand => {
                return (
                    <Card key={brand}>
                        <a href={fashionShowLink[brand]["Link"]} target={'_blank'}>
                            <div
                                style={{textAlign: 'center', fontSize: '40px', fontFamily: 'BebasNeue-Bold'}}>
                                {this.erasenumAndUnderbar(brand)}
                            </div>
                        </a>
                    </Card>
                )
            })
        )
    }


    render() {
        return (
            <>
                <Card style={{
                    width: '98%',
                    marginLeft: '10px',
                    marginRight: '10px',
                    padding: '10px',
                    marginBottom: '10px'
                }}>
                    <GridContainer
                        justify="center"
                        direction="row">
                        <GridItem style={{alignContent: 'center',}} xs={12} sm={3}>
                            {this.intersectionAttributes()}
                            {/*<div style={{textAlign: 'left'}} id={'intersectionAttributes'}/>*/}
                            <br/>
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <GridItem>
                                {this.intersectionLook(intersectionInformation[this.intersectString][0]['image'])}
                            </GridItem>
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                            <GridItem>
                                {this.intersectionShow(intersectionInformation[this.intersectString][0]['brand'])}
                            </GridItem>
                        </GridItem>
                    </GridContainer>
                </Card>
                <Card style={{
                    width: '98%',
                    marginLeft: '10px',
                    marginRight: '10px',
                    padding: '10px',
                    marginBottom: '10px'
                }}>
                    <GridContainer
                        justify="center"
                        direction="row">
                        <GridItem style={{alignContent: 'center',}} xs={12} sm={3}>
                            {this.intersectionAttributesChange()}
                            {/*<div style={{textAlign: 'left'}} id={'intersectionAttributes'}/>*/}
                            <br/>
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <GridItem>
                                {this.intersectionLook(intersectionInformation[this.intersectString][1]['image'])}
                            </GridItem>
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                            <GridItem>
                                {this.intersectionShow(intersectionInformation[this.intersectString][1]['brand'])}
                            </GridItem>
                        </GridItem>
                    </GridContainer>
                </Card>
            </>
        )
    }
}

export default FashionQComponent;
