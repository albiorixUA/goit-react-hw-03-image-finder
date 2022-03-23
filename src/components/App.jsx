import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import LoaderSpiner from './Loader';
import Modal from './Modal';
import LoadMore from './Button';
import api from 'servises/api';

const Status = {
  LOADING: 'loading',
  LOADED: 'loaded',
};

export default class App extends Component {
  state = {
    pictureName: '',
    pictureData: '',
    pictureModal: null,
    status: null,
    showModal: false,
    page: 1,
  };

  componentDidUpdate(prevState, prevProps) {
    const prevSearch = prevProps.pictureName;
    const nextSearch = this.state.pictureName;

    if (prevSearch !== nextSearch) {
      this.loadPicture();
      this.resetData();
      this.resetPage();
    }
  }

  resetPage() {
    this.setState({
      page: 1,
    });
  }

  resetData() {
    this.setState({
      pictureData: '',
    });
  }

  loadPicture = () => {
    const { pictureName, page } = this.state;
    this.setState({ status: Status.LOADING });
    api
      .fetchPicture(pictureName, page)
      .then(res => {
        this.setState(prevState => ({
          pictureData: [...prevState.pictureData, ...res.data.hits],
          status: Status.LOADED,
        }));
      })
      .catch(error => console.log(error));
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    this.loadPicture();
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
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'loading' && <LoaderSpiner />}
        {status === 'loaded' && (
          <ImageGallery>
            <ImageGalleryItem
              pictureData={pictureData}
              onClick={this.toggleModal}
            />
          </ImageGallery>
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
