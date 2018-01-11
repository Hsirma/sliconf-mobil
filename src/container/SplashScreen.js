import React from 'react';
import {Alert, AsyncStorage, NetInfo, StyleSheet, Text, View} from 'react-native'
import {Image} from 'react-native-animatable'
import {MAIN} from '../router';
import Color from "../theme/Color";
import Font from "../theme/Font";
import {connect} from 'react-redux'
import {actionCreators as actionCreatorsConnection} from '../reducks/module/connection'
import {actionCreators as actionCreatorsDevice} from '../reducks/module/authDevice'
import {actionCreators as actionCreatorsUser} from '../reducks/module/auth'
import DeviceInfo from 'react-native-device-info';
import RNExitApp from "react-native-exit-app";

const logo = require("../../images/logo.png");

const mapStateToProps = (state) => ({
    errorDevice: state.authDevice.error,
    loginDevice: state.authDevice.login,
    errorMessageDevice: state.authDevice.errorMessage,
    login: state.auth.login,
    error: state.auth.error,
    errorMessage: state.auth.errorMessage
});

class SplashScreen extends React.Component {
    /**
     * internet kontrol durumuna kontrol eder
     * @param isConnected internet durumu
     * @private
     */
    _handleConnectionInfoChange = (isConnected) => {
        this.props.dispatch(actionCreatorsConnection.changedConnection(isConnected));
    };

    componentWillMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionInfoChange);
    }

    // componentWillUnmount() {
    //     NetInfo.isConnected.removeEventListener('change', this._handleConnectionInfoChange);
    // }

    /**
     * Cihaz id ile user bilgilerini alir
     * @returns {Promise<void>}
     */
    async anonymousUser() {
        const uniqueID = await DeviceInfo.getUniqueID();
        await this.props.dispatch(actionCreatorsDevice.loginDevice(uniqueID));
        if (!this.props.loginDevice)
            await this.props.dispatch(actionCreatorsDevice.registerDevice(uniqueID));

        return this.props.loginDevice;
    }

    /**
     * Giriş yapmış kullanıcıyı hafızadan getirir.
     * @returns {Promise<void>}
     */
    async getLoggedUser() {
        const responseUsername = await AsyncStorage.getItem('username');
        const responsePass = await AsyncStorage.getItem('password');

        if (responseUsername !== null && responsePass !== null)
            await this.props.dispatch(actionCreatorsUser.login(responseUsername, responsePass));

        return this.props.login;
    }


    /**
     *
     * @returns {Promise<*>}
     */
    async checkUser(){
        if (await this.getLoggedUser()) return true;
        return await this.anonymousUser();

    }

    //TODO ingilizce metin
    async componentDidMount() {
        if(await this.checkUser())
            setTimeout(() => this.props.navigation.dispatch({type: MAIN}), 500);
        else
            Alert.alert(
                'Warning!',
                "Please check your connection.",
                [
                    {text: 'Exit', onPress: () => RNExitApp.exitApp()},
                ],
                {cancelable: false}
            );
    }

    render() {
        return (
            <View style={styles.container}>
                <View/>
                <Image
                    source={logo}
                    animation="swing"
                    iterationCount='infinite'
                    style={styles.image}/>
                <Text style={styles.text}>kodcu.com</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: Color.white
    },
    image: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: 150,
        width: 150,
        marginBottom: 50
    },
    text: {
        ...Font.light,
        color: Color.green
    },
});

export default connect(mapStateToProps)(SplashScreen)
