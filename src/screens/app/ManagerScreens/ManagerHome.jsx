import React from 'react';
import { useAuth, useCurrentUser } from 'src/contexts/AuthProvider';
import { StyleSheet, Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Carousel from 'react-native-snap-carousel';
import {
  Box,
  Text,
  Heading,
  HStack,
  Icon,
  Pressable,
  Image,
  Divider,
  VStack,
} from '@gluestack-ui/themed';
import { User, Coins } from 'lucide-react-native';

export const ManagerHome = ({ navigation }) => {
  const slides = [0, 1];
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderItem = ({ item, index }) =>
    item === 1 ? (
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
        <Heading>Employee Management</Heading>
        <Divider />
        <Icon as={User} size={85} />
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
        <Heading>Loyalty Programs</Heading>
        <Divider />
        <Icon as={Coins} size={85} />
      </Pressable>
    );

  const user = useCurrentUser();
  const ptData = [
    { value: 160, date: '1 Apr 2022' },
    { value: 180, date: '2 Apr 2022' },
    { value: 190, date: '3 Apr 2022' },
    { value: 180, date: '4 Apr 2022' },
    { value: 140, date: '5 Apr 2022' },
    { value: 145, date: '6 Apr 2022' },
    { value: 160, date: '7 Apr 2022' },
    { value: 200, date: '8 Apr 2022' },
    { value: 220, date: '9 Apr 2022' },
    {
      value: 240,
      date: '10 Apr 2022',
      label: 'April',
      labelTextStyle: { color: 'lightgray', width: 60 },
    },
    { value: 280, date: '11 Apr 2022' },
    { value: 260, date: '12 Apr 2022' },
    { value: 340, date: '13 Apr 2022' },
    { value: 385, date: '14 Apr 2022' },
    { value: 280, date: '15 Apr 2022' },
    { value: 390, date: '16 Apr 2022' },

    { value: 370, date: '17 Apr 2022' },
    { value: 285, date: '18 Apr 2022' },
    { value: 295, date: '19 Apr 2022' },
    {
      value: 300,
      date: '20 Apr 2022',
      label: 'May',
      labelTextStyle: { color: 'lightgray', width: 60 },
    },
    { value: 280, date: '21 Apr 2022' },
    { value: 295, date: '22 Apr 2022' },
    { value: 260, date: '23 Apr 2022' },
    { value: 255, date: '24 Apr 2022' },

    { value: 190, date: '25 Apr 2022' },
    { value: 220, date: '26 Apr 2022' },
    { value: 205, date: '27 Apr 2022' },
    { value: 230, date: '28 Apr 2022' },
    { value: 210, date: '29 Apr 2022' },
    {
      value: 200,
      date: '30 Apr 2022',
      label: 'June',
      labelTextStyle: { color: 'lightgray', width: 60 },
    },
    { value: 240, date: '1 May 2022' },
    { value: 250, date: '2 May 2022' },
    { value: 280, date: '3 May 2022' },
    { value: 250, date: '4 May 2022' },
    { value: 210, date: '5 May 2022' },
  ];

  return (
    <Box style={styles.container}>
      <Heading>Hello {user.first_name}!</Heading>
      <Text>Welcome to Manager's Home Screen</Text>
      <VStack style={styles.vstack}>
        <Pressable
          onLongPress={() => {
            navigation.navigate('Transaction History');
          }}>
          <LineChart
            areaChart
            data={ptData}
            rotateLabel
            width={300}
            hideDataPoints
            spacing={10}
            color="#00ff83"
            thickness={2}
            startFillColor="rgba(20,105,81,0.3)"
            endFillColor="rgba(20,85,81,0.01)"
            startOpacity={0.9}
            endOpacity={0.2}
            initialSpacing={0}
            noOfSections={6}
            maxValue={600}
            yAxisColor="white"
            yAxisThickness={0}
            rulesType="solid"
            rulesColor="gray"
            yAxisTextStyle={{ color: 'gray' }}
            yAxisSide="right"
            xAxisColor="lightgray"
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
            inactiveSlideScale={0.7}
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
