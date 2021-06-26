import React, { useEffect } from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import EarningsBar from "./EarningsBar";

const DayCalendar = (props) => {
  useEffect(() => {
    setTimeout(async () => {
      await props.loadDailyStock();
      //console.log(props.dailyStocks);
    }, 1000);
  }, []);
  return (
    <ScrollView nestedScrollEnabled={true}>
      {props.dailyStocks.map(
        ({ companyshortname, epsactual, epsestimate, ticker }) => {
          return (
            <EarningsBar
              key={ticker}
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

const mapStateToProps = (state) => {
  return {
    dailyStocks: state.stocks,
  };
};

export default connect(mapStateToProps, actions)(DayCalendar);
