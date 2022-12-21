import {
  Gallery,
  GalleryItemStyle,
  GalleryImg,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({ img }) {
  return (
    <>
      <Gallery>
        {img.hits.map(({ id, webformatURL, tags }) => {
          return (
            <GalleryItemStyle key={id}>
              <GalleryImg
                src={webformatURL}
                alt={tags}
                width="300"
                height="200"
              ></GalleryImg>
            </GalleryItemStyle>
          );
        })}
      </Gallery>
    </>
  );
}
