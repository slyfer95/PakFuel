import React from 'react';
import { useCurrentUser } from 'src/contexts/AuthProvider';
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { Scanner } from 'src/screens/app/EmployeeScreens/Scanner';

import {
  Box,
  Text,
  Heading,
  Icon,
  Center,
  Pressable,
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
        flex: 1,
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
          <Pressable onPress={openScanner}>
            <Box
              py="$3"
              mt="$3"
              alignItems="center"
              w="$72"
              style={{ borderRadius: 50, backgroundColor: '#0077E6' }}>
              <ButtonText fontSize={18} fontWeight="bold">
                Start Scanning
              </ButtonText>
            </Box>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate('Transaction History');
            }}>
            <Box
              py="$3"
              mt="$3"
              alignItems="center"
              w="$72"
              style={{ borderRadius: 50, backgroundColor: '#10b981' }}>
              <ButtonText fontSize={18} fontWeight="bold">
                Transactions History
              </ButtonText>
            </Box>
          </Pressable>
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
    marginTop: '30%',
  },
});
