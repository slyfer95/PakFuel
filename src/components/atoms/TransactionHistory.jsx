import React from 'react';
import { StyleSheet } from 'react-native';
import { useCurrentUser } from 'src/contexts/AuthProvider';
import { supabase } from 'src/services/supabaseClient';
import {
  Box,
  Spinner,
  FlatList,
  HStack,
  Pressable,
  Heading,
  Image,
  Button,
  ButtonText,
  Divider,
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@gluestack-ui/themed';

export const TransactionHistory = () => {
  const [error, setError] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const user = useCurrentUser();
  const [transactionList, setTransactionList] = React.useState(null);
  const [showReceipt, setShowReceipt] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    user.role === 'employee'
      ? getTransactionsForRefueler()
      : getTransactionsForManager();
  }, []);

  const getTransactionsForRefueler = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('refueler_id', user.id);
    if (error) {
      setError(true);
    } else {
      setTransactionList(data);
    }
  };

  const getTransactionsForManager = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('firm', user.firm);
    if (error) {
      setLoading(false);
      setError(true);
    } else {
      setLoading(false);
      setTransactionList(data);
    }
  };
  const FragmentedScreen = () => {
    if (error) {
      return <Text>Database Error!</Text>;
    }
    if (loading) {
      return <Spinner mt="$5" size="large" />;
    }
    if (transactionList) {
      return (
        <FlatList
          data={transactionList}
          w="95%"
          renderItem={({ item }) => (
            <>
              <Pressable
                style={{ alignItems: 'center' }}
                onPress={() => {
                  setShowReceipt(true);
                }}
                w="100%"
                borderColor="$trueGray800"
                py="$2"
                px="$4">
                <Box w="100%">
                  <HStack
                    space="md"
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <VStack>
                      <Heading color="$textDark700" fontWeight="$bold">
                        {item.customer}
                      </Heading>
                      <Text>
                        {user.role === 'manager'
                          ? item.refueler
                          : item.created_at}
                      </Text>
                    </VStack>
                    <Text color="$textDark900" fontSize={20}>
                      {item.amount}
                    </Text>
                  </HStack>
                </Box>
                <Divider mt="$2" />
              </Pressable>

              <Modal
                isOpen={showReceipt}
                onClose={() => {
                  setShowReceipt(false);
                }}
                finalFocusRef={ref}>
                <ModalBackdrop />
                <ModalContent>
                  <ModalHeader>
                    <Heading size="lg">Receipt</Heading>
                  </ModalHeader>
                  <ModalBody>
                    <Image
                      alt="Receipt"
                      source={require('src/assets/receipt.jpg')}
                      size="2xl"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      action="secondary"
                      mr="$3"
                      onPress={() => {
                        setShowReceipt(false);
                      }}>
                      <ButtonText>Close</ButtonText>
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
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
