import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import Gallery from 'react-native-image-gallery'
import Icon from 'react-native-vector-icons/Feather'

export default class ImageGallery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            index: 0,
            images: this.props.navigation.state.params.imgList,
            show: 'flex',
        }
        this.onChangeImage = this.onChangeImage.bind(this)
    }

    componentWillMount() {
        StatusBar.setHidden(true)
    }

    onChangeImage(index) {
        this.setState({ index })
    }

    renderError() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 15,
                        fontStyle: 'italic',
                    }}
                >
                    This image cannot be displayed...
                </Text>
            </View>
        )
    }

    // get caption () {
    //     const { images, index } = this.state;
    //     return (
    //         <View style={{ bottom: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
    //             <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontStyle: 'italic' }}>{ (images[index] && images[index].caption) || '' } </Text>
    //         </View>
    //     );
    // }

    get galleryCount() {
        const { index, images } = this.state
        return (
            <View
                style={{
                    bottom: 10,
                    height: 40,
                    width: '100%',
                    position: 'absolute',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <Text
                    style={{
                        display: 'flex',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 14,
                        padding: 10,
                        flexShrink: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }}
                >
                    {index + 1} / {images.length}
                </Text>
            </View>
        )
    }

    closeGallery() {
        this.props.navigation.goBack()
        this.setState({
            show: 'none',
        })
        StatusBar.setHidden(false)
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    display: this.state.show,
                    backgroundColor: 'transparent',
                }}
            >
                <Icon
                    style={{
                        position: 'absolute',
                        right: 20,
                        top: 20,
                        zIndex: 99,
                    }}
                    size={32}
                    color="white"
                    name="x"
                    onPress={() => this.closeGallery()}
                />
                <Gallery
                    style={{ flex: 1, backgroundColor: '#000' }}
                    images={this.state.images}
                    errorComponent={this.renderError}
                    onPageSelected={this.onChangeImage}
                    initialPage={this.props.navigation.state.params.index - 1}
                />
                {this.galleryCount}
                {/* { this.caption } */}
            </View>
        )
    }
}
