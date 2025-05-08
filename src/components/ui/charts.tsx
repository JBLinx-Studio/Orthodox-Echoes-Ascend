
import React from 'react';
import {
  Area,
  Bar,
  Line,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  TooltipProps
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from './chart';

export interface ChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  yAxisWidth?: number;
}

export interface PieChartProps {
  data: any[];
  category: string;
  index: string;
  colors?: string[];
  valueFormatter?: (value: any) => string; // Changed from (value: number) to (value: any)
  showLegend?: boolean;
}

export function AreaChart({
  data,
  categories,
  index,
  colors = ["#2563eb"],
  valueFormatter = (value: number) => `${value}`,
  showLegend = true,
  yAxisWidth = 40,
}: ChartProps) {
  return (
    <ChartContainer
      config={{
        // Create config for each category
        ...Object.fromEntries(
          categories.map((category, i) => [
            category,
            {
              color: colors[i % colors.length],
              label: category.charAt(0).toUpperCase() + category.slice(1),
            },
          ])
        ),
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{
            top: 8,
            right: 8,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={8}
            height={20}
          />
          <YAxis
            width={yAxisWidth}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => valueFormatter(value)}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    label={label}
                    formatter={(value) =>
                      typeof value === "number" ? valueFormatter(value) : value
                    }
                  />
                );
              }
              return null;
            }}
          />
          {showLegend && <Legend />}
          {categories.map((category, i) => (
            <Area
              key={category}
              type="monotone"
              dataKey={category}
              fill={colors[i % colors.length]}
              stroke={colors[i % colors.length]}
              fillOpacity={0.15}
              activeDot={{ r: 5 }}
              strokeWidth={2}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function BarChart({
  data,
  categories,
  index,
  colors = ["#2563eb"],
  valueFormatter = (value: number) => `${value}`,
  showLegend = true,
  yAxisWidth = 40,
}: ChartProps) {
  return (
    <ChartContainer
      config={{
        ...Object.fromEntries(
          categories.map((category, i) => [
            category,
            {
              color: colors[i % colors.length],
              label: category.charAt(0).toUpperCase() + category.slice(1),
            },
          ])
        ),
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 8,
            right: 8,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={8}
            height={20}
          />
          <YAxis
            width={yAxisWidth}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => valueFormatter(value)}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    label={label}
                    formatter={(value) =>
                      typeof value === "number" ? valueFormatter(value) : value
                    }
                  />
                );
              }
              return null;
            }}
          />
          {showLegend && <Legend />}
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function LineChart({
  data,
  categories,
  index,
  colors = ["#2563eb"],
  valueFormatter = (value: number) => `${value}`,
  showLegend = true,
  yAxisWidth = 40,
}: ChartProps) {
  return (
    <ChartContainer
      config={{
        ...Object.fromEntries(
          categories.map((category, i) => [
            category,
            {
              color: colors[i % colors.length],
              label: category.charAt(0).toUpperCase() + category.slice(1),
            },
          ])
        ),
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 8,
            right: 8,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={8}
            height={20}
          />
          <YAxis
            width={yAxisWidth}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => valueFormatter(value)}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    label={label}
                    formatter={(value) =>
                      typeof value === "number" ? valueFormatter(value) : value
                    }
                  />
                );
              }
              return null;
            }}
          />
          {showLegend && <Legend />}
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              activeDot={{ r: 5 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function PieChart({
  data,
  category,
  index,
  colors = ["#2563eb", "#4f46e5", "#7c3aed", "#a855f7", "#d946ef"],
  valueFormatter = (value: any) => `${value}`, // Changed from (value: number) to (value: any)
  showLegend = true,
}: PieChartProps) {
  return (
    <ChartContainer
      config={{
        ...Object.fromEntries(
          data.map((item, i) => [
            item[index],
            {
              color: colors[i % colors.length],
              label: item[index],
            },
          ])
        ),
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart
          margin={{
            top: 8,
            right: 8,
            left: 0,
            bottom: 0,
          }}
        >
          <Pie
            data={data}
            dataKey={category}
            nameKey={index}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={(entry) => entry[index]}
            labelLine={true}
          >
            {data.map((entry, i) => (
              <Cell 
                key={`cell-${i}`} 
                fill={colors[i % colors.length]} 
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0];
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">
                        {data.name}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {valueFormatter 
                          ? valueFormatter(data.value) 
                          : data.value
                        }
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
