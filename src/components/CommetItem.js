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

export default class CommentItem extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            thumbUp: this.props.thumbUp,
            votes: this.props.votes,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            thumbUp: nextProps.thumbUp,
            votes: nextProps.votes,
        })
    }

    //点赞
    thumbUp() {
        let votes = this.state.thumbUp
            ? this.state.votes - 1
            : this.state.votes + 1

        this.setState({
            thumbUp: !this.state.thumbUp,
            votes,
        })
    }

    render() {
        return (
            <View style={s.commentItem}>
                <View style={s.commentInfo}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={s.commentName}>{this.props.name}</Text>
                        <Text style={s.commentTime}>
                            {moment(this.props.addTime).format(
                                'YYYY-MM-DD HH:mm',
                            )}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.thumbUp()}
                        style={{ flexDirection: 'row' }}
                    >
                        <Text style={{ color: '#555', marginRight: 5 }}>
                            {this.state.votes > 999 ? 999 : this.state.votes}
                        </Text>
                        <Icon
                            name="thumbs-up"
                            size={16}
                            color={this.state.thumbUp ? '#f60' : '#888'}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={s.commentInner}>{this.props.inner}</Text>
            </View>
        )
    }
}

const s = StyleSheet.create({
    commentTitle: {
        fontSize: 18,
        color: '#222',
        marginBottom: 40,
        paddingTop: 20,
    },
    commentItem: {
        marginBottom: 20,
        paddingBottom: 20,
        borderColor: '#ddd',
        borderBottomWidth: 0.5,
    },
    commentInfo: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commentName: {
        marginRight: 20,
    },
    commentTime: {
        color: '#888',
    },
    commentInner: {
        fontSize: 16,
        lineHeight: 22,
        color: '#555',
    },
    noCommentText: {
        color: '#888',
        marginBottom: 15,
    },
})
