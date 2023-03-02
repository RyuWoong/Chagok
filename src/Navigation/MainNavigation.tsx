import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '~/Page/Login/Login';
import BottomNavigation from './BottomNavigation';
import {MainNavigationParamList} from './navigation';
import SpendForm from '~/Page/SpendForm/SpendForm';
import Account from '~/Page/Account/Account';

const Stack = createNativeStackNavigator<MainNavigationParamList>();

function MainNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={BottomNavigation} />
      <Stack.Screen
        name="Form"
        component={SpendForm}
        options={{animation: 'slide_from_bottom', gestureEnabled: false}}
      />
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}

export default MainNavigation;
