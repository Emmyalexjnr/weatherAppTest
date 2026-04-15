import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LocationService from '../services/LocationService';
import Button from './Button';
import { RootStackParamList } from '../screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../constants';

export default function WeatherCurrent() {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleFetchWeather = useCallback(async () => {
    setError(false)
    setIsLoading(true);
    try {
      const position = await LocationService.getCurrentLocation();
      navigation.navigate('Weather', position);
    } catch (error) {
      setError(true)
      console.log(error)
    }
    setIsLoading(false);
  }, [navigation])

  return (
    <Button testID='weather-current' label='Weather at my position'
      loading={isLoading}
      onPress={handleFetchWeather}
      style={error && styles.error}
    />
  )
}

const styles = StyleSheet.create({
  error: {
    borderColor: Colors.ERROR, borderWidth: 1, borderRadius: 10
  }
})