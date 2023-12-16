import React from 'react';
import { useAuth, useCurrentUser } from 'src/contexts/AuthProvider';
import { StyleSheet, RefreshControl } from 'react-native';

import {
  Box,
  Text,
  Heading,
  HStack,
  Icon,
  Pressable,
  VStack,
} from '@gluestack-ui/themed';
import {
  UserCheck,
  UserPlus,
  UserX,
  Plus,
  Pencil,
  Home,
  Settings,
  Trash,
  X,
} from 'lucide-react-native';

export const AdminHome = ({ isActive, navigation }) => {
  const user = useCurrentUser();
  return (
    <Box style={[{ display: isActive ? 'flex' : 'none' }, styles.container]}>
      <Heading>Hello {user.first_name}!</Heading>
      <Text>Welcome to Admin's Home Screen</Text>
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
    marginBottom: '2%',
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
