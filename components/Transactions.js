import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import TransactionBar from "./TransactionBar";
function Transactions() {
  return (
    <View>
      <Text style={styles.text}>Recent Transactions</Text>
      <View style={styles.bar}></View>
      <ScrollView style={styles.transactions}>
        <TransactionBar transactionTitle={"Gifts for Mom"} dollarAmount={-20} />
        <TransactionBar
          transactionTitle={"Picked up off street"}
          dollarAmount={+300}
        />
        <TransactionBar transactionTitle={"Gifts for Mom"} dollarAmount={-20} />
        <TransactionBar
          transactionTitle={"Picked up off street"}
          dollarAmount={+300}
        />
        <TransactionBar transactionTitle={"Gifts for Mom"} dollarAmount={-20} />
        <TransactionBar
          transactionTitle={"Picked up off street"}
          dollarAmount={+300}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "justify",
    marginLeft: 30,
    color: "#B77E0F",
    fontWeight: "400",
    letterSpacing: 1,
    marginTop: 20,
  },
  bar: {
    backgroundColor: "#B77E0F",
    height: 1,
    width: 153,
    marginLeft: 30,
    marginVertical: 10,
  },
  transactions: {
    display: "flex",
    flexDirection: "column",
  },
});

export default Transactions;

/* Recent Transactions */

/* Recent Transactions */
