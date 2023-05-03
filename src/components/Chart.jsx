import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function Chart({paidData,spentData}) {
    if(paidData===null || paidData.length===0)return;
  return (
    <>
    <div className="flex flex-row flex-wrap items-center px-3 max-w-6xl mx-auto">
        <BarChart
        width={500}
        height={300}
        data={paidData}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount_getting_back" fill="#8884d8" />
        </BarChart>
        <BarChart
        width={500}
        height={300}
        data={spentData}
        margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
        }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount_spent" fill="#8884d8" />
    </BarChart>
    </div>
    </>
  );
}
