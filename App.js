import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Button, IconButton, Card, Paragraph, Title } from "react-native-paper";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [temp, settemp] = useState(null);
  const [feel, setFeel] = useState(null);
  const [city, setCity] = useState([""]);
  const [humid, setHumid] = useState(null);
  const [country, setCountry] = useState([""]);
  const [desc, setDesc] = useState([""]);
  const [cloud, setCloud] = useState(null);

  //API Call
  const Weatherfetch = (text) => {
    axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${text}&APPID=e372c354feb0d0a782d5e94cf94ff932`,
    })
      .then((response) => {
        settemp(response.data.main.temp - 273);
        setFeel(response.data.main.feels_like - 273);
        setCity(response.data.name);
        setHumid(response.data.main.humidity);
        setCountry(response.data.sys.country);
        setDesc(response.data.weather[0].description);
        setCloud(response.data.clouds.all);
        //Alert.alert("response", JSON.stringify(response.data.main.temp - 273));
        //area name,Temp,Feels like,etc etc.....in place of alert
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  //Applying useffect to optimize the api call
  useEffect(() => {
    Weatherfetch(text);
  }, []);

  let correcttemp = Number(temp).toFixed(2);
  let correctfeels = Number(feel).toFixed(2);

  return (
    <View style={styles.container}>
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
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Weather Information {"\n"}</Title>

            <Paragraph style={styles.cardtText}>
              Country = {country} {"\n"}
              City Name = {city} {"\n"}
              Temperature = {correcttemp}&deg;C {"\n"}
              Description = {desc} {"\n"}
              Feels Like = {correctfeels}&deg;C {"\n"}
              Humidity = {humid}% {"\n"}
              Cloud % ={cloud}%
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
      <StatusBar hidden={true} />

      <View style={styles.container2}>
        <Text style={styles.nameText}>
          @Mayukh Acharya{"\n"}
          Thanks for using.
        </Text>
      </View>
    </View>
  );
}

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4d9fe8",
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
    top: 350,
    alignItems: "center",
    justifyContent: "center",
    height: 220,
  },

  card: {
    elevation: 5,
    padding: 1,
    borderRadius: 15,
  },

  cardtText: {
    fontFamily: "monospace",
    fontSize: 15,
    fontWeight: "100",
  },

  title: {
    fontFamily: "sans-serif-light",
  },

  container2: {
    width: 410,
    height: 95,
    backgroundColor: "#88e39f",
    top: 520,
    borderRadius: 20,
  },
  nameText: {
    textAlign: "center",
    top: 30,
    fontFamily: "sans-serif-light",
  },
});
