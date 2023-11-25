import React from 'react';

import { Box, Text, HStack, VStack, FlatList } from '@gluestack-ui/themed';

export const FlatListAuthorized = ({ data }) => {
  return (
    <Box w="100%" px="$5">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="$1"
            w="100%"
            borderColor="$trueGray800"
            py="$2">
            <HStack space="md" justifyContent="space-between">
              <VStack>
                <Text color="$coolGray800" fontWeight="$bold">
                  {item.first_name}
                </Text>
                <Text color="$coolGray600">{item.cnic}</Text>
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};
