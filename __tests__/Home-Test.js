import 'react-native';

import React from 'react';

import Home from '../src/screens/Home';
import renderer from 'react-test-renderer';

test('snapshot', () => {
  const snap = renderer.create(<Home />).toJSON();

  expect(snap).toMatchSnapshot();
});
