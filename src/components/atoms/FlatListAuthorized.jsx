import React from 'react';

import { Box, Text, HStack, FlatList } from '@gluestack-ui/themed';

export const FlatListAuthorized = ({ data }) => {
  return (
    <FlatList
      data={data}
      w="95%"
      renderItem={({ item }) => (
        <Box borderBottomWidth="$1" w="100%" borderColor="$trueGray800" py="$2">
          <HStack space="md" justifyContent="space-between">
            <Text color="$coolGray800" fontWeight="$bold" p="$5">
              {item.first_name}
            </Text>
            <Text color="$coolGray800" fontWeight="$bold" p="$5">
              {item.cnic}
            </Text>
          </HStack>
        </Box>
      )}
      keyExtractor={item => item.id}
    />
  );
};
