import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function EarningsBar({
  companyName,
  companyAbbrev,
  companyEPS,
  companyRev,
  companyActualEPS,
  companyActualRev,
  companyGrowthEPS,
  companyGrowthRev,
  arrow,
}) {
  return (
    <LinearGradient colors = {["#222120","#10100F"]}>
    <View style={styles.containerWrapper}>
      <View style={styles.infoWrapper}>
        <Text style={[styles.titleText, {textDecorationLine: "underline"}]}>Company</Text>
        <Text style={styles.companynameText}>{companyName}</Text>
        <Text style={styles.titleText}>{companyAbbrev}</Text>
      </View>

      <View style={styles.infoWrapper}>
        <Text style={[styles.titleText, {textDecorationLine: "underline"}]}>Estimate</Text>
        <Text style={styles.titleText}>EPS: {companyEPS}</Text>
        <Text style={styles.titleText}>Rev: {companyRev}</Text>
      </View>

      <View style={styles.infoWrapper}>
        <Text style={[styles.titleText, {textDecorationLine: "underline"}]}>Actual</Text>
        <Text style={styles.titleText}>{companyActualEPS}</Text>
        <Text style={styles.titleText}>{companyActualRev}</Text>
      </View>

      <View style={styles.infoWrapper}>
        <Text style={[styles.titleText, {textDecorationLine: "underline"}]}>Growth</Text>
        <Text style={styles.titleText}>{companyGrowthEPS}</Text>
        <Text style={styles.titleText}>{companyGrowthRev}</Text>
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  infoWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    
  },
  titleText: {
    color: "#EDE9E2",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 6, 
    
  },
  companynameText: {
    color: "#EDE9E2",
    fontWeight: "300",
    fontSize: 12,

  }, 
  containerWrapper: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "#736345",
    padding: 20,
 
    justifyContent: "space-between",
  },
});

export default EarningsBar;


