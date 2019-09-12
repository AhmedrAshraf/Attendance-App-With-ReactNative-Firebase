import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from './Home'
import Mark from './mark'
import Users from './users'
import Views from './view'
import Join from './join'

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        }
    },
    Mark: {
        screen: Mark,
    },
    Users: {
        screen: Users,
    },
    Views: {
        screen: Views,
    },
    Join: {
        screen: Join,
    },
},
    { initialRouteName: 'Home' }
);

export default createAppContainer(createSwitchNavigator(
    {
        App: AppNavigator,
    },
    {
        initialRouteName: 'App',
    }
)); 