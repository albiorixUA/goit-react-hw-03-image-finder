import React, { Component } from 'react';
import api from 'servises/api';

export default class ImageGallery extends Component {
  state = {
    pictureData: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.pictureName;
    const nextSearch = this.props.pictureName;

    if (prevSearch !== nextSearch) {
      api
        .fetchPicture(nextSearch)
        .then(pictureData => this.setState({ pictureData }))
        .catch(error => this.setState({ error }));
    }
  }
  render() {
    return <ul class="gallery"></ul>;
  }
}
