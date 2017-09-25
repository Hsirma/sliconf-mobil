import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Image from 'react-native-transformable-image';
import Header from "../component/Header";


export class FloorPlan extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {this.props.navigation.navigate('DrawerOpen')}}>
                    <Header.Title title="Floor Plan" />
                </Header>
                <Image
                    style={{flex:1}}
                    source={{uri: 'http://docplayer.biz.tr/docs-images/59/43501500/images/19-0.png'}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {flex:1,backgroundColor:'#fff'},
});

export default FloorPlan;