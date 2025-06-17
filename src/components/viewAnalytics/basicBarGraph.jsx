import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBarGraph({ data }) {
    return (
        <BarChart
            xAxis={[{ data: data.map((d) => d.label), label: 'Options' }]}
            series={[{ data: data.map((d) => d.value), label: 'Value' }]}
            width={500}
            height={300}
        />
    );
}