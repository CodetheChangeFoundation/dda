import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import StartScreen from "../screens/StartScreen";
import AuthScreen from "../screens/auth/AuthScreen";
import EmployerSignUpScreen from "../screens/auth/EmployerSignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ChangePasswordScreen from "../screens/auth/ChangePasswordScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

export default createAppContainer(createSwitchNavigator({
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    ForgotPassword: ForgotPasswordScreen,
    Start: StartScreen,
    Auth: AuthScreen,
    ChangePassword: ChangePasswordScreen,
    EmployerSignUp: EmployerSignUpScreen,
    Home: HomeScreen,
    Main: MainTabNavigator,
}));