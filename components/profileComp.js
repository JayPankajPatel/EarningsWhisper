import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import * as actions from "../src/actions";

const ProfileComp = (props) => {
  return (
    <View style={styles.profile}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.image}
      >
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.fontStyle}>Welcome Back {props.username} </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    flex: 1,
  },
  image: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  fontStyle: {
    flex: 2,
    flexWrap: "wrap",
    fontSize: 24,
    color: "#F5ECDE",
    marginLeft: 60,
  },
  profileImage: {
    flex: 1,
    zIndex: 2,
    resizeMode: "cover",
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "#F5ECDE",
    height: 120,
    left: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

export default connect(mapStateToProps, actions)(ProfileComp);
