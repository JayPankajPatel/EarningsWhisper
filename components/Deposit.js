import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
function Deposit() {
  return (
    <View style={styles.button}>
      <TouchableOpacity
        onPress={() => {
          console.log("Nut");
        }}
      >
        <View
          style={{
            backgroundColor: "#F5ECDE",
            padding: 8,
            borderRadius: 50,
          }}
        >
          <Icon name="dollar-sign" color={"#FDB33E"} size={30} />
        </View>
        <Text style={{ color: "#F5ECDE", textAlign: "center" }}>Deposit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#323232",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
    display: "flex",
    flexDirection: "column",
  },
});
export default Deposit;
