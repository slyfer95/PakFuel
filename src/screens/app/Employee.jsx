import React from 'react';
import { useAuth, useCurrentUser } from 'src/contexts/AuthProvider';
import { StyleSheet, View } from 'react-native';
import { MobileBottomTabs } from './MobileBottomTabs';
import { EmployeeHome } from './EmployeeHome';
import { SettingsPage } from './SettingsPage';

import {
  Box,
  Button,
  ButtonText,
  ScrollView,
  Text,
  Heading,
  HStack,
  Icon,
  Pressable,
  VStack,
} from '@gluestack-ui/themed';
import { ScanLine, Home, Settings } from 'lucide-react-native';

export const Employee = ({ navigation }) => {
  const user = useCurrentUser();

  const [activeTab, setActiveTab] = React.useState('Home');

  const bottomTabs = [
    {
      icon: Home,
      label: 'Home',
    },
    {
      icon: Settings,
      label: 'Settings',
    },
  ];
  return (
    <Box style={styles.container}>
      <Box style={styles.scan}>
        <EmployeeHome isActive={activeTab === 'Home'} />
        <SettingsPage isActive={activeTab === 'Settings'} />
      </Box>
      <MobileBottomTabs
        activeTab={activeTab}
        bottomTabs={bottomTabs}
        setActiveTab={setActiveTab}
      />
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
