import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,Image,TouchableOpacity ,FlatList,Dimensions,ListView} from 'react-native';
import { Container, Button, Icon, Title ,Content,CardItem,Thumbnail,Card,List,Item,Footer,FooterTab,Picker, Form, Item as FormItem} from 'native-base';
import AlphabeticView from '../component/AlphabeticView'
import Header from "../component/Header";
DATAS =[
    {name: "Anıl Coşar",workingat: "Gömsis",about: "dfdfdf",topic: ["A106","A107"]},
    {name: "Apeaker 1",workingat: "Company 1",about: "dfdfdf",topic: ["A106","A107"]},
    {name: "Bpeaker 2",workingat: "Company 1",about: "dfdfdf",topic: ["A106","A107"]},
    {name: "Cpeaker 3",workingat: "Company 1",about: "dfdfdf",topic: ["A106","A107"]},
    {name: "Dpeaker 4",workingat: "Company 1",about: "dfdfdf",topic: ["A106","A107"]},
    {name: "Epeaker 5",workingat: "Company 1",about: "dfdfdf",topic: ["A106","A107"]},
    {name: "Fpeaker 6",workingat: "Company 1",about: "dfdfdf",topic: ["A106","A107"]},
    {name: "Gpeaker 7",workingat: "Company 1",about: "dfdfdf",topic: ["A106","A107"]},
    {name: "Göksel Pirnal",workingat: "Big Apps",about: "dfdfdf",topic: ["A103"]},
    {name: "Hakan Özler",workingat: "Kodsis",about: "dfdfdf",topic: ["A101"]},
    {name: "Hpeaker 8",workingat: "Company 1",about: "dfdfdf",topic: ["A106","A107"]},
    {name: "Hüseyin Akdoğan",workingat: "Datasist",about: "dfdfdf",topic: ["A102"]},
    {name: "Lemi Orhan",workingat: "iyzico",about: "dfdfdf",topic: ["A100"]},
    {name: "Müslüm Sezgin",workingat: "Gömsis",about: "dfdfdf",topic: ["A105"]},
    {name: "Talip Teyfur",workingat: "Kodsis",about: "dfdfdf",topic: ["A104"]},
]
DATAS2=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","V","Y","Z","W"]
export default class SpeakersScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state={
        speakers:[],
    }

    speakersList(speakers) {
        let changedSpeakersList = [];
        let myMap = new Map();

        speakers.forEach(function (element)  {
            let char = element.name.charAt(0).toUpperCase()
            myMap.get(char) ? array = myMap.get(char) : array = []
            array.push(element)
            myMap.set(char, array)
        });

        myMap.forEach(function (value, key) {
            changedSpeakersList={...changedSpeakersList,[key]: value}
        })

        return changedSpeakersList
    }

    _keyExtractor = (item, index) => index;

    renderRow (info) {
        return <View  style={styles.card}>
            <Thumbnail source={require('../../images/hi.png')} large style={{marginBottom:15}}/>
            <Text style={{fontSize:15,color:'#000'}}>{info.name}</Text>
            <Text style={{fontSize:12,color:'#BCBEC0'}}>{info.workingat}</Text>
        </View>


    }
    componentWillMount(){
        this.setState({
            speakers:this.speakersList(DATAS)
        })
        console.log(this.state.speakers)
    }

    myfunction(letter){
        if(this.state.speakers[letter]!==undefined){
            let item =this.state.speakers[letter][0]
            this.myFlatList.scrollToIndex({ animated: true, index:Math.floor(((DATAS.length/2)/DATAS.length)*DATAS.indexOf(item)) });
        }

    }
    getItemLayout = (data, index) => ({ length: 200, offset: 200 * index, index });

    // Hangi harfe basarsa git arrayda o harfin ilk elemanını bul sonra onun indexine flatlistin scrollto özelliği ile git
    render() {
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <Header leftImage='chevron-left' rightImage='bars'
                        onPressLeft={() => this.props.navigation.goBack()} >
                            <Header.Title title="Speakers" />
                </Header>
                <View style={{flexDirection:'row',flex:1}}>
                    <View style={{flexGrow:0.8}}>
                        <FlatList
                            data={DATAS}
                            renderItem={({item}) => this.renderRow(item)}
                            keyExtractor={this._keyExtractor}
                            numColumns={2}
                            ref={(list) => this.myFlatList = list}
                            getItemLayout={this.getItemLayout}
                        /></View>
                    <View style={{justifyContent:'center',alignItems:'center',margin:10,paddingBottom:10,flexGrow:0.2}}>
                        {Object.keys(this.state.speakers).map((myi,i) =>
                            <AlphabeticView key={i} item={myi} onClick={this.myfunction.bind(this)}/>
                        )}

                    </View>
                </View>


            </Container>
        );
    }
}
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listView: {
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    card: {
        backgroundColor: 'red',
        width: (width / 2) - 25,
        height: 200,
        marginLeft: 10,
        marginTop: 10,
        backgroundColor:'#fff',borderWidth:1,borderRadius:15,borderColor:'#F1F2F2',justifyContent:'center',alignItems:'center'
    }
})