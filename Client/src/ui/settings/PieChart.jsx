import { Pie, PieChart, Tooltip } from "recharts";

const PieChartGraph = ({ isAnimationActive = true }) => {
  const data = [
    { name: "Group A", value: 400, fill: "#0088FE" },
    { name: "Group B", value: 300, fill: "#00C49F" },
    { name: "Group C", value: 300, fill: "#FFBB28" },
    { name: "Group D", value: 200, fill: "#FF8042" },
  ];
  return (
    <div className="flex h-full flex-col justify-between">
      <h1 className="mb-10 text-xl font-bold">Lead by Source</h1>
      <div className="chart flex items-center justify-center">
        <PieChart
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "80vh",
            aspectRatio: 1,
          }}
          responsive
        >
          <Tooltip
            contentStyle={{ background: "white", borderRadius: "5px" }}
          />
          <Pie
            data={data}
            innerRadius="80%"
            outerRadius="100%"
            // Corner radius is the rounded edge of each pie slice
            cornerRadius="50%"
            fill="#8884d8"
            // padding angle is the gap between each pie slice
            paddingAngle={5}
            dataKey="value"
            isAnimationActive={isAnimationActive}
          />
        </PieChart>
      </div>
      <div className="options flex items-center justify-between text-sm">
        {data.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-start gap-2">
              <div
                className="dot h-1.5 w-1.5 rounded-[50%]"
                style={{ backgroundColor: item.fill }}
              ></div>
              <span className="text-xs">{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PieChartGraph;
