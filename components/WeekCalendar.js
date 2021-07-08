import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import EarningContainer from "./EarningContainer";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import Icon from "react-native-vector-icons/Feather";
import EarningsBar from "./EarningsBar";

const WeekCalendar = (props) => {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  useEffect(() => {
    props.loadWeeklyStock();
    setTimeout(() => {
      if (props.weeklyStocks != null) {
        setisLoaded(true);
        //console.log(props.weeklyStocks);
      }
    }, 300);
  }, []);
  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={styles.container}>
        <View style={styles.titleTab}>
          <Text style={styles.title}>
            {props.weeklyStocks[props.weeklyStocks.length - 1]}
          </Text>
          <Icon
            name={"chevron-down"}
            size={40}
            style={{ color: "#F5ECDE", marginRight: 5 }}
          />
        </View>
        {isLoaded === true &&
          props.weeklyStocks.map((data, index) => {
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleTab: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    marginHorizontal: 15,
    marginTop: 10,
    fontSize: 12,
    width: 320,
    paddingBottom: 4,
    letterSpacing: 1,
    color: "#E9E2D5",
    borderBottomColor: "#EBE2D5",
    borderBottomWidth: 2,
    borderBottomEndRadius: 2,
    textDecorationStyle: "solid",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#736345",
    marginVertical: 20,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    weeklyStocks: state.weekly,
  };
};

export default connect(mapStateToProps, actions)(WeekCalendar);
