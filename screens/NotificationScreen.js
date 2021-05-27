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

import db from '../config';
import firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import SwipeableFlatList from '../components/SwipeableFlatlist';

export default class NotificationScreen extends Component{
    
   constructor(){
     super();
     this.state={
         userId: firebase.auth().currentUser.email,
        allNotifications: [],
     }  
     this.notificationRef= null;
   } 


   keyExtractor = (item, index) => index.toString();

   getNotifications=()=>{
       this.notificationRef= db
       .collection('all_notifications')
       .where("notification_status", "==", "unread")
       .where("targetted_user_Id", "==", this.state.userId)
       .onSnapshot(snapshot=>{
           var allNotifications= []
           snapshot.docs.map(doc=>{
               var notification= doc.data();
               notification['doc_id']= doc.id;
               allNotifications.push(notification)
           })
           this.setState({
               allNotifications: allNotifications
           })
       })
   }

   componentDidMount(){
       this.getNotifications();
   }

   componentWillUnmount(){
     this.notificationRef();
   }

   renderItems=({item, index})=>{
       return(
           <ListItem
           key={index}
           leftElement={<Icon name="book" type= "font-awesome" color='#696969'/>}
           title={item.book_name}
           titleStyle={{color: 'black', fontWeight:'bold'}}
           subtitle={item.message}
           bottomDivider/>
       )
   }
    
    
    
    render(){
        return(
            <View style={styles.container}>
               <View style={{flex:0.1}}>
                    <MyHeader
                    title={"Notifications"}
                    navigation= {this.props.navigation}/>

               </View>
               <View style={{flex:0.1}}>
                   {
                       this.state.allNotifications.length==0?(
                           <View style={{
                               flex:1,
                               justifyContent: 'center',
                               alignItems: 'center',
                           }}>
                             <Text>You Have No Notifications</Text>
                           </View>

                       ):(
                           <SwipeableFlatList
                           allNotifications= {this.state.allNotifications}/>
                       )
                   }
               </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });