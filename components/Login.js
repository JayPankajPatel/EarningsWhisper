import * as React from "react";
import * as Animatable from "react-native-animatable";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Logo from "../src/resources/logo";
import AppLoading from "expo-app-loading";
import { useFonts } from "@expo-google-fonts/roboto";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";

import BoxInput from "../components/TextInput";
import { AuthContext } from "../components/context";

const Login = (props) => {
  const { signIn } = React.useContext(AuthContext);

  const handleLogin = (username, password) => {
    if (props.isValidUser && props.isValidPassword) {
      //console.log(props.isValidUser + " " + props.isValidPassword);
      signIn(username, password);
    }
  };

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.frame}>
      <SafeAreaView>
        {/*Logo*/}

        <View style={styles.logoLogin}>
          <Logo />
        </View>

        {/* Username */}
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Username"}
          inputBox={styles.TextInputWrapper}
          inputStyleText={styles.TextInput}
          setChange={props.handleUserChange}
        />
        {props.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        {/* Password  */}
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Password"}
          inputBox={styles.TextInputWrapper}
          inputStyleText={styles.TextInput}
          setChange={props.handlePasswordChange}
        />

        {props.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        {/* Forgot Password? */}
        <View>
          <TouchableOpacity style={styles.forgotpasswordWrapper}>
            <Text style={styles.forgotpasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/*  Login Container */}

        <View>
          <TouchableOpacity
            style={styles.loginWrapper}
            onPress={() => {
              //console.log(props.username + " " + props.password);
              handleLogin(props.username, props.password);
            }}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Don't have an Account? */}
        <View style={styles.noaccountWrapper}>
          <View style={styles.noaccountLines} />
          <View>
            <Text style={styles.noaccountText}> Don't Have an Account?</Text>
          </View>
          <View style={styles.noaccountLines} />
        </View>

        {/* Sign Up */}
        <View>
          <TouchableOpacity
            style={styles.signUpWrapper}
            onPress={() => props.navigation.navigate("signUp")}
          >
            <Text style={styles.signUpText}>Sign up </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    backgroundColor: "#323232", //'#323232'
    flex: 1,
  },
  logoLogin: {
    marginTop: 150,
    marginHorizontal: 175,
  },
  TextWrapper: {
    marginTop: 60,
    marginHorizontal: 88,
  },
  Text: {
    fontSize: 10,
    fontFamily: "Roboto_500Medium",
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
    fontFamily: "Roboto_500Medium",
    color: "white",
  },

  forgotpasswordWrapper: {
    marginTop: 10,
    marginLeft: 240,
  },
  forgotpasswordText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 12,
    color: "#A18652",
  },
  loginWrapper: {
    marginTop: 70,
    marginHorizontal: 88,
    backgroundColor: "#F5ECDE",
    borderWidth: 1,
    borderColor: "#CD9F59",
    borderStyle: "solid",
    borderRadius: 50,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
    letterSpacing: 8,
    color: "#A18652",
  },
  noaccountWrapper: {
    marginTop: 60,
    marginHorizontal: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  noaccountLines: {
    flex: 1,
    height: 1,
    backgroundColor: "#FDE0B3",
  },
  noaccountText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 12,
    color: "#A18652",
    paddingHorizontal: 10,
  },
  signUpWrapper: {
    marginTop: 40,
    marginHorizontal: 88,
    borderWidth: 1,
    borderColor: "#F5ECDE",
    borderStyle: "solid",
    borderRadius: 50,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    paddingLeft: 20,
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
    letterSpacing: 8,
    color: "#FDE0B3",
    justifyContent: "center",
    alignItems: "center",
  },
  errorMsg: {
    marginHorizontal: 88,
    color: "#d90000",
    fontSize: 13,
    fontWeight: "400",
  },
});

const mapStateToProps = (state) => {
  return {
    username: state.username,
    password: state.password,
    isValidUser: state.isValidUser,
    isValidPassword: state.isValidPassword,
  };
};

export default connect(mapStateToProps, actions)(Login);
