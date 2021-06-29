import React, { useState, useEffect } from "react";
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
import { Transition, Transitioning } from "react-native-reanimated";

const MonthCalendar = (props) => {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  //console.log(Object.keys(props.monthlyStocks).length > 0);
  useEffect(() => {
    //props.loadStock("monthly");
    if (Object.keys(props.monthlyStocks).length > 0) {
      setisLoaded(true);
    }
  }, []);
  return (
    <ScrollView nestedScrollEnabled={true}>
      {isLoaded === true &&
        props.monthlyStocks.time.map((data, index) => {
          return (
            <View key={index} style={styles.container}>
              <View style={styles.titleTab}>
                <Text style={styles.title}>May 24th-28th</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentIndex(index === currentIndex ? null : index);
                  }}
                  activeOpacity={0.9}
                >
                  <Icon
                    name={"chevron-down"}
                    size={40}
                    style={{ color: "#F5ECDE", marginRight: 5 }}
                  />
                </TouchableOpacity>
              </View>
              {index === currentIndex && <EarningContainer data={data} />}
            </View>
          );
        })}
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
    width: 110,
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
    maxHeight: 200,
  },
});

const mapStateToProps = (state) => {
  return {
    monthlyStocks: state.stocks,
  };
};

export default connect(mapStateToProps, actions)(MonthCalendar);
