import { View } from "react-native"
import WeatherCurrent from "../../components/WeatherCurrent"
import HomeScreen from "../HomeScreen"
import { render } from '@testing-library/react-native'
import WeatherCoordinates from "../../components/WeatherCoordinates"

jest.mock('../../components/WeatherCoordinates.tsx', () => jest.fn().mockReturnValue(null))
jest.mock('../../components/WeatherCurrent.tsx', () => jest.fn().mockReturnValue(null))

describe('HomeScreen', () => {
    test('Should render correctly', () => {
        const wrapper = render(<HomeScreen />)
        wrapper.getByTestId('home-screen')
    })

    describe('Title section', () => {
        beforeEach(() => {
            jest.useFakeTimers();
            jest.setSystemTime(946684800000) // Saturday, 01 January 20000 00:00 UTC
        })
        afterEach(() => {
            jest.useRealTimers();
        })

        test("Should contain current date", () => {
            const wrapper = render(<HomeScreen />)
            wrapper.getByText('Jan 01, 2000')
        })

        test("Should contain the day of the week", () => {
            const wrapper = render(<HomeScreen />)
            wrapper.getByText('Saturday')
        })

    })

    test("Should contain a section to get current weather", () => {
        (WeatherCurrent as jest.Mock).mockReturnValue(
            <View testID="mock-weather-current" />
        )
        const wrapper = render(<HomeScreen />);
        wrapper.getByTestId('mock-weather-current')
    })

    test("Should contain a divider", () => {
        const wrapper = render(<HomeScreen />);
        wrapper.getByTestId("hone-screen-divider")
    } ) 

    test("Should contain a section to get weather at given latitude and longitude", () => {
        (WeatherCoordinates as jest.Mock).mockReturnValue(
            <View testID="mock-weather-coordinates" />
        )
        const wrapper = render(<HomeScreen />);
        wrapper.getByTestId('mock-weather-coordinates')
    })
})