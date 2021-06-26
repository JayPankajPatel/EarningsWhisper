import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import SearchBar from "./SearchBar";
import TopBar from "./TopBar";

const searchContainer = (props) => {
  return (
    <View>
      <TopBar title={"Search"} />
      <View>
        <SearchBar />
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    stocks: state.stockDetail,
    searchTerm: state.searchTerm,
  };
};

export default connect(mapStateToProps, actions)(searchContainer);
