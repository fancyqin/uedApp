import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'




class SandsListTabPage extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return (
            <Text>{this.props.content}</Text>
        )
    }


}

export default class SandsList extends Component{

    render(){
        return(
            <View style={styles.container}>
                <ScrollableTabView 
                tabBarBackgroundColor='blue'
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle ={{backgroundColor:'#e7e7e7',height:2}}
                renderTabBar={()=> <ScrollableTabBar/>  }
                >
                    <SandsListTabPage {...this.props} tabLabel="交互" content="交互" />
                    <SandsListTabPage {...this.props} tabLabel="前端" content="前端" />
                    <SandsListTabPage {...this.props} tabLabel="视觉" content="视觉" />
               </ScrollableTabView>
               <Text>fuck</Text>
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

