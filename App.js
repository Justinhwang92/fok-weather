import React from "react";
import Loading from "./Loading";
import Weather from "./Weather";
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";

const API_KEY = "96164976cab6ccdfb8c8dadabe72bc8a";

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getLocation = async () => {
    try {
      // asking permission
      await Location.requestPermissionsAsync();

      // getting the geo info
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      // Send to API and get weather
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  getWeather = async (latitude, longitude) => {
    // getting temperature
    const {
      data: {
        main: { temp, feels_like, temp_min, temp_max },
        weather,
        name,
      },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`
    );

    //console.log(feels_like);
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp,
      feels_like,
      temp_min,
      temp_max,
      name,
    });
  };

  render() {
    const {
      isLoading,
      temp,
      feels_like,
      temp_min,
      temp_max,
      condition,
      name,
    } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather
        temp={Math.round(temp)}
        condition={condition}
        name={name}
        feels_like={Math.round(feels_like)}
        temp_min={Math.round(temp_min)}
        temp_max={Math.round(temp_max)}
      />
    );
  }
}
