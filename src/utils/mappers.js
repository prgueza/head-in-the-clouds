export function locationMapper(location) {
  return {
    label: location.NOMBRE,
    name: location.NOMBRE,
    county: location.NOMBRE_PROVINCIA,
    code: location.CODIGOINE.slice(0, 5),
    countyCode: location.CODPROV,
  };
}

export function weatherMapper(weather) {
  return {
    name: weather.municipio.NOMBRE,
    date: weather.fecha,
    rainChance: 40,
    temperature: {
      current: weather.temperatura_actual,
      max: weather.temperaturas.max,
      min: weather.temperaturas.min,
    },
  };
}
