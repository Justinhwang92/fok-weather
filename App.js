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

  getWeather = async (latitude, longitude) => {
    // getting temperature
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`
    );
    //console.log(weather);
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp,
    });
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

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}
