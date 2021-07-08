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
import { AuthContext } from "../components/context";
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
    const {
      fname,
      lname,
      birthdate,
      email,
      phone,
      address,
      zipcode,
      city,
      _state,
      country,
      username,
      password,
      question,
      answer,
    } = props;

    props.createNewSignUp({
      fname,
      lname,
      birthdate,
      email,
      phone,
      address,
      zipcode,
      city,
      _state,
      country,
      username,
      password,
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
          textLabel={"First Name:"}
          inputBox={styles.TextInputWrapper}
          value={props.fname}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "fname", value })}
        />

        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Last Name:"}
          inputBox={styles.TextInputWrapper}
          value={props.lname}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "lname", value })}
        />

        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Birth Date:"}
          inputBox={styles.TextInputWrapper}
          value={props.birthdate}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "birthdate", value })}
        />

        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Phone:"}
          inputBox={styles.TextInputWrapper}
          value={props.phone}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "phone", value })}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Address:"}
          inputBox={styles.TextInputWrapper}
          value={props.address}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "address", value })}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"City:"}
          inputBox={styles.TextInputWrapper}
          value={props.city}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "city", value })}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"State:"}
          inputBox={styles.TextInputWrapper}
          value={props.state}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "state", value })}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Zip Code:"}
          inputBox={styles.TextInputWrapper}
          value={props.zipcode}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "zipcode", value })}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Country:"}
          inputBox={styles.TextInputWrapper}
          value={props.country}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "country", value })}
        />

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
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  Text: {
    fontSize: 13,
    fontFamily: "Roboto_500Medium",
    lineHeight: 18,
    color: "black",
  },
  TextInputWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 1,
    marginHorizontal: 10,
    backgroundColor: "transparent",
    paddingVertical: 1,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    width: 200,
  },
  TextInput: {
    fontSize: 12,
    fontFamily: "Roboto_500Medium",
    color: "black",
    width: 200,
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
    fname,
    lname,
    birthdate,
    email,
    phone,
    address,
    zipcode,
    city,
    _state,
    country,
    username,
    password,
    question,
    answer,
  } = state;
  return {
    fname,
    lname,
    birthdate,
    email,
    phone,
    address,
    zipcode,
    city,
    _state,
    country,
    username,
    password,
    question,
    answer,
  };
};

export default connect(mapStateToProps, actions)(signUp);
