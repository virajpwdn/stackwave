import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const ChartBox = (props) => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="chartbox flex h-full">
      <div className="boxInfo flex flex-[3] flex-col justify-between">
        <div className="title flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1769372131380-a6cccb922301?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <span>{props.title}</span>
        </div>
        <h1 className="text-2xl font-bold">{props.number}</h1>
        <p style={{ color: props.color }}>View all</p>
      </div>
      <div className="chartInfo flex flex-[2] flex-col items-center justify-between">
        <div className="chart h-full w-full">
          <LineChart
            style={{
              width: "100%",
              maxWidth: "300px",
              maxHeight: "400px",
              aspectRatio: 1.618,
            }}
            responsive
            data={props.chartData}
          >
            <Tooltip
              contentStyle={{ background: "transparent", border: "none" }}
              labelStyle={{ display: "none" }}
              position={{ x: 20, y: 60 }}
            />
            <Line
              type="monotone"
              dataKey={props.dataKey}
              stroke={props.color}
              strokeWidth={2}
              dot={false}
            />
            {/* <RechartsDevtools /> */}
          </LineChart>
        </div>
        <div className="texts flex flex-col items-end">
          <span
            className="percentage text-xl font-bold"
            style={{ color: props.number < 0 ? "tomato" : "limegreen" }}
          >
            {props.number}%
          </span>
          <span className="duration">this month</span>
        </div>
      </div>
    </div>
  );
};
export default ChartBox;
