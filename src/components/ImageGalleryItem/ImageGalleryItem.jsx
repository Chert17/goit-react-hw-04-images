import PropTypes from 'prop-types';

import {
  Gallery,
  GalleryItemStyle,
  GalleryImg,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({ img, onClick }) {
  return (
    <>
      <Gallery>
        {img.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <GalleryItemStyle key={id} onClick={onClick}>
              <GalleryImg
                src={webformatURL}
                alt={tags}
                data-bigimg={largeImageURL}
                width="300"
                height="200"
              />
            </GalleryItemStyle>
          );
        })}
      </Gallery>
    </>
  );
}

ImageGalleryItem.propTypes = {
  img: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
