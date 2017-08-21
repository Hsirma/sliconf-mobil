import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, Dimensions, Platform} from 'react-native';
import {Header as NBHeader, Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import If from './If'

export class Header extends Component {



    render() {
        const {leftImage, rightImage, onPressRight, onPressLeft, children} = this.props;
        return (
            <NBHeader backgroundColor="#fff" iosBarStyle="dark-content" androidStatusBarColor="#fff"
                      noShadow={true} style={{backgroundColor: '#fff'}}>
                <View style={[styles.header, this.props.headerStyle]}>
                    <TouchableOpacity onPress={onPressLeft}>
                        <Icon name={leftImage}/>
                    </TouchableOpacity>

                    <View>
                        {children}
                    </View>

                    <TouchableOpacity onPress={onPressRight}>
                        <Icon name={rightImage}/>
                    </TouchableOpacity>
                </View>
            </NBHeader>
        );
    }
}

export class Title extends Component {
    render() {
        return <View><Text style={styles.HeaderText}>{this.props.title}</Text></View>
    }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {},
    header: {
        paddingRight: 15,
        paddingLeft: 15,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    HeaderText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#666'
    }
});

Header.Title = Title;

export default Header;