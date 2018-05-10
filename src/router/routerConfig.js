import Todo from '../views/Todo/Todo.js'
import BookListNavigation from '../views/Books/index'
import SandsListNavigation from './SandsRouter'
import User from '../views/Books/bookList'
import LoginIn from '../views/LoginIn/LoginIn.js'
import Category from '../views/Category/Category.js'
import Setting from '../views/Settings/Setting.js'
import TodoConf from '../views/Settings/TodoConf.js'
import Jira from '../views/Settings/Jira.js'
import { StackNavigator } from 'react-navigation'

export const mainRouter = {
    Todo: {
        navigationStack: StackNavigator({
            Todolist: {
                screen: Todo,
                navigationOptions: {
                    headerTitle: 'TODO',
                    headerStyle: {
                        backgroundColor: '#ffc800',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                },
            },
        }),
        title: 'Todo',
        icon: 'calendar-check-o',
    },
    SandsList: {
        navigationStack: SandsListNavigation,
        title: 'Sands',
        icon: 'paint-brush',
    },
    Book: {
        navigationStack: BookListNavigation,
        title: 'Book',
        icon: 'book',
    },
    User: {
        component: User,
        title: 'Setting',
        icon: 'user',
    },
}
export const LRrouter = {
    LoginIn: {
        component: LoginIn,
    },
}

export const SettingRouter = {
    Setting: {
        component: Setting,
        title: 'SETTING',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#3f51b5',
            },
            headerTitleStyle: {
                color: '#fff',
            },
        },
    },
    TodoConf: {
        component: TodoConf,
        title: 'Todo',
    },
    Jira: {
        component: Jira,
        title: 'Jira',
    },
}
