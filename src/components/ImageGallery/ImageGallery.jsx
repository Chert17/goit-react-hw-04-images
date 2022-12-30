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

export function ImageGallery({ imgQuery }) {
  const [img, setImg] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
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
  }, [imgQuery, page]);

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
      {img.length >= 4 && <Button onClick={loadMore} />}
      {showModal && <Modal onClose={onModal} bigImg={bigImg} />}
    </>
  );
}

// export class ImageGallery1 extends Component {
//   state = {
//     img: [],
//     status: Status.IDLE,
//     page: 1,
//     bigImg: '',
//     showModal: false,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevProps.imgSense;
//     const nextQuery = this.props.imgSense;
//     const prevPage = prevState.page;
//     let nextPage = this.state.page;

//     if (prevQuery !== nextQuery) {
//       nextPage = 1;
//       this.setState({
//         img: [],
//       });
//     }

//     if (prevQuery !== nextQuery || prevPage !== nextPage) {
//       this.setState({ status: Status.PENDING });

//       const data = await getImg(nextQuery, nextPage);
//       console.log(nextQuery, nextPage);

//       if (!data.hits.length) {
//         return this.setState({ data, status: Status.REJECTED });
//       }

//       return this.setState(prevState => ({
//         status: Status.RESOLVED,
//         img: [...prevState.img, ...data.hits],
//       }));
//     }
//   }

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   onModal = e => {
//     const { showModal } = this.state;
//     if (showModal) {
//       this.setState({
//         showModal: !showModal,
//       });
//       return;
//     }
//     if (e.target.nodeName !== 'IMG') return;
//     this.setState({
//       showModal: !showModal,
//       bigImg: e.target.dataset.bigimg,
//     });
//   };

//   render() {
//     const { img, status, bigImg, showModal } = this.state;

//     if (status === Status.REJECTED) {
//       return <NotFound text={this.props.imgSense} />;
//     }

//     return (
//       <>
//         <ImageGalleryItem img={img} onClick={this.onModal} />
//         {status === Status.PENDING && <Loader />}
//         {img.length >= 4 && <Button onClick={this.loadMore} />}
//         {showModal && <Modal onClose={this.onModal} bigImg={bigImg} />}
//       </>
//     );
//   }
// }

ImageGallery.propTypes = {
  imgQuery: PropTypes.string.isRequired,
};
