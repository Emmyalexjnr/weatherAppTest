import HomeScreen from "../HomeScreen"
import { render } from '@testing-library/react-native'

describe('HomeScreen', () => {
    test('Should render correctly', () => {
        const wrapper = render(<HomeScreen />)
        wrapper.getByTestId('home-screen')
    })
})