import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import ProfileComp from "../../components/profileComp";
import TopBar from "../../components/TopBar";
import EarningsBar from "../../components/EarningsBar";
import CalendarNavBar from "../../components/calendarNavBar";

function calendar({ navigation, profileName }) {
  return (
    <View style={{ top: 25, backgroundColor: "#F5ECDE", flex: 1 }}>
      <TopBar title={"Calendar"} />
      {/*Main Body*/}
      <ProfileComp />
      {/* Calendar Stuff */}
      <View style={styles.calendarStuff}>
        <CalendarNavBar />
      </View>
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
