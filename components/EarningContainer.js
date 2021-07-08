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
          startdatetimetype,
        }) => {
          if (companyshortname !== undefined) {
            return (
              <EarningsBar
                key={ticker}
                companyName={companyshortname}
                ticker={ticker}
                epsestimate={epsestimate}
                epsactual={epsactual}
                startTime={startdatetimetype}
                arrow={"good"}
              />
            );
          }
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
