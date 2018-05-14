import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import {
    createStackNavigator,
    createBottomTabNavigator,
    DrawerNavigator,
    SwitchNavigator,
    TabBarBottom,
} from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'

import LoginIn from '../pages/Login/LoginIn';
import TodoList from '../pages/Todo/TodoList';
import SandsList from '../pages/Sands/SandsList';
import BookList from '../pages/Libary/BookList';
import Setting from '../pages/Setting/Setting';


let LoginStack = createStackNavigator({
    Login: {
        screen: LoginIn
    }
})

let MainTab = createBottomTabNavigator({
    Todo:{
        screen: TodoList,
        tabBarOptions:{
            tabBarIcon: ({ focused }) => {
                return (
                    <Icon name='mail' size={24} color={focused ? '#574435' : '#999'} />
                )
            }
        }
    },
    Sands:{
        screen: SandsList
    },
    BookList: {
        screen: BookList
    },
    Setting: {
        screen: Setting
    }
},{
    initalRouteName:'Todo',
    tabBarOptions:{
        
    }
})




export default createStackNavigator({
    LoginStack,
    MainTab
});


