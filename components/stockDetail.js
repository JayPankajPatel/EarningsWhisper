import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../src/actions";

const stockDetail = (props) => {
  console.log(props.stockDetail);
  return (
    <View style={styles.detailContainer}>
      <Text>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    backgroundColor: "#39352F",
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    stockDetail: state.stockDetail,
  };
};

export default connect(mapStateToProps, actions)(stockDetail);
