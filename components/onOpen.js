import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Logo from "../src/resources/logo";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import * as actions from "../src/actions";

const onOpen = (props) => {
  return (
    <View style={styles.frame}>
      <LinearGradient colors={["#F5ECDE", "#FFDAA3"]} style={{ flex: 1 }}>
        <SafeAreaView>
          {/* Logo */}

          <View style={styles.logoOpen}>
            <Logo />
          </View>

          {/* Sign Up */}

          <TouchableOpacity
            style={styles.signUpWrapper}
            onPress={() => props.navigation.navigate("SignUp")}
          >
            <View>
              <Text style={styles.signUpText}>SIGN UP</Text>
            </View>
          </TouchableOpacity>

          {/* Login */}

          <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <View style={styles.loginWrapper}>
              <Text style={styles.loginText}>LOGIN</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: "#F5ECDE",
  },

  logoOpen: {
    position: "absolute",
    width: 60,
    height: 60,
    left: 173,
    top: 219,
  },

  signUpWrapper: {
    marginTop: 500,
    marginHorizontal: 24,
    backgroundColor: "#F5ECDE",
    borderWidth: 1,
    borderColor: "#CD9F59",
    borderStyle: "solid",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  signUpText: {
    fontSize: 15,
    fontFamily: "Roboto",
    letterSpacing: 10,
  },

  loginWrapper: {
    marginTop: 60,
    marginHorizontal: 24,
    backgroundColor: "#323232",
    borderWidth: 1,
    borderColor: "#CD9F59",
    borderStyle: "solid",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 15,
    fontFamily: "Roboto",
    letterSpacing: 10,
    lineHeight: 18,
    color: "#FDE0B3",
  },
});
export default connect(null, actions)(onOpen);
