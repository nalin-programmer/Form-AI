import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPieChart({ data }) {
    return (
        <PieChart
            series={[{ data },]}
            width={200}
            height={200}
        />
    );
}
