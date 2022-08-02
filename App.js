import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Button, IconButton } from "react-native-paper";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [temp, settemp] = useState([0]);
  const [feel, setFeel] = useState([0]);

  //API Call
  const Weatherfetch = (text) => {
    axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${text}&APPID=e372c354feb0d0a782d5e94cf94ff932`,
    })
      .then((response) => {
        settemp(response.data.main.temp - 273.15);
        setFeel(response.data.main.feels_like - 273.15);
        //Alert.alert("response", JSON.stringify(response.data.main.temp - 273));
        //area name,Temp,Feels like,etc etc.....in place of alert
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  //Applying useffect to optimize the api call
  useEffect(() => {
    Weatherfetch();
  }, []);

  let correcttemp = parseInt(temp).toFixed(2);
  let correctfeels = parseInt(feel).toFixed(2);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://cdn.wallpapersafari.com/89/3/kyN2wW.jpg" }}
      />

      <TextInput
        style={styles.searchBar}
        placeholder="Enter your city"
        //onChangeText = {newText=>setText(newText)}
        onSubmitEditing={(value) => setText(value.nativeEvent.text)}
        defaultValue={text}
      />
      <View style={styles.button1}>
        <IconButton
          size={20}
          color={"#fff"}
          icon={{ uri: "https://img.icons8.com/ios-glyphs/344/search--v1.png" }}
          onPress={() => Weatherfetch(text)}
          style={styles.button1}
        />
      </View>

      <View style={styles.view2}>
        <Text>Temp = {correcttemp} &deg;C</Text>
        <Text>Feels Like = {correctfeels} &deg;C</Text>
      </View>

      <StatusBar backgroundColor="white" barStyle="light-content" />
    </View>
  );
}

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  searchBar: {
    position: "absolute",
    width: 150,
    height: 30,
    top: 150,
    left: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  button1: {
    position: "absolute",
    top: 72,
    right: 45,
  },

  view2: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
