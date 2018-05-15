import React, { Component } from 'react';
import { View,Text,StyleSheet,TextInput } from 'react-native';


export default class LoginIn extends Component{

    static navigationOptions = ({ navigation, screenProps }) => ({
        header: null,
    })

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text onPress={()=>{this.props.navigation.navigate('MainTab')}}>Login In</Text>
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