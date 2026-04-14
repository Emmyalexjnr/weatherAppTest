import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import LocationService from '../services/LocationService';
import Button from './Button';
import { RootStackParamList } from '../screens';
import { StackNavigationProp } from '@react-navigation/stack';

export default function WeatherCurrent() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleFetchWeather = useCallback(async () => {
    const position = await LocationService.getCurrentLocation();
    navigation.navigate('Weather', position);
  }, [navigation])
  return (
    <Button testID='weather-current' label='' onPress={handleFetchWeather} />
  )
}