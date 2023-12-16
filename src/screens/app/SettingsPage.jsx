import React from 'react';
import { useAuth, useCurrentUser } from 'src/contexts/AuthProvider';
import { UpdateProfile } from 'src/screens/app/UpdateProfile';
import { StyleSheet, Alert } from 'react-native';

import {
  Box,
  Button,
  ButtonText,
  Text,
  Divider,
  Icon,
} from '@gluestack-ui/themed';
import { Pencil, UserX, Trash } from 'lucide-react-native';

export const SettingsPage = ({ isActive, navigation }) => {
  const { logout } = useAuth();
  const user = useCurrentUser();

  const handleDelete = () => {
    Alert.alert('Are you sure to delete?');
  };

  const handleUpdate = () => {
    navigation.navigate('UpdateProfile');
    // Alert.alert('Are you sure to update?');
  };

  return (
    <Box
      style={{
        display: isActive ? 'flex' : 'none',
        alignItems: 'center',
        width: '100%',
        flex: 1,
      }}>
      <Box style={styles.card}>
        <Text style={styles.text}>Update Profile </Text>
        <Divider bg="$black" my="$2" />
        <Icon as={Pencil} size="xl" />
        <Button
          size="md"
          w="$72"
          mt="$5"
          variant="solid"
          action="secondary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={handleUpdate}>
          <ButtonText>Update</ButtonText>
        </Button>
      </Box>
      <Box style={styles.card}>
        <Text style={styles.text}>Delete Profile</Text>
        <Divider bg="$black" my="$2" />
        <Icon as={UserX} size="xl" />
        <Button
          size="md"
          w="$72"
          mt="$5"
          variant="solid"
          action="negative"
          isDisabled={false}
          isFocusVisible={false}
          onPress={handleDelete}>
          <ButtonText>Delete</ButtonText>
        </Button>
      </Box>
      <Box style={styles.card}>
        <Text style={styles.text}>Sign Out</Text>
        <Divider bg="$black" my="$2" />
        <Button
          size="md"
          w="$72"
          mt="$5"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={logout}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 0.25,
    alignItems: 'center',
    padding: '3%',
    width: '95%',
    marginBottom: '2%',
    borderRadius: 10,
    backgroundColor: 'rgba(150, 174, 190, 1)',
  },
  text: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    fontWeight: 'bold',
    color: '#000',
  },
});
