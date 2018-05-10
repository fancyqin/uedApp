import React, { Component, PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    InteractionManager,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Toast from 'react-native-easy-toast'
import moment from 'moment'

import HTMLView from 'react-native-htmlview'

import ImageGallery from '../../components/ImageGallery'
import AutoSizeImage from '../../components/AutoSizedImage'
import CommentItem from '../../components/CommetItem'

console.disableYellowBox = true

export default class SandsDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            commentText: '', //评论
            keyboardVerticalOffset: 64,
        }
    }

    componentWillMount() {
        this.loadData()
    }

    componentDidMount() {
        const withCommentJump = this.props.navigation.state.params
            .withCommentJump

        //延迟执行
        InteractionManager.runAfterInteractions(() => {
            this.refs.detailWrap.measure((x, y, w, h, px, py) => {
                this.setState({
                    keyboardVerticalOffset: py,
                })
            })
            if (withCommentJump) {
                this.refs.commentBox.measure((x, y) => {
                    this._scrollView.scrollTo({ x: 0, y: y, animated: true })
                })
            }
        })
    }

    loadData() {
        let info = this.props.navigation.state.params
        this.setState({
            ...info,
            votesNum: info.votes.length,
        })
    }

    //点赞
    thumbUp() {
        let votesNum = this.state.thumbUp
            ? this.state.votesNum - 1
            : this.state.votesNum + 1

        this.setState({
            thumbUp: !this.state.thumbUp,
            votesNum,
        })
    }

    //评论
    comment() {
        const val = this.state.commentText

        if (!val) {
            this.refs.toast.show('请输入评论内容')
            return
        }
        if (val.length > 100) {
            this.refs.toast.show('请输入不超过100个字符长度')
        }

        let newCommentItem = {
            name: '蔡依林',
            inner: val,
            addTime: new Date(),
            votes: 0,
            thumbUp: false,
        }

        let newArr = []
        newArr = newArr.concat(this.state.comments)

        newArr.unshift(newCommentItem)

        this.setState({
            commentText: '',
            comments: newArr,
        })
    }

    openGallery(index) {
        let imgList = [
            { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
            { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
            { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
            { source: { uri: 'http://i.imgur.com/30s12Qj.jpg' } },
        ]

        this.props.navigation.navigate('ImageGallery', {
            ...this.props,
            index,
            imgList,
            transition: 'showTransition',
        })
    }

    //htmlview img fix
    renderNode(node, index, siblings, parent, defaultRenderer) {
        if (node.name == 'img') {
            const { src, width, height } = node.attribs

            return (
                <AutoSizeImage
                    key={index}
                    onPress={() => this.openGallery(index)}
                    source={{ uri: src }}
                    style={{ width: 0, height: 0, marginBottom: 15 }}
                    offset={30}
                />
            )
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={this.state.keyboardVerticalOffset} //距离顶部偏移，即标题栏高度
                style={{ backgroundColor: 'white' }}
            >
                <ScrollView
                    ref={comp => {
                        this._scrollView = comp
                    }}
                >
                    <View ref="detailWrap" style={s.detailWrap}>
                        <Text style={s.detailTitle}>{this.state.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 20 }}>
                                {this.state.author}
                            </Text>
                            <Text>
                                {moment(this.state.addTime).format(
                                    'YYYY-MM-DD HH:mm',
                                )}
                            </Text>
                        </View>
                        <View style={s.detailInner}>
                            <HTMLView
                                value={this.state.content}
                                stylesheet={htmlStyle}
                                renderNode={this.renderNode.bind(this)}
                            />
                        </View>
                        <View style={s.thumbUpBox}>
                            <TouchableOpacity
                                onPress={() => this.thumbUp()}
                                style={s.thumbUpIcon}
                            >
                                <Icon
                                    name="thumbs-up"
                                    size={32}
                                    color={this.state.thumbUp ? '#f60' : '#888'}
                                />
                            </TouchableOpacity>
                            <Text>{this.state.votesNum}人觉得很赞</Text>
                        </View>
                        <View ref="commentBox">
                            <Text style={s.commentTitle}>文章评论</Text>

                            <FlatList
                                data={this.state.comments}
                                // extraData={this.state}

                                renderItem={({ item }) => (
                                    <CommentItem {...this.props} {...item} />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                ListEmptyComponent={
                                    <Text style={s.noCommentText}>
                                        暂无评论
                                    </Text>
                                }
                            />
                        </View>
                    </View>

                    <View style={s.InputBox}>
                        <TextInput
                            onChangeText={commentText =>
                                this.setState({ commentText })
                            }
                            style={s.InputEl}
                            placeholder={'请发表你的看法'}
                            value={this.state.commentText}
                            maxLength={100}
                        />
                        <TouchableOpacity
                            onPress={() => this.comment()}
                            style={s.InputBtn}
                        >
                            <Text style={s.InputBtnText}>评论</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Toast ref="toast" position="center" />
            </KeyboardAvoidingView>
        )
    }
}

const s = StyleSheet.create({
    detailWrap: {
        flex: 1,
        padding: 15,
        paddingBottom: 0,
        backgroundColor: 'white',
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailInner: {
        marginTop: 30,
    },

    thumbUpBox: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
    thumbUpIcon: {
        width: 60,
        height: 60,
        marginBottom: 10,
        borderRadius: 30,
        borderColor: '#ddd',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    commentTitle: {
        fontSize: 18,
        color: '#222',
        marginBottom: 40,
        paddingTop: 20,
    },
    noCommentText: {
        color: '#888',
        marginBottom: 15,
    },
    InputBox: {
        margin: 15,
        marginTop: 0,
        borderWidth: 0.5,
        borderRadius: 3,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    InputEl: {
        height: 40,
        padding: 10,
        flexShrink: 1,
        width: 500,
    },
    InputBtn: {
        height: 40,
        padding: 10,
        backgroundColor: '#35a954',
        width: 60,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    InputBtnText: {
        color: 'white',
    },
})

const htmlStyle = StyleSheet.create({
    blockquote: {
        borderLeftWidth: 5,
        borderColor: '#ccc',
        color: '#777',
        borderRadius: 2,
        fontStyle: 'italic',
    },
    p: {
        color: '#555',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 0,
        marginBottom: 0,
    },
    h1: {
        fontSize: 20,
        marginTop: 5,
        marginBottom: 5,
    },
    h2: {
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
    },
    h3: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5,
    },
    h4: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5,
    },
    ol: {
        paddingLeft: 10,
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
    },
    ul: {
        paddingLeft: 10,
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
    },
})
