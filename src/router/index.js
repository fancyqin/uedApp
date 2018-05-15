import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import {
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'

import LoginIn from '../pages/Login/LoginIn';
import TodoList from '../pages/Todo/TodoList';
import SandStack from './SandsRouter';
import BookList from '../pages/Libary/BookList';
import Setting from '../pages/Setting/Setting';


console.disableYellowBox = true;

const LoginStack = createStackNavigator({
    Login: LoginIn
})

const TodoStack = createStackNavigator({
    TodoList,
},{
    navigationOptions:{
        headerTitle: 'Have A Nice Day',
        headerStyle: {
            backgroundColor: '#ffc800',
        },
        headerTitleStyle: {
            color: '#fff',
        },
    }
})


const MainTab = createBottomTabNavigator({
    Todo:{
        screen: TodoStack,
        navigationOptions:{
            tabBarLabel:'TODO'
        }
    },
    Sands:{
        screen: SandStack,
        navigationOptions:{
            tabBarLabel:'SANDS'
        }
    },
    BookList: {
        screen: BookList,
        navigationOptions:{
            tabBarLabel:'LIBARY'
        }
    },
    Setting: {
        screen: Setting,
        navigationOptions:{
            tabBarLabel:'USER'
        }
    }
},{
    navigationOptions:({navigation}) => ({
        tabBarIcon: ({ focused,tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch (routeName){
                case 'Todo':
                    iconName = 'calendar';
                    break;
                case 'Sands':
                    iconName = 'zap';
                    break;
                case 'BookList':
                    iconName = 'book';
                    break;
                case 'Setting':
                    iconName = 'user';
                    break;    
            }      
            return <Icon name={iconName} size={24} color={focused ? tintColor : '#888'} />
        },
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: '#000',
            inactiveTintColor: '#888',
            style: {
                backgroundColor: 'white',
            },
        },
        
    })
})



export default createStackNavigator({
    LoginStack,
    MainTab
},{
    headerMode:'none',
    mode: 'modal',
    navigationOptions:{
        gesturesEnabled: false
    }
});


