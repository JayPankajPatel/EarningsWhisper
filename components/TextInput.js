import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
function textInput({ textLabel, value, setChange, placeholder }) {
  onselect = () => {};
  return (
    <View style={styles.background}>
      <View style={styles.TextWrapper}>
        <Text style={styles.Text}>{textLabel}</Text>
      </View>

      <View style={styles.TextInputWrapper}>
        <TextInput
          value={value}
          style={styles.TextInput}
          placeholder={placeholder}
          placeholderTextColor="#F5ECDE"
          onChangeText={(val) => setChange(val)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  TextWrapper: {
    marginTop: 60,
    marginHorizontal: 88,
  },
  Text: {
    fontSize: 10,
    fontFamily: "Roboto",
    lineHeight: 18,
    color: "#FDE0B3",
  },
  TextInputWrapper: {
    marginTop: 4,
    marginHorizontal: 88,
    backgroundColor: "transparent",
    paddingVertical: 5,
    borderBottomColor: "#FDE0B3",
    borderBottomWidth: 1,
  },
  TextInput: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "500",
    color: "white",
  },
});

export default textInput;
