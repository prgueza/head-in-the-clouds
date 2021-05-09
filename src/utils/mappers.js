export function townMapper(town) {
  return {
    label: town.NOMBRE,
    name: town.NOMBRE,
    county: town.NOMBRE_PROVINCIA,
    code: town.CODIGOINE.slice(0, 5),
    countyCode: town.CODPROV,
  };
}

export function weatherMapper(weather) {
  return {
    name: weather.municipio.NOMBRE,
    date: weather.fecha,
    sky: weather.stateSky.description,
    rainChance: {
      value: +weather.pronostico.hoy.prob_precipitacion[0],
      units: "%",
    },
    rainPredictions: {
      values: weather.pronostico.hoy.prob_precipitacion,
      units: "%",
    },
    predictions: weather.proximos_dias.map((prediction) => ({
      date: prediction["@attributes"].fecha,
      max: prediction.temperatura.maxima,
      min: prediction.temperatura.minima,
    })),
    temperature: {
      current: { value: weather.temperatura_actual, units: "ºC" },
      max: { value: weather.temperaturas.max, units: "ºC" },
      min: { value: weather.temperaturas.min, units: "ºC" },
    },
  };
}
