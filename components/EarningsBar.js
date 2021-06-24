import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";

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
    <LinearGradient
      style={styles.container}
      colors={["#222120", "rgba(16,16,15,0.20)"]}
    >
      <View style={styles.containerWrapper}>
        <View style={styles.infoWrapper}>
          <Text style={[styles.titleText, { textDecorationLine: "underline" }]}>
            Company
          </Text>
          <Text style={styles.companynameText}>{companyName}</Text>
          <Text style={styles.titleText}>{companyAbbrev}</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={[styles.titleText, { textDecorationLine: "underline" }]}>
            Estimate
          </Text>
          <Text style={styles.titleText}>EPS: {companyEPS}</Text>
          <Text style={styles.titleText}>Rev: {companyRev}</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={[styles.titleText, { textDecorationLine: "underline" }]}>
            Actual
          </Text>
          <Text style={styles.titleText}>{companyActualEPS}</Text>
          <Text style={styles.titleText}>{companyActualRev}</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={[styles.titleText, { textDecorationLine: "underline" }]}>
            Growth
          </Text>
          <Text style={styles.titleText}>{companyGrowthEPS}</Text>
          <Text style={styles.titleText}>{companyGrowthRev}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={[styles.titleText, { textDecorationLine: "none" }]}>
            BMO
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
}

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
