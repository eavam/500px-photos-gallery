// @flow
import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';

import ListPhoto from './components/ListPhoto';
import CurrentPhoto from './components/CurrentPhoto';

type State = {
  photo: ?number,
};

export default class Main extends Component<void, State> {
  state = {
    photo: null,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handlerHideImage);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handlerHideImage);
  }

  handlerShowImage = (id: number) => () => {
    this.setState({ photo: id });
  };

  handlerHideImage = () => {
    this.setState({ photo: null });
  };

  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <ListPhoto onPressImage={this.handlerShowImage} />
        {this.state.photo && (
          <CurrentPhoto id={this.state.photo} onPressImage={this.handlerHideImage} />
        )}
      </View>
    );
  }
}
