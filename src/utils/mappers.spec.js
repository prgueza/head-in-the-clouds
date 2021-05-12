import { townMapper, weatherMapper } from "./mappers";

const townModel = {
  label: expect.any(String),
  name: expect.any(String),
  county: expect.any(String),
  code: expect.any(String),
  countyCode: expect.any(String),
};

const weatherModel = {
  name: expect.any(String),
  date: expect.any(String),
  sky: expect.any(String),
  rainChance: {
    value: expect.any(Number),
    units: "%",
  },
  rainPredictions: {
    values: expect.arrayContaining([expect.any(Number)]),
    units: "%",
  },
  predictions: expect.arrayContaining([
    expect.objectContaining({
      date: expect.any(String),
      max: expect.any(Number),
      min: expect.any(Number),
    }),
  ]),
  temperature: {
    current: { value: expect.any(Number), units: "ºC" },
    max: { value: expect.any(Number), units: "ºC" },
    min: { value: expect.any(Number), units: "ºC" },
  },
};

describe("Mappers test suite", () => {
  describe("The town mapper maps towns to our town model", () => {
    const sourceTown = {
      NOMBRE: "Town name",
      NOMBRE_PROVINCIA: "Town county name",
      CODPROV: "abcdefghijk",
      CODIGOINE: "0123456789",
    };

    test("The mappedTown includes all the expected values", () => {
      const mappedTown = townMapper(sourceTown);
      expect(mappedTown).toStrictEqual(townModel);
    });

    test.each([
      ["NOMBRE", "name", "Town name value", "Town name value"],
      ["NOMBRE", "label", "Town name value", "Town name value"],
      ["NOMBRE_PROVINCIA", "county", "County value", "County value"],
      ["CODPROV", "countyCode", "County code", "County code"],
    ])(
      "The %s field is mapped to %s",
      (sourceKey, targetKey, sourceValue, targetValue) => {
        const mappedTown = townMapper({ [sourceKey]: sourceValue });
        expect(mappedTown[targetKey]).toBe(targetValue);
      }
    );

    test("The town code is sliced to only 5 characters", () => {
      const mappedTown = townMapper({ CODIGOINE: "1234567890" });
      expect(mappedTown.code).toBe("12345");
    });
  });

  describe("The weather mapper maps weather to our weather model", () => {
    const sourceWeather = {
      municipio: { NOMBRE: "Town name" },
      fecha: "2020-01-01T12:00:00Z",
      stateSky: { description: "Cloudy" },
      pronostico: { hoy: { prob_precipitacion: [0, 1, 2] } },
      proximos_dias: [
        {
          "@attributes": { fecha: "2020-01-01T12:00:00Z" },
          temperatura: { maxima: "100", minima: "0" },
        },
      ],
      temperatura_actual: "10",
      temperaturas: { max: "100", min: "0" },
    };

    test("The map includes all the expected values", () => {
      const mappedWeather = weatherMapper(sourceWeather);
      expect(mappedWeather).toStrictEqual(weatherModel);
    });

    test("For missing values the mapper doesn't break", () => {
      try {
        expect.assertions(0);
        weatherMapper({});
      } catch (error) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(error).not.toBeNull(error);
      }
    });
  });
});
