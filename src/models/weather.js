
const validations = {};

validations.getWeatherData = {
    input: {
        latitude: { type: "string", required: true },
        longitude: { type: "string", required: true }
    },
    output: {
        success: { type: "boolean" },
        data: {
            currentWeatherState: { type: "string", optional: true },
            timeZone: { type: "string", optional: true },
            temperature: { type: "string", optional: true },
            feelsLike: { type: "string", optional: true },
            humidity: { type: "string", optional: true },
            isWindy: { type: "boolean", optional: true },
            visibilityCondition: { type: "string", optional: true }
        }
    }
}

module.exports = validations;
