import PropTypes from 'prop-types';

export const screenPropTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }),
};

export default PropTypes;
