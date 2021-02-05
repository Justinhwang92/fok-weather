import React from "react";
import { View, Text, StyleSheet, StatusBar, TextInput } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
  Thunderstorm: {
    iconName: "weather-lightning",
    gradient: ["#373B44", "#4286f4"],
    title: "Thunderstorm in the house",
    subtitle: "Actually, outside of the house",
  },
  Drizzle: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "Drizzle",
    subtitle: "Is like rain, but is like mizzle",
  },
  Rain: {
    iconName: "weather-rainy",
    gradient: ["#00C6FB", "#005BEA"],
    title: "Raining",
    subtitle: "For more info look outside",
  },
  Snow: {
    iconName: "weather-snowy",
    gradient: ["#7DE2FC", "#B9B6E5"],
    title: "Cold as Elsa",
    subtitle: "Do you want to build a snowman?",
  },
  Atmosphere: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#FF7300", "#FEF253"],
    title: "Sunny as smile",
    subtitle: "Go get the light!",
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#D7D2CC", "#304352"],
    title: "Clouds",
    subtitle: "I know, it's boring",
  },
  Mist: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "Mist!",
    subtitle: "It's like you have no glasses on.",
  },
  Dust: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "Dusty",
    subtitle: "Time to think about saving our planet",
  },
  Haze: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "Haze",
    subtitle: "Just don't go outside.",
  },
};

export default function Weather({
  temp,
  condition,
  name,
  feels_like,
  temp_min,
  temp_max,
}) {
  return (
    <LinearGradient
      colors={weatherOptions[condition].gradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <MaterialCommunityIcons
          size={30}
          name="temperature-fahrenheit"
          color="white"
          onPress={() => alert("pressed")}
        />
        <Text style={styles.slash}>/</Text>
        <MaterialCommunityIcons
          size={30}
          name="temperature-celsius"
          color="white"
          onPress={(temp) => {
            toCelsius(temp);
          }}
        />
      </View>

      <View style={styles.halfContainer}>
        <Text style={styles.city}>{name}</Text>
        <MaterialCommunityIcons
          size={96}
          name={weatherOptions[condition].iconName}
          color="white"
        />
        <Text style={styles.temp}>{temp}°</Text>
        <Text style={styles.subTemp}>
          L:{temp_min}° / H:{temp_max}° feels like {feels_like}°
        </Text>
      </View>
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.tilte}>{weatherOptions[condition].title}</Text>
        <Text style={styles.subtitle}>
          {weatherOptions[condition].subtitle}
        </Text>
      </View>
      <View>
        <TextInput
          placeholder="Search other city or country..."
          placeholderColor="#c4c3cb"
          style={styles.searchTextInput}
        />
      </View>
    </LinearGradient>
  );
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  feels_like: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Haze",
    "Mist",
    "Dust",
  ]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingTop: 50,
    paddingRight: 20,
  },
  slash: {
    fontSize: 25,
    color: "white",
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 42,
    color: "white",
  },
  subTemp: {
    fontSize: 18,
    color: "white",
  },
  city: {
    fontSize: 42,
    color: "white",
  },
  tilte: {
    color: "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 24,
  },
  searchTextInput: {
    height: 43,
    width: 350,
    fontSize: 15,
    borderRadius: 10,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginBottom: 30,
  },
  // in case text is too long
  textContainer: {
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
});
