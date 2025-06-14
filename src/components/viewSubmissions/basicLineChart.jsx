import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
    return (
        <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    { curve: "linear", data: [1, 5, 2, 6, 3, 9.3] },
                ]}
                height={300}
            />
        </div>
    );
}
