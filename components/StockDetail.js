import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import TopBar from "./TopBar";

const StockDetail = (props) => {
  const [grade, setGrade] = useState("A");
  const [gradeColor, setGradeColor] = useState("18B00B");

  useEffect(() => {
    switch (grade) {
      case "A":
        setGradeColor("18B00B");
        break;
      case "B":
        setGradeColor("7DB508");
        break;
      case "C":
        setGradeColor("B9BC14");
        break;
    }
  }, []);
  return (
    <View>
      <TopBar title={props.detail["Symbol"]} />
      <ScrollView style={styles.container}>
        <View
          style={[styles.gradeContainer, { backgroundColor: `#${gradeColor}` }]}
        >
          <Text style={styles.gradeText}> {grade} </Text>
        </View>
        <View
          style={{
            width: "90%",
            height: 2,
            backgroundColor: "#CDE7CA",
            marginHorizontal: 20,
            marginVertical: 15,
            borderRadius: 2,
          }}
        ></View>
        <View style={styles.textContainer}>
          <Text style={styles.textBold}>{props.detail["Name"]}</Text>
          <Text style={styles.text}>
            Current Price: {props.detail["BookValue"]}
          </Text>
          <Text style={styles.text}>
            Analyst Target Price: {props.detail["AnalystTargetPrice"]}
          </Text>
          <Text style={styles.text}>
            200 Day Moving Avg: {props.detail["200DayMovingAverage"]}
          </Text>
          <Text style={styles.text}>
            52 Week Range: {props.detail["52WeekLow"]} -{" "}
            {props.detail["52WeekHigh"]}
          </Text>
          <Text style={styles.text}>
            Total Rev: {props.detail["totalRevenue"]}
          </Text>
          <Text style={styles.text}>
            Net Income: {props.detail["netIncome"]}
          </Text>
          <Text style={styles.text}>
            Market Cap: {props.detail["MarketCapitalization"]}
          </Text>
          <Text style={styles.textBold}>
            Description: {props.detail["Description"]}
          </Text>
          <Text style={styles.textBold}>
            Latest Quarter: {props.detail["LatestQuarter"]}
          </Text>
          <Text style={styles.textBold}>
            Dividend Date: {props.detail["DividendDate"]}
          </Text>
          <Text style={styles.text}>
            Annual Dividend Rate: {props.detail["ForwardAnnualDividendRate"]}
          </Text>
          <Text style={styles.text}>
            Gross Profit: ${props.detail["grossProfit"]}
          </Text>
          <Text style={styles.text}>
            OutStanding Shares: {props.detail["SharesOutstanding"]}
          </Text>
          <Text style={styles.text}>
            Quarterly Earnings Shares:{" "}
            {props.detail["QuarterlyEarningsGrowthYOY"]}
          </Text>
          <Text style={styles.textBold}>SECTOR: {props.detail["Sector"]}</Text>
          <Text style={styles.textBold}>
            Shares Short: ${props.detail["SharesShort"]}
          </Text>
          <Text style={styles.textBold}>
            Shares Float: ${props.detail["SharesFloat"]}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.unLoadStock()}
        >
          <Text style={{ color: "#FFFFFF", textAlign: "center", fontSize: 18 }}>
            Back
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%",
    backgroundColor: "#39352F",
    borderRadius: 10,
    marginVertical: 30,
    height: "80%",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    marginHorizontal: 20,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Roboto",
  },
  textBold: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginVertical: 10,
  },
  gradeContainer: {
    marginTop: 20,
    width: "90%",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: "#37FF25",
    borderRadius: 10,
  },
  gradeText: {
    justifyContent: "center",
    marginLeft: 20,
    fontWeight: "300",
    letterSpacing: 5,
    fontSize: 48,
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#BF2510",
    padding: 10,
    borderBottomEndRadius: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    detail: state.stocks,
  };
};

export default connect(mapStateToProps, actions)(StockDetail);
