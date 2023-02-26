import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '~/Page/Home/Home';
import Setting from '~/Page/Setting/Setting';
import Statistics from '~/Page/Statistics/Statistics';
import {BottmNavigationParamList} from './navigation';
import {useTheme} from '@emotion/react';

import {CalendarIcon, HomeIcon, SettingIcon} from '~/Asset/Image/NavIcon';
import BottmNavBackground from './BottmNavBackground';

const Bottom = createBottomTabNavigator<BottmNavigationParamList>();

function BottomNavigation() {
  const theme = useTheme();
  return (
    <Bottom.Navigator
      screenOptions={{
        lazy: false,
        headerShown: false,
        tabBarActiveTintColor: theme.primaryColor,
        tabBarBackground: BottmNavBackground,
      }}>
      <Bottom.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({color}) => (
            <HomeIcon color={color} width={26} height={26} />
          ),
        }}
      />
      <Bottom.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarLabel: '통계',
          tabBarIcon: ({color}) => (
            <CalendarIcon color={color} width={26} height={26} />
          ),
        }}
      />

      <Bottom.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: ({color}) => (
            <SettingIcon color={color} width={26} height={26} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
}

export default BottomNavigation;
