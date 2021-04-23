import PropTypes from 'prop-types';

export const screenPropTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }),
};

export const childrenPropType = PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]);

export default PropTypes;
