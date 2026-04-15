import { act, fireEvent, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react-native"
import WeatherCurrent from "../WeatherCurrent"
import { useNavigation } from "@react-navigation/native"
import LocationService from "../../services/LocationService"
import { Colors } from "../../constants"

jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual<object>('@react-navigation/native'),
        useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() })
    }
})

describe('WeatherCurrent', () => {
    test('Should render correctly', () => {
        const wrapper = render(<WeatherCurrent />)
        wrapper.getByTestId('weather-current')
    })
    test("Should render label", () => {
        const wrapper = render(<WeatherCurrent />)
        wrapper.getByText("Weather at my position")

    })

    test("Should navigate to weather screen with location", async () => {
        // throw new Error("Not implemented")
        const mockNavigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValueOnce({ navigate: mockNavigate })
        const wrapper = render(<WeatherCurrent />)
        const button = wrapper.getByTestId('weather-current');
        fireEvent.press(button)

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('Weather', {
                latitude: 0,
                longitude: 0
            })
        })

    })

    describe('Loader', () => {
        test("Should be rendered when position is being fetched", async () => {
            let mockResolve: (position: { latitude: number, longitude: number }) => void;

            jest.spyOn(LocationService, 'getCurrentLocation').mockImplementationOnce(() => {
                return new Promise((resolve) => {
                    mockResolve = resolve
                })
            })

            const wrapper = render(<WeatherCurrent />);
            const button = wrapper.getByTestId('weather-current');
            fireEvent.press(button);

            await expect(wrapper.findAllByTestId('button-loading')).resolves.toBeDefined();

            await act(async () => {
                await mockResolve({ latitude: 0, longitude: 0 })
            })

        })

        test("Should not be rendered when position has been fetched", () => {
            const wrapper = render(<WeatherCurrent />)
            const button = wrapper.getByTestId('weather-current');
            fireEvent.press(button);

            // return expect(wrapper.findByTestId('button-loading')).rejects.toThrow();
            return waitForElementToBeRemoved(() => wrapper.getByTestId('button-loading'));

        })

        test("Should not be rendered when fetching position has failed", () => {
            jest.spyOn(LocationService, 'getCurrentLocation').mockRejectedValueOnce(new Error(""));
            const wrapper = render(<WeatherCurrent />);
            const button = wrapper.getByTestId('weather-current');
            fireEvent.press(button);

            // return expect(wrapper.findByTestId('button-loading')).rejects.toThrow();
            return waitForElementToBeRemoved(() => wrapper.getByTestId('button-loading'));

        })
    })

    describe('Error', () => {
        test("Should be displayed after fetching position has failed", async () => {
            jest.spyOn(LocationService, 'getCurrentLocation').mockRejectedValueOnce(new Error(""));

            const wrapper = render(<WeatherCurrent />);
            const button = wrapper.getByTestId('weather-current');
            fireEvent.press(button);

            await waitFor(() => {
                expect(button).toHaveStyle({ borderColor: Colors.ERROR })
            })

        })
        test("Should be reset after fetching position again", async () => {
            jest.spyOn(LocationService, 'getCurrentLocation').mockRejectedValueOnce(new Error(""))

            const wrapper = render(<WeatherCurrent />);
            const button = wrapper.getByTestId('weather-current');
            fireEvent.press(button);

            await waitFor(() => {
                fireEvent.press(button)
                expect(button).not.toHaveStyle({ borderColor: Colors.ERROR })
            })

        })
    })
})