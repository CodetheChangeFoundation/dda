import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Authentication from '../components/Authentication';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html

  // goto Authentication page by default,
  // left MainTabNavigator alone since there are some good examples in it
  // Authentication: Authentication,
  Main: MainTabNavigator,
}));