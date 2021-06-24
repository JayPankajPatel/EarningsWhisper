import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import EarningsBar from "./EarningsBar";

const EarningContainer = (props) => {
  //console.log(props.data);
  return (
    <ScrollView nestedScrollEnabled={true}>
      {props.data.map(
        ({
          companyshortname,
          ticker,
          epsestimate,
          epsactual,
          companygrowtheps,
          companygrowthrev,
          arrow,
        }) => {
          return (
            <EarningsBar
              companyName={companyshortname}
              companyAbbrev={ticker}
              companyEPS={epsestimate}
              companyRev={"$3.28"}
              companyActualEPS={epsactual}
              companyActualRES={"$5.66"}
              companyGrowthEPS={"103.3%"}
              companyGrowthRev={"83.8%"}
              arrow={"good"}
            />
          );
        }
      )}
    </ScrollView>
  );
};

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
