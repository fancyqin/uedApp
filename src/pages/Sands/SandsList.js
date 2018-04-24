import React, { Component,PureComponent } from 'react';
import { View,Text,StyleSheet,FlatList,TouchableOpacity,Image } from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import Navbar from '../../component/Navbar';
import SandsData from '../../../res/data/sands.json';



class SandItemCell extends PureComponent{
    
    constructor(props){
        super(props);
        this.state={
            thumbUp: this.props.thumbUp,
            votes: this.props.votes.length
        }
    }


    //选择详情
    selectItem(){
        
    }

    //点赞    
    thumbUp(){
        let votes = this.state.thumbUp ? this.state.votes - 1: this.state.votes + 1
        
        this.setState({
            thumbUp: !this.state.thumbUp,
            votes
        })
    }

    renderThumbUp(){
        if(this.state.thumbUp){
            return <Icon style={{marginRight:5}}  name="thumbs-up" size={16} color='#f60' />
        }else{
            return <Icon style={{marginRight:5}}  name="thumbs-up" size={16} color='#888' />
        }
    }
    

    render(){
        return (
            <View style={styles.sandsListItem}>
                <TouchableOpacity style={styles.sandMain} onPress={() => this.selectItem()} >
                    <View style={styles.sandItemText}>
                        <Text style={styles.sandTitle} numberOfLines={2}>{this.props.title}</Text>
                        <Text style={styles.sandAuthor}>{this.props.author}</Text>
                        <Text style={styles.sandTime}>{moment(this.props.addTime).format('YYYY-MM-DD')}</Text>
                    </View>
                    <Image style={{width:140,height:100}} source={require('../../../res/img/img.jpg')}  />
                </TouchableOpacity>
                <View style={styles.sandOtherWrap}>
                    
                    <View style={styles.otherLeft}>
                    
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={() => this.thumbUp()}>
                                
                                {this.renderThumbUp()}
                                
                            </TouchableOpacity>
                            <Text style={{color: '#555'}}>{this.state.votes}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginLeft:20}}>
                            <Icon style={{marginRight:5,marginLeft:20}} name="more-horizontal" size={16} color="#999" />
                            <Text style={{color: '#555'}}>{this.props.commentCount > 999 ? 999:this.props.commentCount}</Text>
                        </View>
                    </View>
                    <TouchableOpacity><Icon name="share-2" size={16} color="#999" /></TouchableOpacity>
                </View>
            </View> 
        )
    }

}



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


    getDataByTag(tag){
        let data = [];
        SandsData.info.data.forEach(item => {
            if(item.tag.indexOf(tag) > -1){
                data.push(item);
            }
        });
        return data;
    }

    loadData(){
        let tag = this.props.tag;
        let listData;
        if(tag === 'all'){
            listData = SandsData.info.data
        }else{
            listData = this.getDataByTag(tag);
        }
        this.setState({
            dataSource: listData
        })
    }

   

    renderRowItem(it){
        
        return (
            <SandItemCell {...it} />
        )
    }


    //下拉刷新
    count = 0;
    onRefresh =() =>{
        this.setState({
            refreshing: true
        })

        const timer = setTimeout(()=>{
            clearTimeout(timer);
            this.state.dataSource.unshift(
                {
                    title:'下拉刷新的新增数据---'+ this.count,
                    author:'比尔盖茨',
                    votes:[1,23,4,5,66,4,4],
                    addTime:'2018-04-22',
                    commentCount: parseInt(Math.random()*1000)
                }
            )
            this.count ++;

            this.setState({
                refreshing: false
            })
        },1000)
    }
    //上拉加载
    count2 = 0
    onEndReached = ()=>{
        this.state.dataSource.push({
            title:'上拉刷新的新增数据---'+ this.count2,
            author:'乔布斯',
            votes:[1,23,4,5,66,4],
            addTime:'2011-03-23',
            commentCount: parseInt(Math.random()*1000)
        })
        this.count2++
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
                onEndReachedThreshold = {0.1}
                onEndReached = {this.onEndReached}
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
            <View style={styles.sandList}>
                <Navbar title="SANDS" />
                <ScrollableTabView 
                    tabBarBackgroundColor='white'
                    tabBarActiveTextColor="#574435"
                    tabBarInactiveTextColor="#999"
                    tabBarUnderlineStyle ={{backgroundColor:'#574435',height:2}}
                    renderTabBar={()=> <ScrollableTabBar/>}
                >
                    <SandsListTabPage {...this.props} tabLabel="全部" tag="all" />
                    <SandsListTabPage {...this.props} tabLabel="交互" tag="ux" />
                    <SandsListTabPage {...this.props} tabLabel="视觉" tag="ui" />
                    <SandsListTabPage {...this.props} tabLabel="前端" tag="fe" />
                    
                </ScrollableTabView>
            </View>
            
        )
    }
}





const styles = StyleSheet.create({
    sandList:{
        flex:1,
        position:'absolute',
        top: 0,
        left:0,
        right:0,
        bottom:50,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    sandItemWrap:{
        flex:1,
        paddingTop: 10,
        paddingBottom: 20,
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
