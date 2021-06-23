import React, { useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import EarningContainer from "./EarningContainer";
import * as actions from "../src/actions";

const DayCalendar = (props) => {
  useEffect(() => {
    //props.loadDailyStock();
  }, []);
  const grabUserInfo = () => {
    //console.log(props.stocks);
  };
  return (
    <View>
      <EarningContainer />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    dailyStocks: state.stocks,
  };
};

export default connect(mapStateToProps, actions)(DayCalendar);
