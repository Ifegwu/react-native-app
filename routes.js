import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import Favorites from './screens/Favorites';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import User from './screens/User';
import Timer from './screens/Timer';
import Options from './screens/Options';
import CommentsContainer from './screens/CommentsContainer';
import WeatherContainer from './screens/WeatherContainer';
import MessagingContainer from './screens/MessagingContainer';

import colors from './utils/colors';

const getDrawerItemIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />
)

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const ContactsScreens = StackNavigator(
  {
    Contacts: {
      screen: Contacts,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Contacts',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('list'),
    },
  },
);

const FavoritesScreens = StackNavigator(
  {
    Favorites: {
      screen: Favorites,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Favorites',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('star'),
    },
  },
);

const UserScreens = StackNavigator(
  {
    User: {
      screen: User,
    },
    Options: {
        screen: Options,
    },
  },
  {
    mode: 'modal',
    initialRouteName: 'User',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('person'),
    },
  },
);

const TimerScreens = StackNavigator(
    {
      Timer: {
        screen: Timer,
      },
    },
    {
      initialRouteName: 'Timer',
      navigationOptions: {
        drawerIcon: getDrawerItemIcon('timer'),
      },
    },
);

const CommentsContainerScreens = StackNavigator(
  {
    CommentsContainer: {
      screen: CommentsContainer,
    },
  },
  {
    initialRouteKey: 'CommentsContainer',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('insert-chart')
    }
  }
);

const WeatherContainerScreens = StackNavigator(
  {
    WeatherContainer: {
      screen: WeatherContainer,
    },
  },
  {
    initialRouteName: 'WeatherContainer',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('cloud'),
    },
  },
);

const MessagingContainerScreens = StackNavigator(
  {
    MessagingContainer: {
      screen: MessagingContainer,
    },
  },
  {
    initialRouteName: 'MessagingContainer',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('chat'),
    },
  }
)

export default DrawerNavigator(
  {
    Contacts: {
      screen: ContactsScreens,
    },
    Favorites: {
      screen: FavoritesScreens,
    },
    User: {
      screen: UserScreens,
    },
    Timer: {
        screen: TimerScreens,
    },
    CommentsContainer: {
      screen: CommentsContainerScreens,
    },
    WeatherContainer: {
      screen: WeatherContainerScreens,
    },
    MessagingContainer: {
      screen: MessagingContainerScreens,
    }
  },
  {
    initialRouteName: 'Contacts',
    // tabBarPosition: 'bottom',
    // tabBarOptions: {
    //   style: {
    //     backgroundColor: colors.greyLight,
    //   },
    //   showLabel: false,
    //   showIcon: true,
    //   activeTintColor: colors.blue,
    //   inactiveTintColor: colors.greyDark,
    //   renderIndicator: () => null,
    // },
  },
);