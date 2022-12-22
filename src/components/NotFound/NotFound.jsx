import PropTypes from 'prop-types';

import { Text } from './NotFound.styled';

export function NotFound({ text }) {
  return <Text>Sorry, images {text} not found</Text>;
}

NotFound.propTypes = {
  text: PropTypes.string.isRequired,
};
