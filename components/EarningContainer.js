import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EarningsBar from "./EarningsBar";
function EarningContainer({ dates, data }) {
  return (
    <View style={styles.container}>
      <EarningsBar
        companyName={"NVIDIA Corp."}
        companyAbbrev={"NVDA"}
        companyEPS={"$3.28"}
        companyRev={"$3.28"}
        companyActualEPS={"$3.66"}
        companyActualRES={"$5.66"}
        companyGrowthEPS={"103.3%"}
        companyGrowthRev={"83.8%"}
        arrow={"good"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#736345",
    height: 200,
    marginVertical: 20,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});
export default EarningContainer;
