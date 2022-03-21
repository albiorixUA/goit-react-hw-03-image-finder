const ImageGallryItem = ({ pictureData, onClick }) => {
  return pictureData.map(picture => (
    <li
      key={picture.id}
      class="gallery-item"
      onClick={() => onClick(picture.largeImageURL)}
    >
      <img src={picture.webformatURL} alt="" />
    </li>
  ));
};

export default ImageGallryItem;
