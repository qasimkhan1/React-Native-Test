import React from 'react';
import {View} from 'react-native';
import Home from './src/screens/Home';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
class App extends React.Component {
  static navigationOptions = {headerShown: false};

  render() {
    return <View style={{flex: 1, backgroundColor: 'red'}}></View>;
  }
}
const AppStack = createStackNavigator(
  {
    Home: {screen: Home},
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },
  },
);

export default createAppContainer(AppStack);
