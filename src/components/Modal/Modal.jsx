import { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalContent } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { bigImg } = this.props;
    return createPortal(
      <>
        <Overlay onClick={this.handleBackdropClick}>
          <ModalContent>
            <img src={bigImg} alt="img" />
          </ModalContent>
        </Overlay>
      </>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  bigImg: PropTypes.string.isRequired,
};
