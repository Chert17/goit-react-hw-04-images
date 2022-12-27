// import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from 'components/bx_search.svg';
import { Component } from 'react';

import {
  SearchbarStyle,
  SearchForm,
  SearchFormBtn,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    imgSense: '',
    // page: 1,
  };

  handleSearchImg = e => {
    this.setState({ imgSense: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.imgSense.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.imgSense);

    this.setState({ imgSense: '' });
  };

  render() {
    return (
      <>
        <SearchbarStyle>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormBtn type="submit">
              <SearchIcon />
            </SearchFormBtn>
            <SearchFormLabel>
              <SearchFormInput
                type="text"
                value={this.state.imgSense}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={this.handleSearchImg}
              />
            </SearchFormLabel>
          </SearchForm>
        </SearchbarStyle>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
