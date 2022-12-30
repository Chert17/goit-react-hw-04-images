/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalContent } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ bigImg, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  function handleKeyDown(event) {
    console.log('object');
    if (event.code === 'Escape') {
      onClose();
    }
  }

  function handleBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  return createPortal(
    <>
      <Overlay onClick={handleBackdropClick}>
        <ModalContent>
          <img src={bigImg} alt="img" />
        </ModalContent>
      </Overlay>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  bigImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
