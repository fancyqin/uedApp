import React, { Component, PureComponent } from 'react'
import { View, Text, StatusBar, Animated, Easing } from 'react-native'
import { createStackNavigator, createTabNavigator, TabBarTop } from 'react-navigation'
import {SandsTabOptions} from './index';
import SandsListTabPage from '../pages/Sands/SandsList'
import SandsDetail from '../pages/Sands/SandsDetail'
import ImageGallery from '../components/ImageGallery'
import Icon from 'react-native-vector-icons/Feather'
import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator.js'

const mainColor = '#35a954'

const TabScreen = params => {
    return class Screen extends Component {
        render() {
            return <SandsListTabPage {...this.props} {...params} />
        }
    }
}

const SandListTabNavigator = createTabNavigator(
    {
        All: {
            screen: TabScreen({ tag: 'all' }),
            navigationOptions: {
                title: '全部',
            },
        },
        Ux: {
            screen: TabScreen({ tag: 'ux' }),
            navigationOptions: {
                title: '交互',
            },
        },
        Ui: {
            screen: TabScreen({ tag: 'ui' }),
            navigationOptions: {
                title: '视觉',
            },
        },
        Fe: {
            screen: TabScreen({ tag: 'fe' }),
            navigationOptions: {
                title: '前端',
            },
        },
    },
    {
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: mainColor,
            inactiveTintColor: '#888',
            indicatorStyle: {
                backgroundColor: mainColor,
            },
            labelStyle: {
                fontSize: 16,
            },
            style: {
                backgroundColor: 'white',
            },
        },
        animationEnabled: true,
        swipeEnabled: true,
    },
)

class SandsDetailScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: navigation.state.params.title,
        headerLeft: (
            <Icon
                style={{ marginLeft: 5 }}
                name="chevron-left"
                size={24}
                color="white"
                onPress={() => {
                    navigation.goBack()
                }}
            />
        ),
        tabBarVisible: false,
    })

    render() {
        return <SandsDetail {...this.props} />
    }
}

class ImageGalleryScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        tabBarVisible: false,
    })

    render() {
        return <ImageGallery {...this.props} />
    }
}

const showTransition = sceneProps => {
    // const {position, scene} = sceneProps;
    // const {index} = scene;
    // const inputRange = [index - 1, index, index + 1];
    // const opacity = position.interpolate({
    //     inputRange,
    //     outputRange: [.8, 1, 1],
    // });

    return {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
    }
}

const TransitionConfiguration = () => ({
    screenInterpolator: sceneProps => {
        const { scene } = sceneProps
        const { route } = scene
        const params = route.params || {}
        const transition = params.transition || 'forHorizontal'
        switch (transition) {
            case 'showTransition':
                return showTransition(sceneProps)
                break
            default:
                return CardStackStyleInterpolator[transition](sceneProps)
        }
    },
})

const SandsStack = createStackNavigator(
    {
        SandsList: {
            screen: SandListTabNavigator,
            navigationOptions: {
                headerBackTitle: null,
                headerTitle: 'SANDS',
                headerStyle: {
                    backgroundColor: mainColor,
                },
                headerTitleStyle: {
                    color: '#fff',
                },
            },
        },
        SandsDetail: {
            screen: SandsDetailScreen,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: mainColor,
                },
                headerTitleStyle: {
                    color: '#fff',
                }
            },
        },
        ImageGallery: {
            screen: ImageGalleryScreen,
            navigationOptions: {
                header: null,
            },
        },
    },
    // {
    //     // navigationOptions:({navigation})=>{
    //     //     const {routeName} = navigation.state;
    //     //     const isHide = routeName === 'SandsDetail' || routeName === 'ImageGallery'
            
    //     //     SandsTabOptions.navigationOptions.tabBarVisible = !isHide;            
    //     // },
    //     // navigationOptions:({navigation}) =>{
    //     //     let {routeName} = navigation.state;
    //     //     let navigationOptions = {};
    //     //     if(routeName === 'SandsDetail'){
    //     //         navigationOptions.tabBarVisible = false
    //     //     }

    //     //     return navigationOptions
    //     // },
    //     transitionConfig: TransitionConfiguration,
    // },
);
SandsStack.navigationOptions = ({navigation}) =>{
    let {routeName} = navigation.state.routes[navigation.state.index];
    console.log(routeName)
    let navigationOptions = {};
    if(routeName === 'SandsDetail' || routeName === 'ImageGallery'){
        navigationOptions.tabBarVisible = false
    }

    return navigationOptions
}


export default SandsStack;

