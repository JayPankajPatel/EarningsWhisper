import React from "react";
import { View, Text, TextInput } from "react-native";
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
    <View>
      <View style={labelBox}>
        <Text style={styleFontText}>{textLabel}</Text>
      </View>

      <View style={inputBox}>
        <TextInput
          value={value}
          style={inputStyleText}
          placeholder="e.g JohnDoe123"
          onChangeText={(val) => setChange(val)}
        />
      </View>
    </View>
  );
}

export default textInput;
