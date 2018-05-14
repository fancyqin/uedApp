import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';


export default class LoginIn extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text onPress={()=>{this.props.navigation.navigate('Main')}}>Login In</Text>
                
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