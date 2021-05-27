import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';

export default class MyRecievedBooksScreen extends Component{
    constructor(){
        super();
        this.state={
            userId: firebase.auth().currentUser.email,
            recievedBooksList: [],
        }
        this.requestRef=null
    }

    getRecievedBooksList=()=>{
        this.requestRef=db.collection('requested_books')
        .where('user_id', "==", this.state.userId)
        .where('book_status', "==", 'recieved')
        .onSnapshot(snapshot=>{
            var recievedBooksList= snapshot.docs.map(doc=>doc.data())
            this.setState({
                recievedBooksList: recievedBooksList,
            })
        })
    }

    componentDidMount(){
      this.getRecievedBooksList()
    }
    
    componentWillUnmount(){
        this.requestRef();
    }
    
    
    keyExtractor=(item,index)=> index.toString()

    renderItem=({item, i})=>(
        <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.bookStatus}
        titleStyle={{color:'black' ,fontWeight:'bold'}}
        
        bottomDivider
        />
    )

    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader
                navigation={this.props.navigation}
                title="Recieved Books"/>
              
              <View style={{flex:1}}>
              {
                  this.state.recievedBooksList.length === 0
                  ?(
                      <View style = {styles.subContainer}>
                          <Text style= {{fontSize:20}}>List of all Recieved Books</Text>
                      </View>
                  ):(
                      <FlatList
                      keyExtractor ={this.keyExtractor}
                      data={this.state.recievedBooksList}
                      renderItem={this.renderItem}/>
                  )
              }

              </View>

            </View>
        )
    }
}

var styles = StyleSheet.create({ 
container : { flex:1 }, 
drawerItemsContainer:{ flex:0.8 }, 
logOutContainer : { 
flex:0.2, justifyContent:'flex-end', paddingBottom:30 },
 logOutButton : { 
height:30, width:'100%', justifyContent:'center', padding:10 }, 
logOutText:{
     fontSize: 30, fontWeight:'bold' } 
    })