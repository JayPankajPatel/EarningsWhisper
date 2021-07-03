import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
function textInput({
  labelBox,
  styleFontText,
  textLabel,
  inputBox,
  value,
  inputStyleText,
  setChange,
}) {
  onselect = () => {};
  return (
    <View style={styles.background}>
      <View style={labelBox}>
        <Text style={styleFontText}>{textLabel}</Text>
      </View>

      <View style={inputBox}>
        <TextInput
          value={value}
          style={inputStyleText}
          placeholder="e.g 1000"
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default textInput;
