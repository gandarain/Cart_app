import React from 'react'
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// ***** Import Screen ***** //
import HomeScreen from '../screen/home/Home'
import CartScreen from '../screen/cart/Cart'
// ***** /Import Screen ***** //

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    }
  }
})

const CartStack = createStackNavigator({
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      headerShown: false
    }
  }
})

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Cart: CartStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/display-name
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Home') {
          iconName = 'home'
        } else {
          iconName = 'cart'
        }
        return (
          <Icon name={iconName} type="MaterialCommunityIcons" style={{ color: tintColor, fontSize: 25 }} />
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: '#4CBB17',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#FFFFFF',
      }
    },
  }
)

const AppNavigator = createSwitchNavigator({
  TabNavigator: TabNavigator,
})

export default createAppContainer(AppNavigator)