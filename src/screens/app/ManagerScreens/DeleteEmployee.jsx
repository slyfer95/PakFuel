import React from 'react';
import { StyleSheet } from 'react-native';
import { useCurrentUser } from 'src/contexts/AuthProvider';
import { supabase } from 'src/services/supabaseClient';
import {
  Box,
  Text,
  Spinner,
  FlatList,
  HStack,
  Icon,
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalBody,
  Heading,
  ButtonText,
  ModalHeader,
  ModalOverlay,
  Button,
  Pressable,
} from '@gluestack-ui/themed';
import { Trash2, CloseIcon } from 'lucide-react-native';

export const DeleteEmployee = () => {
  const user = useCurrentUser();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [authorizeEmployeeList, setAuthorizeEmployeeList] =
    React.useState(null);
  React.useEffect(() => {
    getAuthorizeEmployees();
  }, []);

  const [showModal, setShowModal] = React.useState(false);
  const ref = React.useRef(null);

  const getAuthorizeEmployees = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('firm', user.firm)
      .eq('authorized', 'true');

    if (error) {
      setLoading(false);
      setError(true);
    } else {
      setLoading(false);
      setAuthorizeEmployeeList(data);
    }
  };
  const FragmentedScreen = () => {
    if (error) {
      return <Text>Database Error!</Text>;
    }
    if (loading) {
      return <Spinner mt="$5" size="large" />;
    }
    if (authorizeEmployeeList) {
      return (
        <FlatList
          data={authorizeEmployeeList}
          w="95%"
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="$1"
              w="100%"
              borderColor="$trueGray800"
              py="$2">
              <HStack space="md" justifyContent="space-between">
                <Text color="$coolGray800" fontWeight="$bold" p="$5">
                  {item.first_name}
                </Text>
                <Pressable onPress={() => setShowModal(true)} p="$5">
                  <Icon as={Trash2} size="xl" />
                </Pressable>
              </HStack>
              <Modal
                isOpen={showModal}
                onClose={() => {
                  setShowModal(false);
                }}
                finalFocusRef={ref}>
                <ModalBackdrop />
                <ModalContent>
                  <ModalHeader>
                    <Heading size="lg">Delete Employee</Heading>
                  </ModalHeader>
                  <ModalBody>
                    <Text>
                      Are you sure you want to delete {item.first_name}?
                    </Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      action="secondary"
                      mr="$3"
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                      size="sm"
                      action="negative"
                      borderWidth="$0"
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      <ButtonText>Delete</ButtonText>
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      );
    }
  };

  return <Box style={styles.container}>{FragmentedScreen()}</Box>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});
