import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../constants'
import moment from 'moment'
import WeatherCurrent from '../components/WeatherCurrent'
import WeatherCoordinates from '../components/WeatherCoordinates'


function formatDate(date: Date) {
    const today = date.getDate()
    const month = `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]}`
    return `${month} ${today < 10 ? '0' : ''}${today}, ${date.getFullYear()}`
}

export default function HomeScreen() {
    // const now = new Date()
    const now = moment(new Date())
    return (
        <LinearGradient colors={[Colors.LIGHT_GRAY, Colors.DARK_GRAY]}
            style={styles.container}
            testID='home-screen'
        >
            <View style={styles.title}>
                <Text style={styles.date}>{now.format('MMM DD, YYYY')}</Text>
                <Text style={styles.day}>{now.format('dddd')}</Text>
            </View>
            <WeatherCurrent />
            <Text style={styles.divider} testID="hone-screen-divider">
                Or
            </Text>
            <WeatherCoordinates />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40, alignContent: 'space-between', justifyContent: 'space-evenly',
    },
    title: {
        justifyContent: 'flex-end'
    },
    date: {
        color: Colors.GRAY,
        fontSize: 13,
    },
    day: {
        color: Colors.WHITE,
        fontSize: 21
    },
    divider: {
        color: Colors.WHITE,
        textAlign: 'center',
    }
})