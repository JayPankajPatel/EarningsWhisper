import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import debounce from "lodash.debounce";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import SearchIcon from "react-native-vector-icons/Feather";
import search from "../src/Pages/search";

const SearchBar = (props) => {
  console.log(props.searchedStocks);
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity onPress={() => props.searchStock(props.searchTerm)}>
        <SearchIcon
          name="search"
          color={"#F5ECDE"}
          size={26}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
      <TextInput
        value={props.searchTerm}
        placeholder="Search All Stocks"
        placeholderTextColor="#FFFFFF"
        style={styles.input}
        onChangeText={(value) => {
          props.formUpdate({ prop: "searchTerm", value });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
    color: "#FFFFFF",
    flex: 1,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#323232",
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    searchedStocks: state.searchedStocks,
  };
};

export default connect(mapStateToProps, actions)(SearchBar);
