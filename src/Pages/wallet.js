import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../components/context";
import TopBar from "../../components/TopBar";
import Portfolio from "../../components/Portfolio";
import Send from "../../components/Send";
import Deposit from "../../components/Deposit";
function wallet({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{ top: 25, backgroundColor: "#F5ECDE", flex: 1 }}>
      <TopBar title={"Wallet"} />
      {/*Main Body*/}
      <View style={styles.portfolio}>
        <Portfolio />
      </View>
      {/* Money Stuff */}
      <View style={styles.moneyStuff}>
        <Send />
        <Deposit />
      </View>
      {/*Transactions */}
      <View style={styles.transactions}></View>
      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
      {/*Bottom NavBar */}
      <View style={styles.botNavBar}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  portfolio: {
    flex: 3,
    backgroundColor: "red",
  },
  moneyStuff: {
    flex: 1,
    backgroundColor: "green",
  },
  transactions: {
    flex: 2,
    backgroundColor: "orange",
  },
  botNavBar: {
    flex: 2,
    backgroundColor: "blue",
  },
});

export default wallet;
