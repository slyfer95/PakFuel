import React from 'react';
import { useCurrentUser } from 'src/contexts/AuthProvider';
import { StyleSheet } from 'react-native';
import { Scanner } from 'src/screens/app/Scanner';

import { Box, Text, Heading } from '@gluestack-ui/themed';

export const EmployeeHome = ({ isActive }) => {
  const user = useCurrentUser();

  return (
    <Box style={{ display: isActive ? 'flex' : 'none' }}>
      <Box style={styles.welcome}>
        <Heading>Hello {user.first_name}!</Heading>
        <Text>Welcome to Employee's Home Screen</Text>
      </Box>
      <Box style={styles.scan}>
        <Scanner isActive={isActive} />
      </Box>
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
