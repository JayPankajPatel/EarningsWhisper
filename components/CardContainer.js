import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import TopBar from "./TopBar";
import Logo from "../src/resources/logo";
import Chip from "../src/resources/chip";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CardContainer = (props) => {
  const [isOn, setOn] = useState(false);
  const [firstTime, setFirst] = useState(true);
  const [isLoading, setisLoading] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title={"Card"} />
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={async () => {
          setOn(!isOn);
          if (isOn == false) {
            props.loadCard(await AsyncStorage.getItem("ewallet"));
            if (props.cardNum !== null) {
              setisLoading(false);
            }
          }
          // if(firstTime == true){

          // }
        }}
      >
        {isOn == true && isLoading == false ? (
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={[
              "rgba(94,59,7,1)",
              "rgba(45,37,25,0.69)",
              "rgba(56,36,6,1)",
            ]}
            style={styles.background}
          >
            <View style={styles.strip}></View>
            <Text style={styles.csvText}>CSV: {props.cardCSV || "234"}</Text>
            <Text style={styles.cardText}>
              {props.cardNum || "1234 5678 9123 1234"}
            </Text>
            <View style={styles.csv}></View>
            <Text style={styles.text}>
              {`${props.fname} ${props.lname}` || "John Doe"}
            </Text>
            <Text style={styles.date}>Exp: {props.cardExp || "03/23"}</Text>
          </LinearGradient>
        ) : (
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={[
              "rgba(94,59,7,1)",
              "rgba(45,37,25,0.69)",
              "rgba(56,36,6,1)",
            ]}
            style={styles.background}
          >
            <Logo style={styles.logo} />
            <Chip style={styles.chip} />
            <Text style={styles.compName}>Earnings Whisper</Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    zIndex: 1,
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 10,
  },
  logo: {
    position: "absolute",
    zIndex: 6,
    bottom: 40,
    marginHorizontal: 40,
    transform: [{ rotate: "270deg" }],
  },
  chip: {
    position: "absolute",
    zIndex: 6,
    bottom: 30,
    marginHorizontal: 90,
    transform: [{ rotate: "270deg" }],
  },
  text: {
    position: "absolute",
    fontSize: 22,
    zIndex: 6,
    top: 370,
    right: -5,
    letterSpacing: 4,
    transform: [{ rotate: "270deg" }],
    color: "#F5ECDE",
  },
  compName: {
    position: "absolute",
    fontSize: 22,
    zIndex: 6,
    top: 140,
    right: -60,
    letterSpacing: 4,
    transform: [{ rotate: "270deg" }],
    color: "#F5ECDE",
  },
  strip: {
    position: "absolute",
    zIndex: 6,
    top: 225,
    right: 5,
    marginHorizontal: 40,
    transform: [{ rotate: "270deg" }],
    backgroundColor: "#141010",
    width: 506,
    height: 60,
  },
  csv: {
    position: "absolute",
    zIndex: 6,
    top: 320,
    left: -5,
    transform: [{ rotate: "270deg" }],
    backgroundColor: "#C4C4C4",
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  csvText: {
    color: "#000000",
    fontSize: 15,
    position: "absolute",
    zIndex: 7,
    top: 240,
    left: 115,
    transform: [{ rotate: "270deg" }],
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 25,
    position: "absolute",
    zIndex: 7,
    top: 340,
    left: 70,
    letterSpacing: 3,
    transform: [{ rotate: "270deg" }],
  },
  date: {
    position: "absolute",
    fontSize: 22,
    zIndex: 6,
    top: 100,
    right: -10,
    letterSpacing: 4,
    transform: [{ rotate: "270deg" }],
    color: "#F5ECDE",
  },
});

const mapStateToProps = (state) => {
  return {
    fname: state.fmame,
    lname: state.lname,
    cardNum: state.cardNum,
    cardCSV: state.cardCSV,
    cardExp: state.cardExp,
    fname: state.fname,
    lname: state.lname,
  };
};

export default connect(mapStateToProps, actions)(CardContainer);
