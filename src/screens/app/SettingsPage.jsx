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
  Pressable,
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
        alignItems: 'center',
        paddingTop: '5%',
        width: '100%',
        flex: 1,
      }}>
      <Box style={styles.card}>
        <Text style={styles.text}>Update Profile </Text>
        <Divider bg="$black" my="$2" />
        <Icon as={Pencil} size={30} />
        <Pressable onPress={handleUpdate}>
          <Box
            py="$3"
            mt="$3"
            alignItems="center"
            w="$72"
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#0077E6',
            }}>
            <ButtonText fontSize={18} color="$primary500" fontWeight="bold">
              Update
            </ButtonText>
          </Box>
        </Pressable>
      </Box>
      <Box style={styles.card}>
        <Text style={styles.text}>Delete Profile</Text>
        <Divider bg="$black" my="$2" />
        <Icon as={UserX} size={35} />
        <Pressable onPress={handleDelete}>
          <Box
            py="$3"
            mt="$3"
            alignItems="center"
            w="$72"
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#E63535',
            }}>
            <ButtonText fontSize={18} color="$error500" fontWeight="bold">
              Delete
            </ButtonText>
          </Box>
        </Pressable>
      </Box>

      <Pressable onPress={logout}>
        <Box
          py="$3"
          mt="$3"
          alignItems="center"
          w="$72"
          style={{ borderRadius: 50, backgroundColor: '#0077E6' }}>
          <ButtonText fontSize={18} fontWeight="bold">
            Logout
          </ButtonText>
        </Box>
      </Pressable>
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 0.3,
    alignItems: 'center',
    paddingTop: '3%',
    width: '100%',
    marginBottom: '2%',
    backgroundColor: 'rgba(150, 174, 190, 0.2)',
  },
  text: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    fontWeight: 'bold',
    color: '#000',
  },
});
