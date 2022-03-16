import React, { Component } from 'react';
import LoaderSpiner from 'components/Loader/Loader';
import api from 'servises/api';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
};

export default class ImageGallery extends Component {
  state = {
    pictureData: '',
    status: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.pictureName;
    const nextSearch = this.props.pictureName;

    if (prevSearch !== nextSearch) {
      this.setState({ status: Status.PENDING });
      api
        .fetchPicture(nextSearch)
        .then(res => {
          this.setState({
            pictureData: res.data.hits,
            status: Status.RESOLVED,
          });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const { status } = this.state;

    return (
      <>
        {status === 'pending' && <LoaderSpiner />}
        {status === 'resolved' && <ul class="gallery"></ul>}
      </>
    );
  }
}
