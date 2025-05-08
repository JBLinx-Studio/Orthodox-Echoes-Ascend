
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from '@/components/ui/charts';

interface ChartSectionProps {
  title: string;
  type: 'bar' | 'line' | 'pie';
  data: any[];
  categories?: string[];
  category?: string;
  index: string;
  colors?: string[];
  valueFormatter?: (value: any) => string;
}

export function ChartSection({ 
  title, 
  type, 
  data, 
  categories = [], 
  category, 
  index, 
  colors, 
  valueFormatter 
}: ChartSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {type === 'bar' && (
          <BarChart 
            data={data} 
            categories={categories} 
            index={index} 
            colors={colors}
            valueFormatter={valueFormatter}
          />
        )}
        {type === 'line' && (
          <LineChart 
            data={data} 
            categories={categories} 
            index={index} 
            colors={colors}
            valueFormatter={valueFormatter}
          />
        )}
        {type === 'pie' && category && (
          <PieChart 
            data={data} 
            category={category} 
            index={index} 
            colors={colors}
            valueFormatter={valueFormatter}
          />
        )}
      </CardContent>
    </Card>
  );
}
