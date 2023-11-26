import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import {
  Box,
  Button,
  ButtonText,
  Text,
  Icon,
  Pressable,
} from '@gluestack-ui/themed';
import { ScanLine } from 'lucide-react-native';

export const Scanner = ({ isActive }) => {
  const [loading, setLoading] = React.useState(true);
  const [startScanning, setStartScanning] = React.useState(isActive);
  const [scanData, setScanData] = React.useState(null);
  const [permission, setPermission] = React.useState(true);

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
    if (scanData) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>{scanData}</Text>
          <Button
            size="md"
            w="$72"
            mt="$5"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => {
              setScanData(undefined);
            }}>
            <ButtonText>Scan Again</ButtonText>
          </Button>
        </View>
      );
    }

    if (permission && startScanning) {
      return (
        <BarCodeScanner
          style={styles.container}
          onBarCodeScanned={({ type, data }) => {
            try {
              console.log(type);
              console.log(data);
              setScanData(data);
            } catch (error) {
              console.log(error);
            }
          }}></BarCodeScanner>
      );
    }

    if (permission && !startScanning) {
      return (
        <Pressable
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onPress={() => {
            setStartScanning(true);
          }}>
          <Icon as={ScanLine} size={200} />
          <Button
            size="md"
            w="$72"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => {
              setStartScanning(true);
            }}>
            <ButtonText>Scan QR Code</ButtonText>
          </Button>
        </Pressable>
      );
    } else {
      return <Text>User is not Authorized Yet!</Text>;
    }
  };

  return <Box style={styles.container}>{ScannerFragment()}</Box>;
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
