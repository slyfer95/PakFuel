import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import {
  Box,
  Text,
  Icon,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalFooter,
  ModalBody,
  Heading,
  ButtonText,
  ModalHeader,
  Button,
} from '@gluestack-ui/themed';
import { Scan } from 'lucide-react-native';

export const Scanner = () => {
  const [loading, setLoading] = React.useState(true);
  const [scanData, setScanData] = React.useState(null);
  const [permission, setPermission] = React.useState(true);
  const [confirmation, setConfirmation] = React.useState(undefined);
  const [showModal, setShowModal] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status, granted } =
        await BarCodeScanner.requestPermissionsAsync();
      console.log(`Status: ${status}, Granted: ${granted}`);
      if (status === 'granted') {
        console.log(`Access Granted`);
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (error) {
      console.log(error);
      setPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const ScannerFragment = () => {
    if (loading)
      return (
        <Text alignContent="center">Requesting for camera permission</Text>
      );
    if (confirmation) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>{confirmation}</Text>
          <Button
            size="md"
            w="$72"
            mt="$5"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => {
              setConfirmation(undefined);
              setScanData(undefined);
            }}>
            <ButtonText>Scan Again</ButtonText>
          </Button>
        </View>
      );
    }

    if (permission) {
      return (
        <>
          <Text>Place the QR Code within this Marker.</Text>
          <BarCodeScanner
            style={styles.container}
            onBarCodeScanned={({ type, data }) => {
              try {
                console.log(type);
                console.log(data);
                setShowModal(true);
                setScanData(data);
              } catch (error) {
                console.log(error);
              }
            }}>
            <Icon as={Scan} size={250} />
          </BarCodeScanner>
        </>
      );
    } else {
      return <Text>User is not Authorized Yet!</Text>;
    }
  };

  return (
    <Box style={styles.container}>
      {ScannerFragment()}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Confirm Transaction</Heading>
          </ModalHeader>
          <ModalBody>
            <Text>Confirm this transaction.</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setConfirmation('Transaction Cancelled.');
                setShowModal(false);
              }}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                setConfirmation('Transaction Confirmed.');
                setShowModal(false);
              }}>
              <ButtonText>Confirm</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    marginLeft: '4%',
  },
  scan: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
