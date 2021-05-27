import React,{Component}from 'react';
import BookDonateScreen from '../screens/BookDonateScreen';
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen';

export const AppStackNavigator= createStackNavigator({
    BookDonateList: {
        screen: BookDonateScreen,
        navigationOptions: {
            headerShown: false,
        }
    }
},
{
    initiateRouteName :'BookDonateList',
}
)