import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Logo from "../src/resources/logo";
import PersonImg from "../src/resources/person";
import { LinearGradient } from "expo-linear-gradient";

const TopBar = (props) => {
  return (
    <View style={styles.navbar}>
      <LinearGradient
        colors={["#232220", "#443E36", "#312E2A"]}
        style={styles.logoContainer}
      >
        <Logo />
        <Text style={styles.logoTitle}>{props.title}</Text>
        {/*Person Touchable Opacity TODO:*/}
        <TouchableOpacity>
          <PersonImg />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoTitle: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 25,
    letterSpacing: 6,
    color: "#F5ECDE",
  },
  logoContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default TopBar;
