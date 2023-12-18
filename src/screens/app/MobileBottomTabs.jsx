import React from 'react';
import { useAuth, useCurrentUser } from 'src/contexts/AuthProvider';
import { StyleSheet } from 'react-native';
import { EmployeeHome } from './EmployeeScreens/EmployeeHome';
import { ManagerHome } from './ManagerScreens/ManagerHome';
import { AdminHome } from './AdminScreens/AdminHome';
import { SettingsPage } from './SettingsPage';
import {
  Box,
  Button,
  ButtonText,
  Text,
  HStack,
  Icon,
  Pressable,
  VStack,
} from '@gluestack-ui/themed';
import { Home, Settings } from 'lucide-react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const MobileBottomTabs = () => {
  const [activeScreen, setActiveScreen] = React.useState(undefined);
  const user = useCurrentUser();
  React.useEffect(() => {
    user.role === 'employee'
      ? setActiveScreen(EmployeeHome)
      : user.role === 'manager'
      ? setActiveScreen(ManagerHome)
      : setActiveScreen(AdminHome);
    console.log(activeScreen);
  }, []);
  return (
    <NavigationContainer>
      {/* <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        sceneAnimationEnabled={false}>
        <Tab.Screen
          name={
            activeScreen === EmployeeHome
              ? 'Employee Home'
              : activeScreen === ManagerHome
              ? 'Manager Home'
              : 'Admin Home'
          }
          component={activeScreen}
          options={{
            tabBarIcon: 'home',
            tabBarColor: '#65B741',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: 'settings',
            tabBarColor: '#C1F2B0',
          }}
        />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
};

// export const MobileBottomTabs = ({ bottomTabs, activeTab, setActiveTab }) => {
//   return (
//     <Box style={styles.bottomTabs}>
//       <HStack
//         alignContent="center"
//         bottom={0}
//         justifyContent="space-evenly"
//         w="100%"
//         sx={{
//           '@md': { display: 'none' },
//         }}>
//         {bottomTabs.map(tab => {
//           return (
//             <Pressable
//               style={[
//                 styles.pressable,
//                 {
//                   backgroundColor:
//                     (activeTab === 'Home' && tab.label === 'Home') ||
//                     (activeTab === 'Settings' && tab.label === 'Settings')
//                       ? '#65B741'
//                       : '#C1F2B0',
//                 },
//               ]}
//               pt="$2"
//               key={tab.label}
//               onPress={() => {
//                 if (tab.label !== 'Home') {
//                   setActiveTab(tab.label);
//                 }
//                 if (tab.label !== 'Settings') {
//                   setActiveTab(tab.label);
//                 }
//               }}
//               // bg={
//               //   (activeTab === 'Home' && tab.label === 'Home') ||
//               //   (activeTab === 'Settings' && tab.label === 'Settings')
//               //     ? '#9BB8CD'
//               //     : '$primary100'
//               // }
//               disabled={tab.disabled}
//               opacity={tab.disabled ? 0.5 : 1}>
//               <VStack alignItems="center">
//                 <Icon
//                   as={tab.icon}
//                   color={
//                     activeTab === tab.label ? '$textDark900' : '$textLight400'
//                   }
//                   size={25}
//                 />
//                 <Text
//                   size="xs"
//                   color={
//                     activeTab === tab.label ? '$textLight900' : '$textLight400'
//                   }
//                   sx={{
//                     _dark: {
//                       color:
//                         activeTab === tab.label
//                           ? '$textDark100'
//                           : '$textLight400',
//                     },
//                   }}>
//                   {tab.label}
//                 </Text>
//               </VStack>
//             </Pressable>
//           );
//         })}
//       </HStack>
//     </Box>
//   );
// };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  vstack: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  bottomTabs: {
    backgroundColor: '#F0F3F7',
  },
  pressable: {
    flex: 0.5,
  },
});
