import React from 'react';

import {
  Text,
  HStack,
  FlatList,
  Avatar,
  AvatarFallbackText,
  Pressable,
  Badge,
  BadgeText,
} from '@gluestack-ui/themed';

export const FlatListAuthorized = ({ data, navigation }) => {
  return (
    <FlatList
      data={data}
      w="100%"
      renderItem={({ item }) => (
        <Pressable
          style={{ alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('Employee Management', { item });
          }}
          w="100%"
          borderColor="$trueGray800"
          py="$2"
          px="$4">
          <HStack w="100%">
            <Avatar bgColor="$tertiary500" size="md" borderRadius="$full">
              <AvatarFallbackText>{item.first_name}</AvatarFallbackText>
            </Avatar>
            <HStack space="md" justifyContent="space-between">
              <Text color="$coolGray800" fontWeight="$bold" p="$5">
                {item.first_name}
              </Text>
              <Text color="$coolGray800" fontWeight="$bold" p="$5">
                <Badge
                  size="lg"
                  variant="solid"
                  action={item.authorized === true ? 'success' : 'error'}
                  ml="$1">
                  <BadgeText>
                    {item.authorized === true ? 'Authorized' : 'Unauthorized'}
                  </BadgeText>
                </Badge>
              </Text>
            </HStack>
          </HStack>
        </Pressable>
      )}
      keyExtractor={item => item.id}
    />
  );
};
