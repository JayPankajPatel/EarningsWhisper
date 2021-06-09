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
import AsyncStoreage from "@react-native-community/async-storage";

const Drawer = createDrawerNavigator();

function App() {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

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
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        // setUserToken("fkjk");
        // setIsLoading(false);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      //setIsLoading(false);
      let userToken;
      userToken = "fgg;";
      console.log("user token: ", userToken);
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
