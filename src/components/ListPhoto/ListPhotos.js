import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from "react-native";
import styled from "styled-components";
import { token, baseUrl } from "../../api";
import Loader from "../Loader";

const Container = styled.FlatList`
  padding: 20px 20px 40px 20px;
`;

const ImagesContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  padding: 10px;
`;

class ListPhotos extends Component {
  state = {
    photos: [],
    isLoading: true,
    currentPage: 1,
  };

  componentDidMount() {
    return fetch(`${baseUrl}photos?feature=popular&consumer_key=${token}`)
      .then(r => r.json())
      .then(response => {
        this.setState({ photos: response.photos, isLoading: false });
      })
      .catch(error => console.error(error));
  }

  handlerAddPhotos = () => {
    const newCurrentPage = this.state.currentPage + 1;
    if (this.state.isLoading) return;

    this.setState({ isLoading: true }, () => {
      return fetch(`${baseUrl}photos?page=${newCurrentPage}&feature=popular&consumer_key=${token}`)
        .then(r => r.json())
        .then(response => {
          this.setState(state => ({
            photos: [...state.photos, ...response.photos],
            currentPage: newCurrentPage,
            isLoading: false,
          }));
        });
    });
  };

  renderList = ({ item }) => (
    <ImagesContainer key={item.id} onPress={this.props.onPressImage(item.id)} activeOpacity={1}>
      <Image style={{ width: 140, height: 140 }} source={{ uri: item.image_url }} />
    </ImagesContainer>
  );

  render() {
    const footerComponent =
      this.state.photos.length !== 0 && this.state.isLoading ? <Loader /> : null;

    return (
      <Container
        keyExtractor={el => el.id}
        data={this.state.photos}
        renderItem={this.renderList}
        numColumns={2}
        onEndReached={this.handlerAddPhotos}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Loader />}
        ListFooterComponent={footerComponent}
      />
    );
  }
}

export default ListPhotos;
