import React, { useEffect } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import stock from "../models/stocks.json";
import EarningContainer from "./EarningContainer";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import Icon from "react-native-vector-icons/Feather";
import { Transition, Transitioning } from "react-native-reanimated";

const WeekCalendar = (props) => {
  const [currentIndex, setCurrentIndex] = React.useState(null);

  useEffect(() => {
    setTimeout(async () => {
      //await props.loadStock("weekly");
    }, 100);
  }, []);
  return (
    <ScrollView nestedScrollEnabled={true}>
      {/* {props.weeklyStocks.map((data, index) => {
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
      })} */}
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
    weeklyStocks: state.stocks,
  };
};

export default connect(mapStateToProps, actions)(WeekCalendar);
