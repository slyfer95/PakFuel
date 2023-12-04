import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MobileBottomTabs } from '../MobileBottomTabs';
import { EmployeeHome } from '../EmployeeScreens/EmployeeHome';
import { SettingsPage } from '../SettingsPage';

import { Box } from '@gluestack-ui/themed';
import { Home, Settings } from 'lucide-react-native';

export const Employee = ({ navigation }) => {
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
        <EmployeeHome isActive={activeTab === 'Home'} navigation={navigation} />
        <SettingsPage
          navigation={navigation}
          isActive={activeTab === 'Settings'}
        />
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
