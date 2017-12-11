import React from 'react';
import {StyleSheet, View, Text, NetInfo,BackHandler,Alert} from 'react-native'
import RNExitApp from 'react-native-exit-app';
import {Image} from 'react-native-animatable'
import {LOGIN, MAIN, TALK} from '../router';
import Color from "../theme/Color";
import Font from "../theme/Font";

const logo = require("../../images/logo.png");

class SplashScreen extends React.Component {


    state = {
        network: false
    };

    /**
     * internet kontrol durumuna gore uygulamayi baslatir
     * @param isConnected internet durumu
     * @private
     */
    _handleConnectionInfoChange = (isConnected) => {
        if (isConnected)
            setTimeout(() => this.props.navigation.dispatch({type: MAIN}), 1000);
        else
            //TODO: try again duzunlenecek
            Alert.alert(
                'Warning!',
                "...",
                [
                    {text: 'Exit', onPress: () => RNExitApp.exitApp()},
                    {text: 'Try again', onPress: () => this._handleConnectionInfoChange(false)},
                ],
                { cancelable: false }
            );
    };

    componentWillMount() {
        NetInfo.isConnected.addEventListener('change', this._handleConnectionInfoChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this._handleConnectionInfoChange);
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

export default SplashScreen;
