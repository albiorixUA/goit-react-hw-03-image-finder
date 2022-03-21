import React, { Component } from 'react';
import LoaderSpiner from 'components/Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';
import LoadMore from 'components/Button';
import api from 'servises/api';

const Status = {
  LOADING: 'loading',
  LOADED: 'loaded',
};

export default class ImageGallery extends Component {
  state = {
    pictureData: [],
    pictureModal: '',
    status: '',
    showModal: false,
    page: 1,
  };

  componentDidUpdate(prevProps) {
    const prevSearch = prevProps.pictureName;
    const nextSearch = this.props.pictureName;
    if (prevSearch !== nextSearch) {
      this.loadPicture();
    }
  }

  loadPicture = () => {
    this.setState({ status: Status.LOADING });
    api
      .fetchPicture(this.props.pictureName, this.state.page)
      .then(res => {
        this.setState({
          pictureData: res.data.hits,
          status: Status.LOADED,
        });
      })
      .catch(error => console.log(error));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = picture => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      pictureModal: picture,
    }));
  };

  render() {
    const { status, pictureData, showModal, pictureModal } = this.state;

    return (
      <>
        {status === 'loading' && <LoaderSpiner />}
        {status === 'loaded' && (
          <ul class="gallery">
            <ImageGalleryItem
              pictureData={pictureData}
              onClick={this.toggleModal}
            />
          </ul>
        )}
        {status === 'loaded' && <LoadMore onClick={this.loadMore} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={pictureModal} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
