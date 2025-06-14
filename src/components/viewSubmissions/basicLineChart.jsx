import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart({ graphData }) {
    const parsedDates = (graphData.date || []).map(dateStr => new Date(dateStr));
    return (
        <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            {graphData.date && <LineChart
                xAxis={[
                    {
                        data: parsedDates,
                        scaleType: 'time', // important for date axes
                        valueFormatter: (date) =>
                            date.toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                            }), // e.g., "14 Jun"
                    }
                ]}
                series={[
                    { curve: "linear", data: graphData.noOfResponse },
                ]}
                height={300}
            />}

        </div>
    );
}
