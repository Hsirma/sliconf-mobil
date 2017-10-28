import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import FloorImage from 'react-native-transformable-image';
import Header from "../component/Header";
import {connect} from 'react-redux'
import Color from "../theme/Color";
import Icon from 'react-native-vector-icons/Ionicons'
import {height,width} from "../theme/Scale";
import Font from "../theme/Font";
import {actionCreators} from "../reducks/module/drawer";

const mapStateToProps = (state) => ({
    floorplan: state.event.event.floorPlan,
});

class FloorPlan extends Component {

    state = {
        selected:0
    };

    componentWillMount(){
        const {dispatch,navigation} = this.props;
        dispatch(actionCreators.changedDrawer(navigation.state.routeName));
    }

    render() {
        let floorplan = this.props.floorplan;
        const selected = this.state.selected;

        return (
            <View style={styles.container}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()}
                        onPressRight={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                    <Header.Title title="Floor Plan"/>
                </Header>

                {(floorplan === undefined || floorplan === null) ?

                    <View style={styles.notFoundPanel}>
                        <Text style={styles.notFoundText}>
                            Floor Plan Not Found
                        </Text>
                    </View>

                    :

                    <View style={styles.container}>
                        <FloorImage style={styles.container} source={{uri: floorplan[selected]}}/>

                        <TouchableOpacity
                            style={[styles.change,{right: 5,}]}
                            onPress={() => floorplan.length - 1 === selected ? null : this.setState({selected: selected + 1})}
                        >
                            <Icon name='ios-arrow-dropright' size={50} color={Color.darkGray}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.change,{left: 5,}]}
                            onPress={() => 0 === selected ? null : this.setState({selected: selected - 1})}
                        >
                            <Icon name='ios-arrow-dropleft' size={50} color={Color.darkGray}/>
                        </TouchableOpacity>
                    </View>

                }

                <Image style={styles.zoom}
                       source={require('../../images/zoom-out.png')}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    change:{
        width: 50,
        height: 50,
        backgroundColor: Color.transparent,
        position: 'absolute',
        top: (height / 2) - 25,
        justifyContent: 'center'
    },
    notFoundText:{
        ...Font.thin,
        color:Color.darkGray
    },
    notFoundPanel:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    zoom:{
        position: 'absolute',
        right: 3,
        bottom: 3,
        width: 40,
        height: 40
    }
});

export default connect(mapStateToProps)(FloorPlan)