import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native'
import {Button, Container, Thumbnail} from 'native-base';
import Header from "../component/Header";
import {connect} from 'react-redux'
import Style from '../theme/Style'
import {AGENDA, SPEAKERS, INFO, LOCATION, FLOOR} from '../router';
import Icon from 'react-native-vector-icons/Ionicons'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const mapStateToProps = (state) => ({
    event: state.event.event,

})

class HomeScreen extends Component {

    render() {
        const {event} = this.props;
        return (
            <Container style={{backgroundColor: '#ffffff'}}>




                <View style={{flex:0.45,backgroundColor:'#29B673',borderRadius:30}}>
                    <Header active headerStyle={{backgroundColor:'#29B673'}}
                            leftImage='chevron-left' rightImage='bars'
                            onPressLeft={() => this.props.navigation.goBack(null)}
                            onPressRight={() => {this.props.navigation.navigate('DrawerOpen')}}/>

                    <View style={{flex:0.6,flexDirection:'row',backgroundColor:'rgba(0,0,0,0)',justifyContent:'space-between',alignItems:'flex-start',paddingLeft:20,paddingRight:20,paddingTop:5}}>
                        <View style={{}}>
                            <View style={{flexDirection:'row',alignItems:'center',paddingBottom:10}}>
                                <Icon style={{paddingRight:10}} color='#fff' name='ios-clock-outline' size={22}/>
                                <Text style={{color:'#fff',fontSize:responsiveFontSize(1.8)}}>9.30</Text>
                            </View>

                            <View style={{}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Icon style={{paddingRight:10}} color='#fff' name='ios-calendar-outline' size={22}/>
                                    <Text style={{color:'#fff',fontSize:responsiveFontSize(1.8)}}>25 May 2018</Text>
                                </View>
                            </View>
                        </View>

                        <Image source={{uri:'https://pbs.twimg.com/profile_images/869175415822327808/O67MAYb2_400x400.jpg'}} style={{width:height*0.15,height:height*0.15,borderRadius:90}}/>

                    </View>

                    <View style={{flex:0.4,justifyContent:'flex-end',alignItems:'flex-end',padding:responsiveWidth(4),}}>
                        <Text style={{color:'#fff',fontSize: responsiveFontSize(4.5) ,fontFamily: "Montserrat-Regular",}}>Javaday</Text>
                        <Text style={{color:'#fff',fontSize: responsiveFontSize(4.5),lineHeight:responsiveHeight(5)*1.2,fontFamily: "Montserrat-Regular",}}>Istanbul 2018</Text>

                    </View>


                </View>

                <View style={{flex: 0.55, alignItems: 'center', justifyContent: 'space-between',}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#fff',paddingBottom:0}}>
                        <View style={{flexDirection: 'row',justifyContent:'space-around',width}}>
                            <View style={{padding:30}} >
                                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}
                                                  onPress={() => this.props.navigation.navigate(AGENDA)}>
                                    <View style={{alignItems: 'center', justifyContent: 'center',borderRadius:90,borderWidth:1,width:60,height:60,marginBottom:10}}>
                                        <Icon style={{}} name='ios-calendar-outline' size={40}/>
                                    </View>
                                    <Text>Schedule</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{padding:30}} >
                                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}
                                                  onPress={() => this.props.navigation.navigate(SPEAKERS)}>
                                    <View style={{alignItems: 'center', justifyContent: 'center',borderRadius:90,borderWidth:1,width:60,height:60,marginBottom:10}}>
                                        <Icon style={{}} name='ios-microphone-outline' size={40}/>
                                    </View>
                                    <Text>Speakers</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{padding:30}} >
                                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}
                                                  onPress={() => this.props.navigation.navigate(LOCATION)}>
                                    <View style={{alignItems: 'center', justifyContent: 'center',borderRadius:90,borderWidth:1,width:60,height:60,marginBottom:10}}>
                                        <Icon style={{}} name='ios-map-outline' size={40}/>
                                    </View>
                                    <Text>Location</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={{flexDirection: 'row',justifyContent:'space-around',width}}>
                            <View style={{padding:30}} >
                                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}
                                                  onPress={() => this.props.navigation.navigate(FLOOR)}>
                                    <View style={{alignItems: 'center', justifyContent: 'center',borderRadius:90,borderWidth:1,width:60,height:60,marginBottom:10}}>
                                        <Icon style={{}} name='ios-menu-outline' size={40}/>
                                    </View>
                                    <Text>Floor Plan</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{padding:30}} >
                                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{alignItems: 'center', justifyContent: 'center',borderRadius:90,borderColor:'#29B673',borderWidth:1,width:60,height:60,marginBottom:10}}>
                                        <Icon color='#29B673' style={{}} name='ios-cash-outline' size={40}/>
                                    </View>
                                    <Text style={{color:'#29B673'}}>Buy</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{padding:30}} >
                                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}
                                                  onPress={() => this.props.navigation.navigate(INFO)}>
                                    <View style={{alignItems: 'center', justifyContent: 'center',borderRadius:90,borderWidth:1,width:60,height:60,marginBottom:10}}>
                                        <Icon style={{}} name='ios-information-outline' size={40}/>
                                    </View>
                                    <Text>Genarel Info</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                </View>
            </Container>
        )
    }
}

const {width,height} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    leftboxSmall: {
        width: Style.DEVICE_WIDTH * 0.44,
        height: Style.DEVICE_WIDTH * 0.44,
        marginBottom: Style.DEVICE_WIDTH * 0.04,
        marginRight: Style.DEVICE_WIDTH * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5
    },
    rightboxSmall: {
        width: Style.DEVICE_WIDTH * 0.44,
        height: Style.DEVICE_WIDTH * 0.44,
        marginBottom: Style.DEVICE_WIDTH * 0.04,
        marginLeft: Style.DEVICE_WIDTH * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5
    },
    buttonText: {
        fontFamily: "Montserrat-Regular",
        lineHeight: Style.FONT_SIZE_TITLE * 1.5,
        fontSize: Style.FONT_SIZE_TITLE,
        color: 'white',
        fontWeight: 'bold',
        margin: Style.MARGIN,
        textAlign: 'center'
    },
    title: {
        fontFamily: "Montserrat-SemiBold",
        lineHeight: Style.FONT_SIZE_TITLE_LARGE * 1.5,
        fontSize: Style.FONT_SIZE_TITLE_LARGE,
        fontWeight: 'bold',
        padding:Style.MARGIN,
        paddingTop: 0,
        paddingBottom: 0,
        textAlign: 'center'
    },


})



export default connect(mapStateToProps)(HomeScreen)