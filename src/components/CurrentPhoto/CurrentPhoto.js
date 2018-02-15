// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { token, baseUrl } from '../../api';
import Loader from '../Loader';

const ImageContainer = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CurrentImage = styled.Image`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

type Props = {
  id: number,
  onPressImage: () => void,
};

type State = {
  photo: any,
  isLoading: boolean,
};

class CurrentPhoto extends Component<Props, State> {
  state = {
    photo: null,
    isLoading: true,
  };

  componentDidMount() {
    if (!this.props.id) return;

    fetch(`${baseUrl}photos/${this.props.id}?feature=popular&size=4&consumer_key=${token}`)
      .then(r => r.json())
      .then((response) => {
        this.setState({ photo: response.photo, isLoading: false });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <ImageContainer onPress={this.props.onPressImage} activeOpacity={1}>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <CurrentImage source={{ uri: this.state.photo.image_url }} resizeMode="contain" />
        )}
      </ImageContainer>
    );
  }
}

export default CurrentPhoto;
