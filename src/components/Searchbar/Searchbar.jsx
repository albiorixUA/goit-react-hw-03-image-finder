import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import s from './Searchbar.module.css';

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
      <header className={s.Searchbar}>
        <Toaster />
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
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
