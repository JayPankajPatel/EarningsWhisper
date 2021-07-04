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
          textLabel={"First Name:"}
          value={props.fname}
          setChange={(value) => props.formUpdate({ prop: "fname", value })}
          placeholder={"Ex. Mike"}
        />

        <BoxInput
          styleFontText={styles.Text}
          textLabel={"Last Name:"}
          value={props.lname}
          setChange={(value) => props.formUpdate({ prop: "lname", value })}
          placeholder={"Ex. Larson"}
        />

        <BoxInput
          textLabel={"Birth Date:"}
          value={props.birthdate}
          setChange={(value) => props.formUpdate({ prop: "birthdate", value })}
          placeholder={"Ex. 05/22/1987"}
        />

        <BoxInput
          textLabel={"Phone:"}
          value={props.phone}
          setChange={(value) => props.formUpdate({ prop: "phone", value })}
          placeholder={"Ex. 6264563232"}
        />
        <BoxInput
          textLabel={"Address:"}
          value={props.address}
          setChange={(value) => props.formUpdate({ prop: "address", value })}
          placeholder={"Ex. 123 Main Street"}
        />
        <BoxInput
          textLabel={"City:"}
          value={props.city}
          setChange={(value) => props.formUpdate({ prop: "city", value })}
          placeholder={"Ex. Tuscon"}
        />
        <BoxInput
          styleFontText={styles.Text}
          textLabel={"State:"}
          value={props._state}
          setChange={(value) => props.formUpdate({ prop: "state", value })}
          placeholder={"Ex. UT"}
        />
        <BoxInput
          textLabel={"Zip Code:"}
          value={props.zipcode}
          setChange={(value) => props.formUpdate({ prop: "zipcode", value })}
          placeholder={"Ex. 34235"}
        />
        <BoxInput
          textLabel={"Country:"}
          value={props.country}
          setChange={(value) => props.formUpdate({ prop: "country", value })}
          placeholder={"Ex. US"}
        />

        <BoxInput
          textLabel={"USERNAME"}
          value={props.username}
          setChange={(value) => props.formUpdate({ prop: "username", value })}
          placeholder={"Ex. greg"}
        />

        <BoxInput
          textLabel={"EMAIL"}
          value={props.email}
          setChange={(value) => props.formUpdate({ prop: "email", value })}
          placeholder={"Ex. gorg@gmail.com"}
        />
        <BoxInput
          textLabel={"PASSWORD"}
          value={props.password}
          setChange={(value) => props.formUpdate({ prop: "password", value })}
          placeholder={"Ex. ..."}
        />
        <BoxInput
          textLabel={"CONFIRM PASSWORD"}
          value={props.confirmPassword}
          setChange={(value) =>
            props.formUpdate({ prop: "confirmPassword", value })
          }
          placeholder={"Ex..."}
        />
        <BoxInput
          textLabel={"SECURITY QUESTION"}
          value={props.question}
          setChange={(value) => props.formUpdate({ prop: "question", value })}
          placeholder={"Ex. What is your favorite dog?"}
        />
        <BoxInput
          textLabel={"ANSWER"}
          value={props.answer}
          setChange={(value) => props.formUpdate({ prop: "answer", value })}
          placeholder={"Ex. Spike"}
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
