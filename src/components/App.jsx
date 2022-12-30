// import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState } from 'react';

export function App() {
  const [imgQuery, setImgQuery] = useState('');

  function handleFormSubmit(query) {
    setImgQuery(query);
  }

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imgQuery={imgQuery} />
    </>
  );
}
