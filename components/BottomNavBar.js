import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SearchIcon from "react-native-vector-icons/Feather";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import wallet from "../src/Pages/wallet";
import calendar from "../src/Pages/calendar";
import search from "../src/Pages/search";

const Tab = createMaterialBottomTabNavigator();

const BottomNavBar = () => (
  <Tab.Navigator
    initialRouteName="home"
    activeColor="#F5ECDE"
    barStyle={{
      backgroundColor: "#323232",
      borderWidth: 0.5,
      borderBottomWidth: 1,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      borderColor: "transparent",
      overflow: "hidden",
      bottom: -5,
    }}
  >
    <Tab.Screen
      name="Home"
      component={wallet}
      options={{
        tabBarLabel: "",
        tabBarColor: "#CD9F59",
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="Calendar"
      component={calendar}
      options={{
        tabBarLabel: "",
        tabBarColor: "#CD9F59",
        tabBarIcon: ({ color }) => (
          <Icon name="calendar" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={search}
      options={{
        tabBarLabel: "",
        tabBarColor: "#CD9F59",
        tabBarIcon: ({ color }) => (
          <SearchIcon name="search" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#323232",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: -10,
  },
  weird: {
    marginBottom: 30,
  },
});
export default BottomNavBar;
