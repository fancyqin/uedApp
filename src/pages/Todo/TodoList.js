import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Feather'


export default class TodoList extends Component{

    // static navigationOptions = {
    //     tabBarIcon: ({ focused }) => <Icon name='mail' size={24} color={focused ? '#574435' : '#999'} />,
    //     headerTitle:'Todo',
    //     tabBarLabel:'TODO'
        
    // }


    render(){
        return(
            <View style={styles.container}>
                <Text>TodoList</Text>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});