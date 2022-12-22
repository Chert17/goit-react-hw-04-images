import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { NotFound } from 'components/NotFound/NotFound';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    img: null,
    status: 'idle',
    page: 1,
    bigImg: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.imgSense;
    const nextQuery = this.props.imgSense;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?key=31629181-f048b32387df13005b2e6ea0c&q=${nextQuery}&page=${nextPage}&per_page=12&image-type=horizontal`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(img => {
          if (!img.hits.length) {
            return this.setState({ img, status: 'rejected' });
          }
          return this.setState({ img, status: 'resolved' });
        });
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onModal = e => {
    const { showModal } = this.state;
    if (showModal) {
      this.setState({
        showModal: !showModal,
      });
      return;
    }
    if (e.target.nodeName !== 'IMG') return;
    this.setState({
      showModal: !showModal,
      bigImg: e.target.dataset.bigimg,
    });
  };

  render() {
    const { img, status, bigImg, showModal } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <NotFound text={this.props.imgSense} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryItem img={img} onClick={this.onModal} />
          {img.hits.length >= 12 && <Button onClick={this.loadMore} />}
          {showModal && <Modal onClose={this.onModal} bigImg={bigImg} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  imgSense: PropTypes.string.isRequired,
};
