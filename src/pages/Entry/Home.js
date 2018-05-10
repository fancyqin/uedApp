//废弃

import React, { Component } from 'react';
import { View,Text,StyleSheet, } from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Feather';

import SandsPage from '../Sands/SandsList';
import SettingPage from '../Setting/Setting';
import BookPage from '../Libary/BookList';
import TodoPage from '../Todo/TodoList';

import px2dp from '../../util/px2dp';


export default class Home extends Component{

    constructor(props){
        super(props);
        
    }
    
    state = {
        selectedTab: 'sands'
    }

    _renderTab(Component, selectedTab, title, iconName) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title = {title}
                selectedTitleStyle={{color: "#574435"}}
                renderIcon={() => <Icon name={iconName} size={px2dp(22)} color="#999"/>}
                renderSelectedIcon={() => <Icon name={iconName} size={px2dp(22)} color="#574435"/>}
                onPress={() => this.setState({selectedTab: selectedTab})}>
                <Component {...this.props}/>
            </TabNavigator.Item>
        )
    }

    render(){

        return(
            <View style={styles.container}>
                <TabNavigator tabBarStyle={{opacity: 0.9,}} sceneStyle={{paddingBottom: 0}} >
                    {this._renderTab(TodoPage,'todo','TODO','check-square')}
                    {this._renderTab(SandsPage,'sands','SANDS','zap')}
                    {this._renderTab(BookPage,'book','BOOK','book')}
                    {this._renderTab(SettingPage,'setting','SETTING','settings')}
                </TabNavigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#f3f5f7',
        paddingBottom: 5
    }
})