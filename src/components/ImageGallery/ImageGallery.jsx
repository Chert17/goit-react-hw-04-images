import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { NotFound } from 'components/NotFound/NotFound';

export class ImageGallery extends Component {
  state = {
    img: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const PrevQuery = prevProps.imgSense;
    const nextQuery = this.props.imgSense;

    if (PrevQuery !== nextQuery) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?key=31629181-f048b32387df13005b2e6ea0c&q=${nextQuery}&per_page=12&image-type=horizontal`
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

  render() {
    const { img, status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <NotFound text={this.props.imgSense} />;
    }

    if (status === 'resolved') {
      return <ImageGalleryItem img={img} />;
    }
  }
}
