import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Directions } from "react-native-gesture-handler";
import Logo from "../src/resources/logo";
import AppLoading from "expo-app-loading";
import { useFonts } from "@expo-google-fonts/roboto";
import { LinearGradient } from "expo-linear-gradient";
import { createStackNavigator } from "@react-navigation/stack";
import BoxInput from "../components/TextInput";
import textInput from "../components/TextInput";
import { AuthContext } from "../components/context";
import { signIn } from "../components/Login";
import User from "../models/User";
import { validateUser } from "../utilities/validation";
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
import { connect } from "react-redux";

const signUp = (props) => {
  const { signUp } = React.useContext(AuthContext);
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

  onAddPress = () => {
    const { username, password, email, birthdate, question, answer } = props;

    props.createNewSignUp({
      username,
      password,
      email,
      birthdate,
      question,
      answer,
    });

    props.navigation.navigate("Login");
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ScrollView style={[styles.frame]}>
      <LinearGradient colors={["#F5ECDE", "#FFDAA3"]} style={{ flex: 1 }}>
        <View style={styles.headerWrapper}>
          <Logo />
          <Text style={styles.createAccountText}>Create Account,</Text>
          <Text style={styles.getStartedText}>Sign up to Get Started!</Text>
        </View>

        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"USERNAME"}
          inputBox={styles.TextInputWrapper}
          value={props.username}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "username", value })}
        />

        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"EMAIL"}
          inputBox={styles.TextInputWrapper}
          value={props.email}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "email", value })}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"PASSWORD"}
          inputBox={styles.TextInputWrapper}
          value={props.password}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "password", value })}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"CONFIRM PASSWORD"}
          value={props.confirmPassword}
          inputBox={styles.TextInputWrapper}
          inputStyleText={styles.TextInput}
          setChange={(value) =>
            props.formUpdate({ prop: "confirmPassword", value })
          }
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"SECURITY QUESTION"}
          inputBox={styles.TextInputWrapper}
          value={props.question}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "question", value })}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"ANSWER"}
          inputBox={styles.TextInputWrapper}
          value={props.answer}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "answer", value })}
        />

        <TouchableOpacity
          style={styles.signUpWrapper}
          onPress={() => {
            onAddPress();
            signUp();
          }}
        >
          <View>
            <Text style={styles.signUpText}>SIGN UP</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: "#F5ECDE",
  },
  headerWrapper: {
    flexDirection: "column",
    marginTop: 75,
    marginLeft: 22,
    marginRight: 77,
  },
  createAccountText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 24,
    letterSpacing: 2,
  },
  getStartedText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 24,
    letterSpacing: 2,
    color: "#E5BE83",
  },
  TextWrapper: {
    marginTop: 40,
    marginHorizontal: 88,
  },
  Text: {
    fontSize: 10,
    fontFamily: "Roboto_500Medium",
    lineHeight: 18,
    color: "black",
  },
  TextInputWrapper: {
    marginTop: 4,
    marginHorizontal: 88,
    backgroundColor: "transparent",
    paddingVertical: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  TextInput: {
    fontSize: 12,
    fontFamily: "Roboto_500Medium",
    color: "black",
  },
  signUpWrapper: {
    marginTop: 35,
    marginHorizontal: 24,
    backgroundColor: "black",
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
    fontFamily: "Roboto_500Medium",
    letterSpacing: 10,
    color: "#FDE0B3",
  },
});

const mapStateToProps = (state) => {
  const {
    username,
    password,
    confirmPassword,
    email,
    birthdate,
    question,
    answer,
  } = state;
  return {
    username,
    password,
    confirmPassword,
    email,
    birthdate,
    question,
    answer,
  };
};

export default connect(mapStateToProps, actions)(signUp);
