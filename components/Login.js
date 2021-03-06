import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Logo from "../src/resources/logo";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import { AuthContext } from "../components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
  const { signIn } = React.useContext(AuthContext);
  useEffect(() => {
    props.loadUsers();
    console.log(props.users.user);
  }, []);
  const handleLogin = async (userName, password) => {
    var user = props.users.user.filter(function (e) {
      return e.username === userName;
    });
    props.loaduser(user[0]);
    console.log(user[0]);
    await AsyncStorage.setItem("ewallet", user[0].ewallet_id);
    if (
      user != null &&
      user[0].username === userName &&
      user[0].password === password
    ) {
      if (props.isValidUser && props.isValidPassword) {
        signIn(userName, password);
      }
    }
  };
  // };
  return (
    <View style={styles.frame}>
      <SafeAreaView>
        {/*Logo*/}

        <View style={styles.logoLogin}>
          <Logo />
        </View>

        {/* Username */}
        <View style={styles.TextWrapper}>
          <Text style={styles.Text}>Username: </Text>
        </View>

        <View style={styles.TextInputWrapper}>
          <TextInput
            value={props.username}
            style={styles.TextInput}
            placeholder={"Ex. greg"}
            placeholderTextColor="#3C3831"
            onChangeText={(value) =>
              props.formUpdate({ prop: "username", value })
            }
          />
        </View>
        {props.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        {/* Password  */}
        <View style={styles.TextWrapper}>
          <Text style={styles.Text}>Password: </Text>
        </View>

        <View style={styles.TextInputWrapper}>
          <TextInput
            value={props.password}
            style={styles.TextInput}
            placeholder={"Ex. momma123"}
            placeholderTextColor="#3C3831"
            onChangeText={(value) =>
              props.formUpdate({ prop: "password", value })
            }
          />
        </View>

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
  forgotpasswordWrapper: {
    marginTop: 10,
    marginLeft: 240,
  },
  forgotpasswordText: {
    fontFamily: "Roboto",
    fontWeight: "500",
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
    fontFamily: "Roboto",
    fontWeight: "500",
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
    fontFamily: "Roboto",
    fontWeight: "500",
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
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 15,
    letterSpacing: 8,
    color: "#FDE0B3",
    justifyContent: "center",
    alignItems: "center",
  },
  TextWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  Text: {
    fontSize: 15,
    fontFamily: "Roboto",
    lineHeight: 18,
    color: "#F5ECDE",
  },
  TextInputWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 100,
    borderBottomColor: "#F5ECDE",
    borderBottomWidth: 1,
    marginVertical: 2,
  },
  TextInput: {
    fontSize: 15,
    height: 20,
    fontFamily: "Roboto",
    width: 150,
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
    users: state.users,
  };
};

export default connect(mapStateToProps, actions)(Login);
