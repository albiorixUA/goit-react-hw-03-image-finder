import s from './Button.module.css';
import PropTypes from 'prop-types';

const LoadMore = ({ onClick }) => {
  return (
    <div className={s.ButtonContainer}>
      <button className={s.Button} type="button" onClick={onClick}>
        LoadMore
      </button>
    </div>
  );
};

export default LoadMore;

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
