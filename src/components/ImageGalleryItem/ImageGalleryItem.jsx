import PropTypes from 'prop-types';

import { GalleryItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, alt, largeImageURL, openModal }) => {
  return (
    <GalleryItem onClick={() => openModal(largeImageURL)}>
      <Img src={src} alt={alt} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func,
};
