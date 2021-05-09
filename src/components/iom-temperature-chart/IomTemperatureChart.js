import "@elastic/charts/dist/theme_light.css";

import React, { Fragment } from "react";
import { Chart, Settings, LineSeries } from "@elastic/charts";

const IomTemperatureChart = () => {
  const data1 = [
    { x: 1, y: 1 },
    { x: 2, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 3 },
    { x: 5, y: 5 },
  ];

  return (
    <Fragment>
      <Chart theme="dark" size={{ height: 100 }}>
        <Settings showLegend={false} />
        <LineSeries
          id="control"
          name="Control"
          data={data1}
          xAccessor={"x"}
          yAccessors={["y"]}
          color={["black"]}
        />
      </Chart>
    </Fragment>
  );
};

export default IomTemperatureChart;
