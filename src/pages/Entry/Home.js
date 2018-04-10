import React, { Component } from 'react';
import { View,Text,StyleSheet, } from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Feather';

import SandsPage from '../Sands/SandsList';
import SettingPage from '../Setting/Setting';
import BookPage from '../Libary/BookList';
import TodoPage from '../Todo/TodoList';

import px2dp from '../../util/px2dp';

class TabItem extends Component {
    constructor(props){
        super(props);
        
    }

    

    render(){
        <TabNavigator.Item
            selected={this.props.getSelectTab() === this.props.selectedTab}
            title = {this.props.title}
            selectedTitleStyle={{color: "#574435"}}
            renderIcon={() => <Icon name={this.props.iconName} size={px2dp(22)} color="#999"/>}
            renderSelectedIcon={() => <Icon name={this.props.iconName} size={px2dp(22)} color="#574435"/>}
            onPress={this.props.setSelectTab(this.props.selectedTab)}
            >
            <Text>{this.props.title}</Text>
        </TabNavigator.Item>
    }
}

export default class Home extends Component{

    constructor(props){
        super(props);
        
    }
    
    state = {
        selectTab: 'sands'
    }

    getSelectTab(){
        return this.state.selectTab;
    }

    setSelectTab(selectTab){
        this.setState({
            selectTab
        });
        console.log(11)
    }

    render(){

        return(
            <View style={styles.container}>
                <TabNavigator tabBarStyle={{opacity: 0.9,}} sceneStyle={{paddingBottom: 0}} >
                    <TabItem title="SANDS" component={SandsPage} selectedTab='sands' iconName='home'
                     setSelectTab={select => this.setSelectTab(select)} getSelectTab={this.getSelectTab} />
                    <TabItem title="TODO" component={TodoPage} selectedTab='todo' iconName='home'
                     setSelectTab={select => this.setSelectTab(select)}  getSelectTab={this.getSelectTab} />
                    <TabItem title="BOOKS" component={BookPage} selectedTab='book' iconName='home'
                     setSelectTab={select => this.setSelectTab(select)}  getSelectTab={this.getSelectTab} />
                    <TabItem title="SETTING" component={SettingPage} selectedTab='setting' iconName='home'
                     setSelectTab={select => this.setSelectTab(select)}  getSelectTab={this.getSelectTab} />
                </TabNavigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 5
    }
})