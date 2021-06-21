import "react-native-gesture-handler";
import * as React from "react";
import { useEffect, useMemo } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Wallet from "./src/Pages/wallet";
import { AuthContext } from "./components/context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainStackScreen from "./src/Pages/mainStack";
import Models from "./models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "./src/store";
import { Provider } from "react-redux";
import { initialLoginState } from "./src/reducers/peopleReducer";
import { loginReducer } from "./src/reducers/loginReducer";
import BottomNavBar from "./components/BottomNavBar";
import Search from "./src/Pages/search";
import Calendar from "./src/Pages/calendar";
import User from "./models/User";

const Drawer = createDrawerNavigator();

function App() {
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (username) => {
        let userToken;
        userToken = null;
        try {
          userToken = "dfgdfg";
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log();
        }
        dispatch({ type: "LOGIN", id: username, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log();
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: async (username) => {
        let userToken;
        userToken = null;
        try {
          userToken = "dfgdfg";
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log();
        }
        dispatch({ type: "REGISTER", id: username, token: userToken });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log();
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
      //console.log("nut");
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Drawer.Navigator>
              <Drawer.Screen name="homeDrawer" component={BottomNavBar} />
              <Drawer.Screen name="wallet" component={Wallet} />
              <Drawer.Screen name="calendar" component={Calendar} />
              <Drawer.Screen name="search" component={Search} />
            </Drawer.Navigator>
          ) : (
            <MainStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
