import React, { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import EarningsBar from "./EarningsBar";

const DayCalendar = (props) => {
  const [isLoaded, setisLoaded] = useState(false);
  useEffect(() => {
    props.loadDailyStock();
    setTimeout(() => {
      if (props.dailyStocks != null) {
        setisLoaded(true);
        //console.log(props.dailyStocks);
      }
    }, 300);
  }, []);
  return (
    <ScrollView nestedScrollEnabled={true}>
      {isLoaded === true &&
        props.dailyStocks.map((data, index) => {
          if (data.companyshortname !== undefined) {
            return (
              <EarningsBar
                key={index}
                companyName={data.companyshortname}
                epsactual={data.epsactual}
                epsestimate={data.epsestimate}
                startTime={data.startdatetimetype}
                ticker={data.ticker}
              />
            );
          }
        })}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    dailyStocks: state.daily,
  };
};

export default connect(mapStateToProps, actions)(DayCalendar);
