import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  BackHandler,
} from "react-native";
import styled from "styled-components";

import ListPhoto from "./src/components/ListPhoto";
import CurrentPhoto from "./src/components/CurrentPhoto";

export default class App extends React.Component {
  state = {
    photo: null,
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handlerHideImage);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handlerHideImage);
  }

  handlerShowImage = id => event => {
    this.setState({ photo: id });
  };

  handlerHideImage = () => {
    this.setState({ photo: null });
  };

  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <ListPhoto onPressImage={this.handlerShowImage} />
        {this.state.photo && (
          <CurrentPhoto id={this.state.photo} onPressImage={this.handlerHideImage} />
        )}
      </View>
    );
  }
}
