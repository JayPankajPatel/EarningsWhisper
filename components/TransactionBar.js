import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

function TransactionBar({ transactionTitle, dollarAmount }) {
  return (
    <View style={styles.background}>
      <View style={styles.border}>
        <Icon name={"briefcase"} size={26} />
      </View>
      <Text
        style={{ color: "#F5ECDE", fontFamily: "Roboto", marginHorizontal: 30 }}
      >
        {transactionTitle}
      </Text>
      {dollarAmount > 0 ? (
        <Text style={{ color: "#01FF2A", marginHorizontal: 20 }}>
          {" "}
          {"$" + dollarAmount}{" "}
        </Text>
      ) : (
        <Text style={{ color: "#FF0000", marginHorizontal: 20 }}>
          {" "}
          {"$" + dollarAmount}{" "}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#3C3831",
    borderRadius: 5,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 60,
    marginBottom: 10,
  },
  border: {
    backgroundColor: "#F5ECDE",
    padding: 8,
    borderRadius: 50,
  },
});

export default TransactionBar;
