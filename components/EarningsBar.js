import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";

const EarningsBar = ({
  companyName,
  epsactual,
  epsestimate,
  startTime,
  ticker,
}) => {
  //console.log(companyName);
  return (
    <LinearGradient
      style={styles.container}
      colors={["#222120", "rgba(16,16,15,0.20)"]}
    >
      <View style={styles.containerWrapper}>
        <View style={styles.infoWrapper}>
          <Text style={[styles.titleText, { textDecorationLine: "underline" }]}>
            Company
          </Text>
          <Text style={styles.companynameText}>{companyName.slice(0, 10)}</Text>
          <Text style={styles.titleText}>{ticker}</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={[styles.titleText, { textDecorationLine: "underline" }]}>
            Estimate
          </Text>
          <Text style={styles.titleText}>EPS: {epsestimate}</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={[styles.titleText, { textDecorationLine: "underline" }]}>
            Actual
          </Text>
          <Text style={styles.titleText}>{epsactual}</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={[styles.titleText, { textDecorationLine: "none" }]}>
            {startTime}
          </Text>
          <Icon
            name={"chevron-down"}
            size={40}
            style={{ color: "#FF0000", marginRight: 5 }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginHorizontal: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  infoWrapper: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  titleText: {
    color: "#EDE9E2",
    fontWeight: "bold",
    fontSize: 14,
    padding: 2,
  },
  companynameText: {
    color: "#EDE9E2",
    fontWeight: "300",
    fontSize: 12,
  },
  containerWrapper: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
});

export default EarningsBar;
