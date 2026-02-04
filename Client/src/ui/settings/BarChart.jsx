import { Bar, BarChart, Tooltip } from "recharts";

const BarChartGraph = (props) => {
  console.log("PROPS", props);
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];
  return (
    <div className="h-full w-full">
      <h1 className="mb-5 text-lg font-semibold">Last Month</h1>
      <BarChart
        style={{
          width: "100%",
          height: "130px",
          maxWidth: "300px",
          maxHeight: "130px",
          aspectRatio: 1.618,
        }}
        responsive
        data={props.chartData}
        height={150}
      >
        <Tooltip
          contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
          labelStyle={{ display: "none" }}
          cursor={{ fill: "none" }}
        />
        <Bar dataKey={props.dataKey} fill={props.color} />
      </BarChart>
    </div>
  );
};
export default BarChartGraph;
