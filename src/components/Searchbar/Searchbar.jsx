import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default class SearchBar extends Component {
  state = {
    pictureName: '',
  };

  handleSearchChange = e => {
    this.setState({ pictureName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.pictureName.trim() === '') {
      return toast.error('Enter a search query');
    }
    this.props.onSubmit(this.state.pictureName);
  };

  render() {
    return (
      <header class="searchbar">
        <Toaster />
        <form onSubmit={this.handleSubmit} class="form">
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>
          <input
            class="input"
            value={this.state.pictureName}
            onChange={this.handleSearchChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
