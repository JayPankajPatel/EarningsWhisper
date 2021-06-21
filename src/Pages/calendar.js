import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import TopBar from "../../components/TopBar";
import Transactions from "../../components/Transactions";
function calendar({ navigation, profileName }) {
  return (
    <View style={{ top: 25, backgroundColor: "#F5ECDE", flex: 1 }}>
      <TopBar title={"Calendar"} />
      {/*Main Body*/}
      <View style={styles.profile}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1558025137-0b406e9cc169?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80",
          }}
          style={styles.image}
        >
          <View style={styles.border}></View>
          <View>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
              }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.fontStyle}>Welcome Back {profileName}</Text>
        </ImageBackground>
      </View>
      {/* Calendar Stuff */}
      <View style={styles.calendarStuff}></View>
      {/*Transactions */}
      <View style={styles.transactions}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
  },
  calendarStuff: {
    flex: 3,
  },
  border: {
    backgroundColor: "#F5ECDE",
    padding: 50,
    borderRadius: 60,
    width: 55,
    position: "absolute",
    left: 10,
  },
  image: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  fontStyle: {
    fontSize: 24,
    color: "#F5ECDE",
    left: 20,
  },
  profileImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default calendar;
