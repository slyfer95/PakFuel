import React from 'react';
import { StyleSheet } from 'react-native';
import { EmployeeHome } from '../EmployeeScreens/EmployeeHome';
import { SettingsPage } from '../SettingsPage';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Box, Icon } from '@gluestack-ui/themed';
import { Home, Settings } from 'lucide-react-native';

export const Employee = ({ navigation }) => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Box style={styles.container}>
      <Tab.Navigator
        initialRouteName="Home"
        shifting={false}
        sceneAnimationEnabled={false}
        activeColor="#C1F2B0"
        inactiveColor="#000"
        barStyle={{ backgroundColor: '#65B741' }}>
        <Tab.Screen
          name={'Home'}
          component={EmployeeHome}
          options={{
            tabBarIcon: ({ focused }) => {
              return <Icon as={Home} size={25} />;
            },
            tabBarColor: '#000',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsPage}
          options={{
            tabBarIcon: ({ focused }) => {
              return <Icon as={Settings} size={25} />;
            },
          }}
        />
      </Tab.Navigator>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  welcome: {
    marginLeft: '4%',
  },
  scan: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
