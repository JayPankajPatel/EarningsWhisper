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
import EarningsBar from "../../components/EarningsBar";
import CalendarNavBar from "../../components/calendarNavBar";
 
function StockDetail ({
   gradeColor,
   Grade,
   lowRange,
   highRange,
   Volume,
   marketCap,
   stockAbbrev
})
 {
   return (
     <View style={{ top: 25, backgroundColor: "#F5ECDE", flex: 1 }}>
       <TopBar title={stockAbbrev} />
       <View style={styles.gradeContainer}>
         <Text style={styles.gradeText}> {Grade} </Text>
       </View>
        <View style={styles.textContainer}>
         <Text> 52 Week Range: {lowRange} - {highRange} </Text>
         <Text style={{ marginTop: 10 }}> Volume: {Volume}</Text>
         <Text style={{ marginTop: 10 }}> Market Cap: {marketCap}</Text>
       </View>
     </View>
   );
 }
 
const styles = StyleSheet.create({
 container: {
   marginHorizontal: "5%",
   backgroundColor: "#39352F",
   paddingVertical: "80%",
   borderRadius: 10,
 },
 textContainer: {
   marginTop: 30,
   flexDirection: "column",
   justifyContent: "space-evenly",
   marginVertical: 144,
   marginLeft: 10,
 },
 gradeContainer: {
   marginTop: 30,
   marginLeft: 200,
   marginRight: 10,
   padding: 40,
   backgroundColor: "#37FF25",
   borderRadius: 10,
 },
 gradeText: {
   justifyContent: "center",
   marginLeft: 20,
   fontWeight: "300",
   letterSpacing: 5,
   fontSize: 48,
   color: "white",
 },
});
 
export default StockDetail;
 
