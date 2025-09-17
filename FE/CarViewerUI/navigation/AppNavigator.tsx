import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';

export default function AppNavigator() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
