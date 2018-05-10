import React, { Component,PureComponent } from 'react';
import { View,Text,StyleSheet,FlatList,TouchableOpacity,Image,Share } from 'react-native';
// import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-easy-toast';
import moment from 'moment';

import SearchBar from '../../common/SearchBar'

import SandsData from '../../resources/data/sands.json';



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
        this.props.navigation.navigate('SandsDetail',{...this.props})
    }

    //跳转到详情评论
    selectItemWithComment(){
        this.props.navigation.navigate('SandsDetail',{...this.props,withCommentJump:true})
    }

    //点赞    
    thumbUp(){
        let votes = this.state.thumbUp ? this.state.votes - 1: this.state.votes + 1
        
        this.setState({
            thumbUp: !this.state.thumbUp,
            votes
        })
    }
    //分享
    shareItem(){

        _showResult = (result) => {
            if (result.action === Share.sharedAction) {
                this.refs.shareToast.show(`分享成功`)
            } else if (result.action === Share.dismissedAction) {
                this.refs.shareToast.show(`分享取消`)
            }
        }
        

        Share.share({
            message: this.props.title,
            title: this.props.title
        }, {
            dialogTitle: '分享一篇sands文章',
        })
        .then(_showResult)
        .catch((error) => console.error(error) );

        
        
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
                    <Image style={{width:140,height:100}} source={require('../../img/img.jpg')}  />
                </TouchableOpacity>
                <View style={styles.sandOtherWrap}>
                    
                    <View style={styles.otherLeft}>
                    
                        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => this.thumbUp()}>
                            
                            <Icon style={{marginRight:5}}  name="thumbs-up" size={16} 
                            color={this.state.thumbUp?'#f60':'#888'} />
                            <Text style={{color: '#555'}}>{this.state.votes > 999 ? 999:this.state.votes}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{flexDirection:'row',marginLeft:20}} onPress={() => this.selectItemWithComment()}>
                            <Icon style={{marginRight:5,marginLeft:20}} name="more-horizontal" size={16} color="#999" />
                            <Text style={{color: '#555'}}>{this.props.commentCount > 999 ? 999:this.props.commentCount}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>this.shareItem()}><Icon name="share-2" size={16} color="#888" /></TouchableOpacity>
                </View>
                <Toast ref="shareToast" position="top" />
            </View> 
        )
    }

}



export default class SandsListTabPage extends PureComponent{
    
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            refreshing: false       
            
        }
        
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
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
        this.setState({
            refreshing: true
        })
        let tag = this.props.tag;
        let listData;
        if(tag === 'all'){
            listData = SandsData.info.data
        }else{
            listData = this.getDataByTag(tag);
        }
        setTimeout(()=>{
            this.setState({
                dataSource: listData,
                refreshing: false,
                noMoreData: false,
            })
        },500)
        
    }

    



    //下拉刷新
    count = 0;
    timer = null
    onRefresh =() =>{
        this.setState({
            refreshing: true
        })

        this.timer = setTimeout(()=>{
            let arr = [].concat(this.state.dataSource);
            arr.unshift(
                {
                    _id:Date.now + Math.random() + '',
                    title:'下拉刷新的新增数据---'+ this.count,
                    author:'比尔盖茨',
                    votes:[1,23,4,5,66,4,4],
                    addTime:'2018-04-22',
                    commentCount: parseInt(Math.random()*1000),
                    tag:[]
                }
            )
            this.count ++;

            this.setState({
                dataSource: arr,
                refreshing: false
            })
        },1000)
    }
    //上拉加载
    count2 = 0
    onEndReached = ()=>{
        if(this.count2 > 5){
            this.setState({
                noMoreData: true
            })
            return;
        }
        // let arr = []
        let arr = [].concat(this.state.dataSource);
            
        arr.push({
            _id: Date.now + Math.random() + '',
            title:'上拉刷新的新增数据---'+ this.count2,
            author:'乔布斯',
            votes:[1,23,4,5,66,4],
            addTime:'2011-03-23',
            commentCount: parseInt(Math.random()*1000),
            tag:[]
        })
        this.count2++;

        this.setState({
            dataSource: arr
        })
    }
    
    render(){
        return (
            <View style={{flex:1}}>
                <FlatList
                style={styles.sandItemWrap}
                data={this.state.dataSource}
                renderItem={({item,index}) => <SandItemCell key={index} {...this.props} {...item} /> }
                keyExtractor={(item,index)=> item._id }
                ListFooterComponent={ this.state.noMoreData ? <Text style={{marginBottom: 20,textAlign:'center',color: '#888'}}>no more data</Text> :false }
                onRefresh = {this.onRefresh}
                refreshing = {this.state.refreshing}
                onEndReachedThreshold = {0.1}
                onEndReached = {this.onEndReached}
                />
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
        marginLeft:1,
        marginRight: 1,
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
        fontSize: 16,
        display:'flex',
        fontWeight: 'bold',
        marginBottom: 5
    },
    sandAuthor:{
        color: '#888',
        fontSize: 14,
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
