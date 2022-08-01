import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");

  //API Call
  const Weatherfetch = (text) => {
    axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${text}&APPID=e372c354feb0d0a782d5e94cf94ff932`,
    })
      .then((response) => {
        Alert.alert("response", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

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
      <View style={styles.txt1}>
        <Button title="Weather" onPress={() => Weatherfetch(text)} />
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
    width: 200,
    top: 100,
    backgroundColor: "#fff",
  },
  txt1: {
    position: "absolute",
  },
});
