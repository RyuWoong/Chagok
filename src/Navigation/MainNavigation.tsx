import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '~/Page/Login/Login';
import BottomNavigation from './BottomNavigation';
import {MainNavigationParamList} from './navigation';
import AccountForm from '~/Page/AccountForm/AccountForm';

const Stack = createNativeStackNavigator<MainNavigationParamList>();

function MainNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={BottomNavigation} />
      <Stack.Screen
        name="Form"
        component={AccountForm}
        options={{animation: 'slide_from_bottom', gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;
