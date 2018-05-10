import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    SwitchNavigator,
    TabBarBottom,
} from 'react-navigation'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { mainRouter, LRrouter, SettingRouter } from './routerConfig'

const paramsToProps = SomeComponent => {
    return class extends Component {
        static navigationOptions = SomeComponent.navigationOptions
        render() {
            const { navigation, ...otherProps } = this.props
            const {
                state: { params },
            } = navigation
            return <SomeComponent {...this.props} {...params} />
        }
    }
}
let routesFunc = router => {
    return Object.entries(router).reduce((total, [key, value]) => {
        total[key] = {
            screen: paramsToProps(value.component),
            navigationOptions: ({ navigation }) => ({
                title: value.title,
                ...value.navigationOptions,
            }),
        }
        return total
    }, {})
}
let wrapTabConfig = router => {
    return Object.entries(router).reduce((total, [key, value]) => {
        if (key === 'User') {
            total[key] = {
                screen: StackNavigator(routesFunc(SettingRouter), {
                    mode: 'card',
                    headerMode: 'screen',
                }),
                navigationOptions: {
                    title: value.title,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon
                                name={value.icon}
                                size={24}
                                color={focused ? '#574435' : '#999'}
                            />
                        )
                    },
                    tabBarOnPress: e => {
                        let scene = e.scene.route.key
                        if (scene === 'Todo') {
                            StatusBar.setBarStyle('default')
                        } else {
                            StatusBar.setBarStyle('light-content')
                        }

                        e.jumpToIndex(e.scene.index)
                    },
                },
            }
        } else {
            total[key] = {
                screen: value.component
                    ? paramsToProps(value.component)
                    : value.navigationStack,
                navigationOptions: {
                    title: value.title,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon
                                name={value.icon}
                                size={24}
                                color={focused ? '#574435' : '#999'}
                            />
                        )
                    },
                    ...value.navigationOptions,
                    tabBarOnPress: e => {
                        let scene = e.scene.route.key
                        if (scene === 'Todo') {
                            StatusBar.setBarStyle('default')
                        } else {
                            StatusBar.setBarStyle('light-content')
                        }

                        e.jumpToIndex(e.scene.index)
                    },
                },
            }
        }
        return total
    }, {})
}
const stackNavigatorConfig = {
    mode: 'card',
    headerMode: 'none',
}
const TabNavigatorConfig = {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
        activeTintColor: '#574435',
    },
    initialRouteName: 'Todo',
}

const MainCardNavigator = TabNavigator(
    wrapTabConfig(mainRouter),
    TabNavigatorConfig,
)
const MainLRNavigator = StackNavigator(
    routesFunc(LRrouter),
    Object.assign({}, stackNavigatorConfig, { initialRouteName: 'LoginIn' }),
)

const MainModalNavigator = SwitchNavigator(
    {
        ModalScreen: MainLRNavigator,
        MainCardNavigator: MainCardNavigator,
    },
    {
        initialRouteName: 'ModalScreen',
        headerMode: 'none',
    },
)
export const AppNavigator = MainModalNavigator
