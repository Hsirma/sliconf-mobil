import React, {Component} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,Platform} from 'react-native'
import Header from "../component/Header";
import {connect} from 'react-redux'
import {actionCreators} from '../reducks/module/drawer'
import {AGENDA, FLOOR, INFO, LOCATION, SPEAKERS} from '../router';
import Icon from 'react-native-vector-icons/Ionicons'
import {moderateScale, scale, verticalScale} from '../theme/Scale';
import Color from "../theme/Color";
import Font from "../theme/Font";
import moment from "moment";

const mapStateToProps = (state) => ({
    event: state.event.event,
});

class HomeScreen extends Component {

    state = {
        buttons : [
            {name: 'Schedule', icon: 'ios-calendar-outline', nav: AGENDA},
            {name: 'Speakers', icon: 'ios-microphone-outline', nav: SPEAKERS},
            {name: 'Location', icon: 'ios-map-outline', nav: LOCATION},
            {name: 'Floor Plan', icon: 'ios-menu-outline', nav: FLOOR},
            {name: 'Buy Ticket', icon: 'ios-cash-outline',},
            {name: 'Info', icon: 'ios-information-outline', nav: INFO},
        ]
    };

    componentWillMount(){
        const {dispatch,navigation} = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));
    }

    /**
     *Bir buton tasarimi
     * @param btn butonun icerigi
     * @returns {XML}
     */
    renderButton = (btn) => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate(btn.item.nav)}
            >
                <View style={styles.buttonIcon}>
                    <Icon name={btn.item.icon} size={40} color={Color.darkGray}/>
                </View>
                <Text style={styles.buttonText}>{btn.item.name}</Text>
            </TouchableOpacity>
        )
    };

    render() {
        const {event} = this.props;
        return (
            <View style={styles.container}>

                <View style={styles.headerPanel}>

                    <Header active headerStyle={{backgroundColor: Color.green}}
                            leftImage='chevron-left' rightImage='bars'
                            onPressLeft={() => this.props.navigation.goBack(null)}
                            onPressRight={() => this.props.navigation.navigate('DrawerOpen')}
                    />

                    <View style={styles.topInfo}>
                        <View>
                            <View style={styles.date}>
                                <Icon color={Color.white} name='ios-clock-outline' size={22}/>
                                <Text style={styles.dateText}>{moment.unix(event.startDate).format('h:mm a')}</Text>
                            </View>

                            <View style={styles.date}>
                                <Icon color={Color.white} name='ios-calendar-outline' size={22}/>
                                <Text style={styles.dateText}>{moment.unix(event.startDate).format("Do MMM  YYYY")}</Text>
                            </View>
                        </View>

                        <Image source={{uri: event.logoPath}}
                               style={styles.eventLogo}
                        />

                    </View>

                    <View style={styles.eventName}>
                        <Text style={styles.eventNameText}>
                            {event.name}
                        </Text>

                    </View>

                </View>

                <View style={styles.buttonPanel}>
                    <FlatList
                        data={this.state.buttons}
                        renderItem={(button) => this.renderButton(button)}
                        keyExtractor={(item, index) => index}
                        numColumns={3}
                    />
                </View>

            </View>
        )
    }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    headerPanel: {
        flex: 0.45,
        backgroundColor: Color.green,
        borderRadius: 30
    },
    topInfo: {
        flex: 0.6,
        flexDirection: 'row',
        backgroundColor: Color.transparent,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5
    },
    eventLogo:{
        width: height * 0.15,
        height: height * 0.15,
        borderRadius: Platform.OS==='ios' ? scale(45): 90
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    },
    dateText: {
        ...Font.regular,
        color: Color.white,
        fontSize: moderateScale(13),
        paddingLeft: 10,
    },
    eventName: {
        flex: 0.4,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: verticalScale(20),
    },
    eventNameText: {
        ...Font.regular,
        color: Color.white,
        fontSize: moderateScale(25),
        textAlign:'right'
    },
    buttonPanel: {
        flex: 0.55,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: Color.white,
    },
    buttonIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Platform.OS ==='ios' ? 50: 90,
        borderWidth: 1,
        width: scale(60),
        height: scale(60),
        marginBottom: 10,
        borderColor: Color.darkGray
    }, buttonText: {
        ...Font.light,
        color: Color.darkGray
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 3,
        height: height * 0.26
    }

});


export default connect(mapStateToProps)(HomeScreen)