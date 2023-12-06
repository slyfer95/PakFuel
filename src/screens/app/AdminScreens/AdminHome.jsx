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
      <VStack style={styles.vstack}>
        <Box
          style={{
            alignSelf: 'center',
            borderWidth: 3,
            borderRadius: 20,
            justifyContent: 'flex-start',
            marginBottom: '3%',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 24,
              marginTop: '5%',
              marginBottom: '5%',
            }}>
            Employee Management
          </Text>
          <HStack style={styles.hstack} reversed={false}>
            <Pressable
              style={styles.pressable}
              onPress={() => {
                navigation.navigate('AuthorizedEmployee');
              }}>
              <Icon as={UserCheck} size={35} />
              <Text size={'sm'}>Authorized Employees</Text>
            </Pressable>
            <Pressable
              style={styles.pressable}
              onPress={() => {
                navigation.navigate('AuthorizeNewEmployees');
              }}>
              <Icon as={UserPlus} size={35} />
              <Text size={'sm'}>Authorize New Employees</Text>
            </Pressable>
            <Pressable
              style={styles.pressable}
              onPress={() => {
                navigation.navigate('DeleteEmployee');
              }}>
              <Icon as={UserX} size={35} />
              <Text size={'sm'}>Delete Employee</Text>
            </Pressable>
          </HStack>
        </Box>
        <Box
          style={{
            alignSelf: 'center',
            borderWidth: 3,
            borderRadius: 20,
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: '5%',
              marginBottom: '5%',
            }}>
            Loyalty Program Management
          </Text>
          <HStack style={styles.hstack} reversed={false}>
            <Pressable style={styles.pressable} onPress={() => {}}>
              <Icon as={Plus} size={35} />
              <Text size={'sm'}>Add Loyalty Program</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={() => {}}>
              <Icon as={Pencil} size={35} />
              <Text size={'sm'}>Update Loyalty Program</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={() => {}}>
              <Icon as={Trash} size={35} />
              <Text size={'sm'}>Delete Loyalty Program</Text>
            </Pressable>
          </HStack>
        </Box>
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
