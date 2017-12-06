import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Image,Dimensions,Platform } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Content,CardItem,Thumbnail,Card,List,Item,Footer,FooterTab,Picker, Form, Item as FormItem} from 'native-base';
import PropTypes from 'prop-types';
import If from '../component/If'
import moment from "moment";
import {connect} from "react-redux";
import Font from "../theme/Font";
import {moderateScale} from "../theme/Scale";

const mapStateToProps = (state) => ({
    rooms: state.event.event.rooms,
});
class ChosenCard extends Component {

    getColorByLevel(level){
        switch(level){
            case 0:
                return '#29B673';
                break;
            case 1:
                return '#FBB041';
                break;
            case 2:
                return '#EE5E5F';
                break;
            default :
                return '#ffffff';
        }
    }

    getRoomName(roomId){
        const roomsTags = this.props.rooms;
        const room = roomsTags.find(room => room.id === roomId)
        return room.label;
    }

    render() {
        const item =this.props.item;
        const buttonVisible=this.props.visibleButton
        return(

            <View  style={styles.container}>
                <View  style={[styles.cardLine,{borderColor:this.getColorByLevel(item.level)}]}/>
                <View style={styles.detailField}>
                    <Text style={styles.topic}>{item.topic}</Text>
                    <Text style={styles.speaker}>{item.speaker}</Text>
                    <View style={styles.infoField}>
                        <Text style={styles.topic}>{moment.unix(item.date).format("HH:mm")}</Text>
                        <Text style={styles.topic}>{moment.unix(item.date).format("DD MMM YYYY")}</Text>
                        <Text style={styles.topic}>{this.getRoomName(item.room)}</Text>
                    </View>
                </View>
                <View style={styles.actionField}>
                    <If con={buttonVisible}>
                        <If.Then>
                            <TouchableOpacity onPress={(item) => this.props.onPressDeleteButton(item)} >
                                <View style={styles.buttonField}>
                                    <Icon name='ios-close' style={{alignSelf:'center'}}/>
                                </View>
                            </TouchableOpacity>
                        </If.Then>
                    </If>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        borderRadius:8,
        flexDirection:'row',
        margin:10,
        borderColor:'#F1F2F2',
        borderWidth:1
    },
    detailField:{
        flex:0.7,
        justifyContent:'space-between'
    },
    cardLine:{
        borderWidth:1,
        margin:10,
        marginTop:0,
        marginBottom:0
    },
    topic: {
        ...Font.regular,
        fontSize:moderateScale(9),
        textAlign:'left',
        textAlignVertical:'center',
        color:'#000000',
        margin:5
    },
    speaker:{
        ...Font.regular,
        fontSize:moderateScale(7),
        textAlign:'left',
        margin:5
    },
    infoField:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    actionField:{
        flex:0.3,
        marginRight:10,
        justifyContent:'flex-end',
        margin:5
    },
    buttonField:{
        backgroundColor:'#F1F2F2',
        width:30,
        height:30,
        borderRadius:100,
        alignSelf:'flex-end'
    }

})

export default connect(mapStateToProps)(ChosenCard)