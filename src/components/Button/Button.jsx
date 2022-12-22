import PropTypes from 'prop-types';

import { LoadBtn } from './Button.styled';

export function Button({ onClick }) {
  return (
    <>
      <LoadBtn type="button" onClick={onClick}>
        Load more
      </LoadBtn>
    </>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
