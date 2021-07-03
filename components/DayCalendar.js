import React, { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import EarningsBar from "./EarningsBar";

const DayCalendar = (props) => {
  const [isLoaded, setisLoaded] = useState(false);
  useEffect(() => {
    props.loadStock("daily");
    if (Object.keys(props.dailyStocks).length > 0) {
      setisLoaded(true);
      console.log(props.dailyStocks);
    }
  }, []);
  return (
    <ScrollView nestedScrollEnabled={true}>
      {isLoaded === true &&
        props.dailyStocks.time.map(
          ({ companyshortname, epsactual, epsestimate, ticker }, index) => {
            return (
              <EarningsBar
                key={index}
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
    dailyStocks: state.daily,
  };
};

export default connect(mapStateToProps, actions)(DayCalendar);
