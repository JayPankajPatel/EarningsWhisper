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
    <View style={styles.containerWrapper}>
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>Company</Text>
        <Text style={styles.titleText}>{companyName}</Text>

        <Text style={styles.titleText}>{companyAbbrev}</Text>
      </View>

      <View style={styles.containerWrapper}>
        <Text style={styles.titleText}>Estimate</Text>

        <Text style={styles.titleText}>{companyEPS}</Text>

        <Text style={styles.titleText}>{companyRev}</Text>
      </View>

      <View style={styles.containerWrapper}>
        <Text style={styles.titleText}>Actual</Text>

        <Text style={styles.titleText}>{companyActualEPS}</Text>

        <Text style={styles.titleText}>{companyActualRev}</Text>
      </View>

      <View style={styles.containerWrapper}>
        <Text style={styles.titleText}>Growth</Text>

        <Text style={styles.titleText}>{companyGrowthEPS}</Text>

        <Text style={styles.titleText}>{companyGrowthRev}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    marginLeft: 10,
  },
  TitleText: {
    color: "#EDE9E2",
    fontWeight: "bold",
    fontSize: 12,
  },
  containerWrapper: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "#736345",
    padding: 60,
    borderRadius: 20,
  },
});

export default EarningsBar;
