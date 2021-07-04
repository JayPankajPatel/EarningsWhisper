import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Logo from "../src/resources/logo";
import AppLoading from "expo-app-loading";
import { useFonts } from "@expo-google-fonts/roboto";
import { LinearGradient } from "expo-linear-gradient";
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
    //props.navigation.navigate("Login");
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
          placeholder={"Ex. Mike"}
          placeholderColor={"#323232"}
        />

        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Last Name:"}
          inputBox={styles.TextInputWrapper}
          value={props.lname}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "lname", value })}
          placeholder={"Ex. Larson"}
          placeholderColor={"#323232"}
        />

        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Birth Date:"}
          inputBox={styles.TextInputWrapper}
          value={props.birthdate}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "birthdate", value })}
          placeholder={"Ex. 05/22/1987"}
          placeholderColor={"#323232"}
        />

        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Phone:"}
          inputBox={styles.TextInputWrapper}
          value={props.phone}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "phone", value })}
          placeholder={"Ex. 6264563232"}
          placeholderColor={"#323232"}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Address:"}
          inputBox={styles.TextInputWrapper}
          value={props.address}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "address", value })}
          placeholder={"Ex. 123 Main Street"}
          placeholderColor={"#323232"}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"City:"}
          inputBox={styles.TextInputWrapper}
          value={props.city}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "city", value })}
          placeholder={"Ex. Tuscon"}
          placeholderColor={"#323232"}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"State:"}
          inputBox={styles.TextInputWrapper}
          value={props._state}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "state", value })}
          placeholder={"Ex. UT"}
          placeholderColor={"#323232"}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Zip Code:"}
          inputBox={styles.TextInputWrapper}
          value={props.zipcode}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "zipcode", value })}
          placeholder={"Ex. 34235"}
          placeholderColor={"#323232"}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Country:"}
          inputBox={styles.TextInputWrapper}
          value={props.country}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "country", value })}
          placeholder={"Ex. US"}
          placeholderColor={"#323232"}
        />

        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Username"}
          inputBox={styles.TextInputWrapper}
          value={props.username}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "username", value })}
          placeholder={"Ex. greg"}
          placeholderColor={"#323232"}
        />

        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Email"}
          inputBox={styles.TextInputWrapper}
          value={props.email}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "email", value })}
          placeholder={"Ex. gorg@gmail.com"}
          placeholderColor={"#323232"}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Password"}
          inputBox={styles.TextInputWrapper}
          value={props.password}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "password", value })}
          placeholder={"Ex. ..."}
          placeholderColor={"#323232"}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Confirm Password"}
          value={props.confirmPassword}
          inputBox={styles.TextInputWrapper}
          inputStyleText={styles.TextInput}
          setChange={(value) =>
            props.formUpdate({ prop: "confirmPassword", value })
          }
          placeholder={"Ex..."}
          placeholderColor={"#323232"}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Security Question"}
          inputBox={styles.TextInputWrapper}
          value={props.question}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "question", value })}
          placeholder={"Ex. What is your favorite dog?"}
          placeholderColor={"#323232"}
        />
        <BoxInput
          labelBox={styles.TextWrapper}
          styleFontText={styles.Text}
          textLabel={"Answer"}
          inputBox={styles.TextInputWrapper}
          value={props.answer}
          inputStyleText={styles.TextInput}
          setChange={(value) => props.formUpdate({ prop: "answer", value })}
          placeholder={"Ex. Spike"}
          placeholderColor={"#323232"}
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
    marginHorizontal: 20,
    marginVertical: 20,
  },
  Text: {
    fontSize: 15,
    fontFamily: "Roboto",
    lineHeight: 18,
  },
  TextInputWrapper: {
    display: "flex",
    flex: 1,
    borderBottomColor: "#F5ECDE",
    borderBottomWidth: 1,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  TextInput: {
    fontSize: 15,
    fontFamily: "Roboto",
    width: 150,
    borderBottomColor: "#323232",
    borderBottomWidth: 2,
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
