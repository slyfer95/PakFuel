import React from 'react';
import { MobileBottomTabs } from '../MobileBottomTabs';
// import { useCurrentUser } from 'src/contexts/AuthProvider';
import { SettingsPage } from '../SettingsPage';
import { ManagerHome } from '../ManagerScreens/ManagerHome';
import { StyleSheet } from 'react-native';
import { Box } from '@gluestack-ui/themed';
import { Home, Settings } from 'lucide-react-native';

export const Manager = ({ navigation }) => {
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

  const [activeTab, setActiveTab] = React.useState('Home');

  return (
    <Box style={styles.container}>
      <ManagerHome navigation={navigation} isActive={activeTab === 'Home'} />
      <SettingsPage
        navigation={navigation}
        isActive={activeTab === 'Settings'}
      />
      <MobileBottomTabs
        bottomTabs={bottomTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  vstack: {
    marginTop: '5%',
    flex: 1,
    width: '100%',
  },
  hstack: {
    width: '100%',
  },
  pressable: {
    flex: 0.3,
    padding: '2%',
    margin: '0.5%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
