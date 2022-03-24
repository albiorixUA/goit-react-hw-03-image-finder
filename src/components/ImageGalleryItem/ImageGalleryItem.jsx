import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGallryItem = ({ pictureData, onClick }) => {
  return pictureData.map(picture => (
    <li
      key={picture.id}
      className={s.ImageGalleryItem}
      onClick={() => onClick(picture.largeImageURL)}
    >
      <img
        className={s.ImageGalleryItemImage}
        src={picture.webformatURL}
        alt=""
      />
    </li>
  ));
};

export default ImageGallryItem;

ImageGallryItem.propTypes = {
  pictureData: PropTypes.arrayOf(PropTypes.object),
};
