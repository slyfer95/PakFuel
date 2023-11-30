import React from 'react';
import { useCurrentUser } from 'src/contexts/AuthProvider';
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { Scanner } from 'src/screens/app/Scanner';

import {
  Box,
  Text,
  Heading,
  Icon,
  Center,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { ScanLine } from 'lucide-react-native';

export const EmployeeHome = ({ isActive, navigation }) => {
  const user = useCurrentUser();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    updateUser();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const openScanner = () => {
    navigation.navigate('Scanner');
  };

  return (
    <Box
      style={{
        display: isActive ? 'flex' : 'none',
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Box style={styles.welcome}>
          <Heading>Hello {user.first_name}!</Heading>
          <Text>Welcome to Employee's Home Screen</Text>
        </Box>
        <Center style={styles.noscan}>
          <Icon as={ScanLine} size={250} />
          <Button
            size="md"
            mt="$10"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={openScanner}>
            <ButtonText>Start Scanning </ButtonText>
          </Button>
        </Center>
      </ScrollView>
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
  noscan: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
  },
});
