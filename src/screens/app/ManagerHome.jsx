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

export const ManagerHome = ({ isActive, navigation }) => {
  const user = useCurrentUser();
  return (
    <Box style={[{ display: isActive ? 'flex' : 'none' }, styles.container]}>
      <Heading>Hello {user.first_name}!</Heading>
      <Text>Welcome to Manager's Home Screen</Text>
      <VStack style={styles.vstack}>
        <HStack style={styles.hstack} reversed={false}>
          <Pressable
            style={styles.pressable}
            bg="$primary500"
            onPress={() => {
              console.log(`Clicked ${navigation}`);
              navigation.navigate('AuthorizedEmployee');
            }}>
            <Icon as={UserCheck} size={35} />
            <Text size={'sm'}>Authorized Employees</Text>
          </Pressable>
          <Pressable
            style={styles.pressable}
            bg="$primary500"
            onPress={() => {}}>
            <Icon as={UserPlus} size={35} />
            <Text size={'sm'}>Authorize New Employees</Text>
          </Pressable>
          <Pressable
            style={styles.pressable}
            bg="$primary500"
            onPress={() => {}}>
            <Icon as={UserX} size={35} />
            <Text size={'sm'}>Delete Employee</Text>
          </Pressable>
        </HStack>
        <HStack style={styles.hstack} reversed={false}>
          <Pressable
            style={styles.pressable}
            bg="$primary500"
            onPress={() => {}}>
            <Icon as={Plus} size={35} />
            <Text size={'sm'}>Add Loyalty Program</Text>
          </Pressable>
          <Pressable
            style={styles.pressable}
            bg="$primary500"
            onPress={() => {}}>
            <Icon as={Pencil} size={35} />
            <Text size={'sm'}>Update Loyalty Program</Text>
          </Pressable>
          <Pressable
            style={styles.pressable}
            bg="$primary500"
            onPress={() => {}}>
            <Icon as={Trash} size={35} />
            <Text size={'sm'}>Delete Loyalty Program</Text>
          </Pressable>
        </HStack>
      </VStack>
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
    // backgroundColor: 'hotpink',
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
