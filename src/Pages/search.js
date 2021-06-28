import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SearchContainer from "../../components/searchContainer";
import SearchBar from "../../components/SearchBar";
import TopBar from "../../components/TopBar";

const Search = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopBar title={"Search"} />
      <SearchContainer />
    </View>
  );
};

export default Search;
