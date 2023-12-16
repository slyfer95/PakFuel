import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  VStack,
  Button,
  ButtonText,
  Avatar,
  AvatarFallbackText,
  Divider,
  Heading,
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@gluestack-ui/themed';

export const EmployeeManagement = ({ route }) => {
  const { item } = route.params;
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showAuthorityModal, setShowAuthorityModal] = React.useState(false);
  const ref = React.useRef(null);

  const authorityButtons = () => {
    return item.authorized === true ? (
      <Button
        mt="$5"
        variant="outline"
        action="negative"
        onPress={() => setShowAuthorityModal(true)}>
        <ButtonText>Unauthorize this User</ButtonText>
      </Button>
    ) : (
      <Button
        mt="$5"
        variant="outline"
        action="positive"
        onPress={() => setShowAuthorityModal(true)}>
        <ButtonText>Authorize this User</ButtonText>
      </Button>
    );
  };

  return (
    <VStack style={styles.container}>
      <Avatar bgColor="$tertiary500" mt="$5" size="2xl" borderRadius="$full">
        <AvatarFallbackText>{item.first_name}</AvatarFallbackText>
      </Avatar>
      <Box w="100%" px="$5" mt="$5">
        <Heading color="$textDark800" mt="$3">
          {item.first_name} {item.last_name}
        </Heading>
        <Divider mt="$2" />
        <Text style={{ fontSize: 20 }} color="$textDark800" mt="$3">
          {item.cnic}
        </Text>
        <Divider mt="$2" />
        <Text style={{ fontSize: 20 }} color="$textDark800" mt="$3">
          {item.email}
        </Text>
        <Divider mt="$2" />
        {authorityButtons()}
        <Divider mt="$2" />
        <Button
          mt="$5"
          variant="solid"
          action="negative"
          onPress={() => setShowDeleteModal(true)}>
          <ButtonText>Delete this User</ButtonText>
        </Button>
        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
          }}
          finalFocusRef={ref}>
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg">Delete Employee</Heading>
            </ModalHeader>
            <ModalBody>
              <Text>Are you sure you want to delete {item.first_name}?</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                size="sm"
                action="secondary"
                mr="$3"
                onPress={() => {
                  setShowDeleteModal(false);
                }}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                size="sm"
                action="negative"
                borderWidth="$0"
                onPress={() => {
                  setShowDeleteModal(false);
                }}>
                <ButtonText>Delete</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={showAuthorityModal}
          onClose={() => {
            setShowAuthorityModal(false);
          }}
          finalFocusRef={ref}>
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg">
                {item.authorized === true
                  ? 'Unauthorize Employee'
                  : 'Authorize Employee'}
              </Heading>
            </ModalHeader>
            <ModalBody>
              <Text>
                Are you sure you want to{' '}
                {item.authorized === true ? 'unauthorize ' : 'authorize '}
                {item.first_name}?
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                size="sm"
                action="secondary"
                mr="$3"
                onPress={() => {
                  setShowAuthorityModal(false);
                }}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                size="sm"
                action={item.authorized === true ? 'negative' : 'positive'}
                borderWidth="$0"
                onPress={() => {
                  setShowAuthorityModal(false);
                }}>
                <ButtonText>
                  {item.authorized === true ? 'Unauthorize' : 'Authorize'}
                </ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});
