import PropTypes from 'prop-types';
// import { Component } from 'react';

import { getImg } from 'service/pixabayApi';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { NotFound } from 'components/NotFound/NotFound';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { useState, useEffect } from 'react';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function ImageGallery({ imgQuery, page, setPage, img, setImg }) {
  // const [img, setImg] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  // const [page, setPage] = useState(1);
  const [bigImg, setBigImg] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!imgQuery) return;

    // setImg([]);
    // setPage(1);
    setStatus(Status.PENDING);

    async function fetchData(query, page) {
      const data = await getImg(query, page);

      if (!data.hits.length) {
        return setStatus(Status.REJECTED);
      }

      setStatus(Status.RESOLVED);
      setImg(prevState => [...prevState, ...data.hits]);
    }

    fetchData(imgQuery, page);
  }, [imgQuery, page, setImg]);

  function loadMore() {
    setPage(prevState => prevState + 1);
  }

  function onModal(e) {
    if (showModal) {
      setShowModal(!showModal);
      return;
    }

    if (e.target.nodeName !== 'IMG') return;
    setShowModal(!showModal);
    setBigImg(e.target.dataset.bigimg);
  }

  if (status === Status.REJECTED) {
    return <NotFound text={imgQuery} />;
  }

  return (
    <>
      <ImageGalleryItem img={img} onClick={onModal} />
      {status === Status.PENDING && <Loader />}
      {img.length >= 12 && <Button onClick={loadMore} />}
      {showModal && <Modal onClose={onModal} bigImg={bigImg} />}
    </>
  );
}

ImageGallery.propTypes = {
  imgQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  img: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  setImg: PropTypes.func.isRequired,
};
