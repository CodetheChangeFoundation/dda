import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import StartScreen from "../screens/StartScreen";
import AuthScreen from "../screens/AuthScreen";
import EmployerSignUpScreen from "../screens/EmployerSignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

export default createAppContainer(createSwitchNavigator({
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Start: StartScreen,
    Auth: AuthScreen,



    ChangePassword: ChangePasswordScreen,
    EmployerSignUp: EmployerSignUpScreen,


    Home: HomeScreen,
    Main: MainTabNavigator,

}));