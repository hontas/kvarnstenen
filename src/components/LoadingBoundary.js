import * as React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const Loading = () => (
  <View>
    <Text>loading</Text>
  </View>
);

export class LoadingBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
}

LoadingBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};
