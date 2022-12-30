import { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from 'components/bx_search.svg';

import {
  SearchbarStyle,
  SearchForm,
  SearchFormBtn,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  function handleSearchImg(e) {
    setQuery(e.currentTarget.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!query) return;

    onSubmit(query);
    setQuery('');
  }

  return (
    <>
      <SearchbarStyle>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormBtn type="submit">
            <SearchIcon />
          </SearchFormBtn>
          <SearchFormLabel>
            <SearchFormInput
              type="text"
              value={query}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={handleSearchImg}
            />
          </SearchFormLabel>
        </SearchForm>
      </SearchbarStyle>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
