import Home from "./src/screens/Home";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppStack = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },
  }
);

export default createAppContainer(AppStack);
