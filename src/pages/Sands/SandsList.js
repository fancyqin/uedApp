import React, { Component,PureComponent } from 'react';
import { View,Text,StyleSheet,FlatList,TouchableOpacity,Image } from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import Navbar from '../../component/Navbar';
import SandsData from '../../../res/data/sands.json';


class SandsListTabPage extends PureComponent{
    constructor(props){
        super(props);
        
        this.state = {
            dataSource: [],
            refreshing: false       
            
        }
        
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){

        this.setState({
            dataSource: SandsData.info.data
        })
    }

    renderRowItem(it){
        
        return (
            <View style={styles.sandsListItem}>
                <TouchableOpacity style={styles.sandMain} onPress={this.props.selectItem} >
                    <View style={styles.sandItemText} onPress={this.props.onSelect}>
                        <Text style={styles.sandTitle} numberOfLines={2}>{it.title}</Text>
                        <Text style={styles.sandAuthor}>{it.author}</Text>
                        <Text style={styles.sandTime}>{moment(it.addTime).format('YYYY-MM-DD')}</Text>
                    </View>
                    <Image style={{width:140,height:100}} source={require('../../../res/img/img.jpg')}  />
                </TouchableOpacity>
                <View style={styles.sandOtherWrap}>
                    
                    <View style={styles.otherLeft}>
                    
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={this.props.thumbUp}>
                                <Icon style={{marginRight:5}}  name="thumbs-up" size={16} color="#999" />
                            </TouchableOpacity>
                            <Text style={{color: '#555'}}>{it.votes.length}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginLeft:20}}>
                            <Icon style={{marginRight:5,marginLeft:20}} name="more-horizontal" size={16} color="#999" />
                            <Text style={{color: '#555'}}>{it.commentCount > 999 ? 999:it.commentCount}</Text>
                        </View>
                    </View>
                    <TouchableOpacity><Icon name="share-2" size={16} color="#999" /></TouchableOpacity>
                </View>
            </View> 
        )
    }

    onRefresh(){
        this.setState({
            refreshing: true
        })

        setTimeout(()=>{
            this.setState({
                refreshing: false
            })
        },2000)
    }
    
    render(){
        return (
            <View style={{flex:1}}>
                <FlatList
                style={styles.sandItemWrap}
                data={this.state.dataSource}
                renderItem={({item}) => this.renderRowItem(item)}
                onRefresh = {this.onRefresh}
                refreshing = {this.state.refreshing}
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
    },

    sandItemWrap:{
        flex:1,
        backgroundColor:'#f3f5f7',
        paddingTop: 10,
        paddingBottom: 60,
    },
    sandsListItem:{
        backgroundColor:'white',
        padding:10,
        marginLeft:10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius:2,
        //iOS的阴影
        shadowColor:'#b5b5b5',
        shadowOffset:{width:3,height:2},
        shadowOpacity:0.4,
        shadowRadius:1,
        //Android的阴影
        elevation:2
    },
    sandMain:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    sandItemText:{
        display:'flex',
        flexWrap: 'wrap',
        marginRight: 20,
        alignContent: 'space-between',
        flexShrink: 1,
    },
    sandTitle:{
        fontSize: 18,
        display:'flex',
        fontWeight: 'bold',
        marginBottom: 5
    },
    sandAuthor:{
        color: '#888',
        fontSize: 16,
        marginBottom: 10
    },
    sandTime:{
        color:'#888',
        fontSize: 12
    },
    sandOtherWrap:{
        borderTopWidth: 0.5,
        borderColor: '#ddd',
        display:'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 10,
        marginTop: 10,
    },  
    otherLeft:{
        display:'flex',
        flexDirection: 'row',
    }
    
});
