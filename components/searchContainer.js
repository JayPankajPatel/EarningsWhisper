import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import SearchBar from "./SearchBar";
import StockDetail from "./stockDetail";

const searchContainer = (props) => {
  console.log(Object.keys(props.detail).length);
  return (
    <View>
      {Object.keys(props.detail).length > 0 ? (
        <StockDetail data={props.detail} />
      ) : (
        <View>
          <SearchBar />
          <ScrollView>
            {props.searchedStocks.length > 0 &&
              props.searchedStocks.map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      props.stockDetail(toString(data["1. symbol"]))
                    }
                  >
                    <View style={styles.searchContainer}>
                      <Text style={styles.searchText}>{data["1. symbol"]}</Text>
                      <Text style={styles.searchText}>{data["2. name"]}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#39352F",
    borderRadius: 7,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  searchText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 15,
    marginVertical: 2,
  },
});

const mapStateToProps = (state) => {
  return {
    searchedStocks: state.searchedStocks,
    detail: state.stocks,
    searchTerm: state.searchTerm,
  };
};

export default connect(mapStateToProps, actions)(searchContainer);
