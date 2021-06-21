import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
function Send() {
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
          <Icon name="send" color={"#FDB33E"} size={30} />
        </View>
        <Text style={{ color: "#F5ECDE", textAlign: "center" }}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#323232",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 30,
    display: "flex",
    flexDirection: "column",
  },
});
export default Send;
