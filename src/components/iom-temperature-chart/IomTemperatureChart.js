import "@elastic/charts/dist/theme_only_light.css";
import "./IomTemperatureChart.scss";
import colors from "../../assets/base/_variables.module.scss";

import React, { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Chart,
  Settings,
  LineSeries,
  CurveType,
  TooltipType,
  Axis,
} from "@elastic/charts";

const IomTemperatureChart = ({ predictions }) => {
  const [temperatures, setTemperatures] = useState([]);

  useEffect(() => {
    const { max, min } = predictions.reduce(
      (data, { date, min, max }) => {
        data.max.push({ date, temp: max });
        data.min.push({ date, temp: min });
        return data;
      },
      { max: [], min: [] }
    );
    setTemperatures([
      { serie: "max", color: colors.maxTemp, data: max },
      { serie: "min", color: colors.minTemp, data: min },
    ]);
  }, [predictions]);

  return (
    <Fragment>
      <Chart className="chart" theme="dark" size={{ height: "100%" }}>
        <Settings showLegend={false} tooltip={{ type: TooltipType.None }} />
        <Axis
          id="x-axis"
          position="bottom"
          style={{
            axisLine: {
              visible: false,
            },
            tickLine: {
              visible: false,
            },
          }}
          labelFormat={(d) => dayjs(d).format("dd")[0]}
        />
        {temperatures.map(({ serie, data, color }, idx) => (
          <LineSeries
            key={serie}
            id={serie}
            name={serie}
            data={data}
            xAccessor={"date"}
            timezone="Europe/Madrid"
            yAccessors={["temp"]}
            color={[color]}
            curve={CurveType.CURVE_MONOTONE_X}
          />
        ))}
      </Chart>
    </Fragment>
  );
};

export default IomTemperatureChart;
