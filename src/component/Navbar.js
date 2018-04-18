import React, {Component, PropTypes} from 'react';

import {
    StyleSheet,
    Navigator,
    Platform,
    TouchableOpacity,
    Image,
    StatusBar,
    Text,
    View
} from 'react-native'



const STATUS_BAR_HEIGHT = 20;


export default class NavBar extends Component {
    
    

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            popEnabled: true,
            hide: false
        };
    }

    render() {
        return (
            <View style={styles.navBar}>
                
                    <Text style={styles.title} ellipsizeMode="head" >{this.props.title}</Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({

    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#574435',
        height: 60,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        top: 0,
        right: 40,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: 'white',
        paddingTop: 12
    },
    navBarButton: {
        alignItems: 'center',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT:0,
    },
})
