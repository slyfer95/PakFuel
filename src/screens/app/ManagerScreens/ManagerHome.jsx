import React from 'react';
import { useAuth, useCurrentUser } from 'src/contexts/AuthProvider';
import { StyleSheet, Dimensions, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  Box,
  Text,
  Heading,
  HStack,
  Icon,
  Pressable,
  Image,
  VStack,
} from '@gluestack-ui/themed';
import { User, Coins } from 'lucide-react-native';

export const ManagerHome = ({ navigation }) => {
  const slides = [0, 1];
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderItem = ({ item, index }) =>
    item === 0 ? (
      <Pressable
        style={{
          backgroundColor: '#C1F2B0',
          height: '65%',
          justifyContent: 'center',
          borderRadius: 25,
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Employee List');
        }}>
        <Icon as={User} size={85} />
        <Heading mt="$3">Employee Management</Heading>
      </Pressable>
    ) : (
      <Pressable
        style={{
          backgroundColor: '#C1F2B0',
          height: '65%',
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Loyalty Programs');
        }}>
        <Icon as={Coins} size={85} />
        <Heading mt="$3">Loyalty Programs</Heading>
      </Pressable>
    );

  const user = useCurrentUser();
  return (
    <Box style={styles.container}>
      <Heading>Hello {user.first_name}!</Heading>
      <Text>Welcome to Manager's Home Screen</Text>
      <VStack style={styles.vstack}>
        <Pressable
          onPress={() => {
            navigation.navigate('Transaction History');
          }}>
          <Image
            alt="Line Chart"
            m="$3"
            w="95%"
            size={'2xl'}
            source={require('src/assets/linechart.jpg')}
          />
        </Pressable>
        <Box alignItems="center" mt="$5" p="$5">
          <Carousel
            layout={'default'}
            ref={carousel => (this.carousel = carousel)}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width * 0.8}
            data={slides}
            renderItem={renderItem}
            onSnapToItem={index => setActiveSlide(index)}
            inactiveSlideScale={0.8}
            inactiveSlideOpacity={0.5}
            firstItemOffset={20}
            paginationDots={true}
          />
        </Box>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  vstack: {
    marginTop: '5%',
    flex: 1,
    width: '100%',
  },
  hstack: {
    marginBottom: '2%',
    width: '100%',
  },
  pressable: {
    flex: 0.3,
    padding: '2%',
    margin: '0.5%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  slide: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
