import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import BoxInput from "./TextInput";

 
const Send = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [money, setMoney] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");

  const handleMoneyTransfer = async () => {
    props.TransferMoney(
      await AsyncStorage.getItem("ewallet"),
      money,
      email,
      desc
    );
  };

  return (
    <View style={[isOpen === true ? styles.background : styles.button]}>
      {isOpen == true ? (
        <ScrollView style={styles.ground}>
          <Text style={styles.text}>Send</Text>
          <BoxInput
            labelBox={styles.TextWrapper}
            styleFontText={styles.Text}
            textLabel={"Money:"}
            inputBox={styles.TextInputWrapper}
            value={money}
            inputStyleText={styles.TextInput}
            setChange={(value) => setMoney(value)}
          />
          <BoxInput
            labelBox={styles.TextWrapper}
            styleFontText={styles.Text}
            textLabel={"Enter Email:"}
            inputBox={styles.TextInputWrapper}
            value={email}
            inputStyleText={styles.TextInput}
            setChange={(value) => setEmail(value)}
          />
          <BoxInput
            labelBox={styles.TextWrapper}
            styleFontText={styles.Text}
            textLabel={"Desc:"}
            inputBox={styles.TextInputWrapper}
            value={desc}
            inputStyleText={styles.TextInput}
            setChange={(value) => setDesc(value)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#F5ECDE",
              marginHorizontal: 40,
              padding: 5,
              borderRadius: 10,
              marginVertical: 10,
              right: -10,
            }}
            onPress={() => {
              setIsOpen(false);
              handleMoneyTransfer();
            }}
          >
            <Text style={[styles.text, { color: "#323232" }]}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setIsOpen(true);
          }}
        >
          <View
            style={{
              backgroundColor: "#F5ECDE",
              padding: 8,
              borderRadius: 50,
            }}
          >
            <Icon name="send" color={"#FDB33E"} size={30} />
          </View>
          <Text style={{ color: "#F5ECDE", textAlign: "center" }}>Send</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#323232",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 30,
    display: "flex",
    flexDirection: "column",
  },
  background: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 10,
    height: 200,
    width: 300,
    top: -200,
    left: 55,
    backgroundColor: "rgba(35,34,32,0.8)",
  },
  ground: {
    display: "flex",
  },
  text: {
    color: "#F5ECDE",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },
  TextWrapper: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  Text: {
    fontSize: 14,
    fontFamily: "Roboto",
    lineHeight: 18,
    color: "#F5ECDE",
  },
  TextInputWrapper: {
    borderBottomColor: "#F5ECDE",
    borderBottomWidth: 1,
    marginVertical: 1,
    marginHorizontal: 1,
  },
  TextInput: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#F5ECDE",
    width: 150,
  },
});

mapToProps = (state) => {
  return {
    ewallet: state.ewallet,
  };
};
export default connect(mapToProps, actions)(Send);
