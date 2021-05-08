export function locationMapper(location) {
  return {
    name: location.NOMBRE,
    townId: location.CODIGOINE.slice(0, 4),
    countyId: location.CODPROV,
  };
}

export function weatherMapper(weather) {
  return {
    name: weather.municipio.NOMBRE,
    date: weather.fecha,
    rain: weather.lluvia,
    temp: {
      current: weather.temperatura_actual,
      max: weather.temperaturas.max,
      min: weather.temperaturas.min,
    },
  };
}
