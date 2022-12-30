// import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState } from 'react';

export function App() {
  const [imgQuery, setImgQuery] = useState('');
  const [page, setPage] = useState(1);
  const [img, setImg] = useState([]);

  function handleFormSubmit(query) {
    setImgQuery(query);
  }

  return (
    <>
      <Searchbar
        onSubmit={handleFormSubmit}
        page={page}
        setPage={setPage}
        img={img}
        setImg={setImg}
      />
      <ImageGallery
        imgQuery={imgQuery}
        page={page}
        setPage={setPage}
        img={img}
        setImg={setImg}
      />
    </>
  );
}
