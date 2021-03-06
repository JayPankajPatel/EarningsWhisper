import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import * as actions from "../src/actions";
import { connect } from "react-redux";

const Portfolio = (props) => {
  const [bal, setBal] = useState([]);
  const [overallTime, setTime] = useState([]);

  //setInterval(checkProf, 60000);

  async function checkProf() {
    props.getWalBal(await AsyncStorage.getItem("ewallet"));
    if (props.balance.balance == 0) {
      setBal([...bal, 0]);
    } else {
      console.log(props.balance.balance);
      setBal([...bal, props.balance.balance]);
    }
    setTime([
      ...overallTime,
      `${new Date().getHours()}:${new Date().getMinutes()} `,
    ]);
    //console.log(chartData.data + " " + chartData.time);
  }

  const [chartData, setChartData] = React.useState({
    data: [400],
    time: ["6:54"],
  });
  const [index, setIndex] = React.useState(1);

  const handlePress = (num) => {
    setIndex(num);
  };

  const renderDetail = (num) => {
    var dataLabel;
    var dataTime;
    switch (num) {
      case 1:
        checkProf();
        dataTime = overallTime;
        dataLabel = bal;
        setChartData({ data: dataLabel, time: dataTime });
        break;
      default:
        dataTime = overallTime;
        dataLabel = bal;
        setChartData({ data: dataLabel, time: dataTime });
    }
  };

  //console.log(chartData);
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => {
            renderDetail(1);
            handlePress(1);
          }}
        >
          <Text style={[styles.textTouch, index === 1 && styles.active]}>
            1D
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            renderDetail(2);
            handlePress(2);
          }}
        >
          <Text style={[styles.textTouch, index === 2 && styles.active]}>
            1W
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            renderDetail(3);
            handlePress(3);
          }}
        >
          <Text style={[styles.textTouch, index === 3 && styles.active]}>
            1M
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            renderDetail(4);
            handlePress(4);
          }}
        >
          <Text style={[styles.textTouch, index === 4 && styles.active]}>
            3M
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            renderDetail(5);
            handlePress(5);
          }}
        >
          <Text style={[styles.textTouch, index === 5 && styles.active]}>
            1Y
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chart}>
        <LineChart
          data={{
            label: chartData.time,
            datasets: [
              {
                data: chartData.data,
              },
            ],
          }}
          width={370}
          height={180}
          yAxisInterval={1}
          verticalLabelRotation={270}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "0",
            },
            propsForBackgroundLines: {
              color: "#F5ECDE",
            },
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
      </View>
      <View style={styles.circle}>
        <Text style={styles.text}>Summary</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "#323232",
    borderRadius: 11,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  circle: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    borderWidth: 4,
    backgroundColor: "#323232",
    borderColor: "#FAA725",
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 15,
    opacity: 0.5,
    top: 1,
    left: 40,
  },
  text: {
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "bold",
  },
  navContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  textTouch: {
    color: "#FDB33E",
    fontFamily: "Roboto",
    fontWeight: "900",
    fontSize: 16,
  },
  active: {
    backgroundColor: "#FDB33E",
    borderRadius: 3,
    color: "#000000",
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
});

const mapStateToProps = (state) => {
  return {
    detail: state.stocks,
    grade: state.grade,
    balance: state.ewalletBal,
  };
};

export default connect(mapStateToProps, actions)(Portfolio);
