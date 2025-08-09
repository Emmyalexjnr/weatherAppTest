import AppNavigator from "../screens"
jest.mock('../screens', () => jest.fn())
import App from '../App'
import { View } from 'react-native'
import { render } from '@testing-library/react-native'


describe('App', () => {
    test('Should render routes', () => {
        (AppNavigator as jest.Mock).mockReturnValueOnce(<View testID="mock-app-navigator" />)
        const wrapper = render(<App />)
        wrapper.getByTestId('mock-app-navigator')
    })
})