import LocationService from "../LocationService"

describe("locationService", () => {
    test('should return latitude & longitude from current location', async () => {
        const position = await LocationService.getCurrentLocation()
        expect(position).toEqual({ latitude: 0, longitude: 0 })
    })
})