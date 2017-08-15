import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,Image,TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Content,CardItem,Thumbnail,Card,List,Item,Footer,FooterTab,Picker, Form, Item as FormItem} from 'native-base';
import AgendaCard from '../components/AgendaCard'
let DATAS = {
    "13:00":[
        {name: 'Kasia Mrowca', place: 'Oda 1', level:1,topic:'React Nedir ?',time:'13:00',posters: require('../../images/logo.png')},
        {name: 'Speaker 1', place: 'Oda 0',level:2, time:'13:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')},
        {name: 'Speaker 2', place: 'Oda 2',level:2, time:'13:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')}
    ],
    "14:00":[
        {name: 'Speaker 3', place: 'Oda 0', level:1,topic:'React Nedir ?',time:'14:00',posters: require('../../images/logo.png')},
        {name: 'Speaker 4', place: 'Oda 3',level:2, time:'14:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')},
        {name: 'Speaker 5', place: 'Oda 2',level:3, time:'14:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')}
    ],
    "15:00":[
        {name: 'Speaker 6', place: 'Oda 1', level:3,topic:'React Nedir ?',time:'15:00',posters: require('../../images/logo.png')},
        {name: 'Speaker 7', place: 'Oda 0',level:3, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')},
        {name: 'Speaker 8', place: 'Oda 2',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')},
        {name: 'Speaker 9', place: 'Oda 3',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')}
    ],
    "16:00":[
        {name: 'Speaker 10', place: 'Oda 1', level:3,topic:'React Nedir ?',time:'15:00',posters: require('../../images/logo.png')},
        {name: 'Speaker 11', place: 'Oda 0',level:3, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')},
        {name: 'Speaker 12', place: 'Oda 2',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')},
        {name: 'Speaker 13', place: 'Oda 3',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')}
    ],
    "17:00":[
        {name: 'Speaker 14', place: 'Oda 1', level:3,topic:'React Nedir ?',time:'15:00',posters: require('../../images/logo.png')},
        {name: 'Speaker 15', place: 'Oda 0',level:3, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')},
        {name: 'Speaker 16', place: 'Oda 2',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')},
        {name: 'Speaker 17', place: 'Oda 3',level:1, time:'15:00',topic:'Native Nedir ?',posters: require('../../images/logo.png')}
    ]
}
    
let choosen =[];


let rooms =["Oda 0","Oda 1","Oda 2","Oda 3"];
    


export default class AgendaScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state={
        language:'Day 1',
        isExist:true,
        isClicked:false
    }

    

     
    igo(arg){
        console.log('simdide burda')
        choosen.push(arg);
        console.log(choosen);   
        
        
    }
    myFunsiyon2(myroom,arg){
        let varMi=false;
        let i;
        for(i=0;i<arg.length;i++){
            if(myroom==arg[i].place){
                varMi=true;
                return(<AgendaCard item={arg[i]} isEmpty={false} onClickAdd={() => this.igo(item)}/>
                )
            }else{
                varMi=false;
            }
        }
        if(!varMi)
            return(<AgendaCard isEmpty={true}/>)
        
    }


    

    render() {
        
        return (
            <Container style={{backgroundColor:'#fff'}}>

            <Header style={{backgroundColor:'#fff'}} >
                    <Left>
                        <Button transparent>
                            <Icon name='ios-arrow-back' style={{color:'#000'}} />
                        </Button>
                    </Left>
                    <Body >
                        <Picker style={{width:100}}
                            selectedValue={this.state.language}
                            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                            <Picker.Item label="Day 1" value="11052018" />
                            <Picker.Item label="Day 2" value="12052018" />
                            <Picker.Item label="Day 3" value="13052018" />
                            <Picker.Item label="Day 4" value="14052018" />
                        </Picker>
                    </Body>      
            </Header>
            <View style={{padding:5,flexDirection:'row',justifyContent:'space-between'}}>
                    <Icon name='ios-funnel-outline' style={{marginLeft:30,margin:8}}/> 
                    <ScrollView horizontal>
                        {rooms.map((oda) =>
                        <Text style={{width:200,margin:5}}>{oda}</Text>
                        )}
                    </ScrollView>
            </View>    
            <Content >
            <View style={{flexDirection:'row'}}>

                <View style={{margin:5,padding:5}}>    
                    {Object.keys(DATAS).map( (saat) => (
                        <Text style={{margin:8,textAlignVertical:'center',textAlign:'center',height:100}}>{saat}</Text>
                    ))}
                </View>
                <View>
                <ScrollView horizontal>
                    <ScrollView>

                    {Object.keys(DATAS).map( (bilgi) => (
                            <View style={{flexDirection:'row',marginLeft:30}}>
                            
                            {rooms.map((myroom) => (
                                <View>{this.myFunsiyon2(myroom,DATAS[bilgi])}</View>
                                        ))}
                            
                            </View>
                                    ))}
                    </ScrollView >
                </ScrollView>
                </View>
            </View> 
            </Content>
            

            <Footer >
                <FooterTab style={{backgroundColor:'#fff'}}>
                    <Button vertical>
                        <Text>Hepsi</Text>
                    </Button>
                    <Button vertical>
                        <Text>Seçimlerim</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})
