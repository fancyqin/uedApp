import React, { Component,PureComponent } from 'react';
import { View,Text,StyleSheet,FlatList } from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Navbar from '../../component/Navbar';




class SandsListTabPage extends PureComponent{
    constructor(props){
        super(props);
        
        this.state = {
            dataSource: [],
            selected: null
        }
    }

    componentDidMount(){
        
    }

    loadData(){
        
    }
    
    render(){
        console.log(this.props)
        return (
            <View style={styles.container}>
                <FlatList
                data={[{key:'a'},{key:'b'}]}
                renderItem={({item}) => <Text>{item.key}</Text>}
                />
            </View>
        )
    }


}

export default class SandsList extends Component{

    constructor(props){
        super(props);
    }



    render(){
        return(
            <View style={{flex:1}}>
                <Navbar title="SANDS" />
                <ScrollableTabView 
                    tabBarBackgroundColor='white'
                    tabBarInactiveTextColor="mintcream"
                    tabBarActiveTextColor="#574435"
                    tabBarInactiveTextColor="#999"
                    tabBarUnderlineStyle ={{backgroundColor:'#574435',height:2}}
                    renderTabBar={()=> <ScrollableTabBar/>}
                >
                    <SandsListTabPage {...this.props} tabLabel="全部" contents="全部" />
                    <SandsListTabPage {...this.props} tabLabel="交互" contents="交互" />
                    <SandsListTabPage {...this.props} tabLabel="视觉" contents="视觉" />
                    <SandsListTabPage {...this.props} tabLabel="前端" contents="前端" />
                    
                </ScrollableTabView>
            </View>
            
        )
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
