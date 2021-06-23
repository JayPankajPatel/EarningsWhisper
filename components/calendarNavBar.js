import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DayCalendar from "./DayCalendar";
import WeekCalendar from "./WeekCalendar";
import MonthCalendar from "./MonthCalendar";

const Tab = createMaterialTopTabNavigator();

function CalendarNavBar() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#232220",
        inactiveTintColor: "#B77E0F",
        labelStyle: { textTransform: "none" },
        style: {
          backgroundColor: "#F5ECDE",
          color: "#B77E0F",
          width: 250,
          shadowOpacity: 0,
          elevation: 0,
          paddingVertical: 10,
        },
        indicatorStyle: {
          backgroundColor: "#C79A43",
          width: 60,
          marginLeft: 12,
        },
      }}
    >
      <Tab.Screen name="Day" component={DayCalendar} />
      <Tab.Screen name="Week" component={WeekCalendar} />
      <Tab.Screen name="Month" component={MonthCalendar} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 30,
    width: 250,
  },
  fontStyle: {
    fontFamily: "Roboto",
    fontWeight: "300",
    letterSpacing: 2,
    color: "#B77E0F",
    shadowColor: "#F5ECDE",
  },
});

export default CalendarNavBar;
