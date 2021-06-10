import "react-native-gesture-handler";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Wallet from "./src/Pages/wallet";
import { AuthContext } from "./components/context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainStackScreen from "./src/Pages/mainStack";
import Models from "./models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginReducer, initialLoginState } from "./src/reducers/loginReducer";

const Drawer = createDrawerNavigator();

function App() {
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        let userToken;
        userToken = null;
        if (userName == Models.username && password == Models.password) {
          try {
            userToken = "dfgdfg";
            await AsyncStorage.setItem("userToken", userToken);
          } catch (e) {
            console.log();
          }
          userToken = "dfgdfg";
        }
        console.log("user token: ", userToken);
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log();
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: (userName) => {
        try {
          userToken = "dfgdfg";
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log();
        }
        dispatch({ type: "REGISTER", id: userName, token: userToken });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log();
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
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
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator>
            <Drawer.Screen name="wallet" component={Wallet} />
          </Drawer.Navigator>
        ) : (
          <MainStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
