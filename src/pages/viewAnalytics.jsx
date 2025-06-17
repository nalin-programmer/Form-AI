import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BasicBarGraph from '../components/viewAnalytics/basicBarGraph'
import BasicPieChart from '../components/viewAnalytics/basicPieChart'
import { fetchAnalytics } from '../api/respondentForm.api';
import "../styles/viewAnalytics.css";
import BasicTable from '../components/viewAnalytics/basicTable';

export default function ViewAnalytics() {
    const { formId } = useParams();
    const [analysis, setAnalysis] = useState([]);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            const res = await fetchAnalytics(formId);
            setAnalysis(res);
        }
        fetchAnalyticsData();
    }, [formId])

    return (
        <div className="view-analytics-container">
            {analysis.length > 0 &&
                analysis.map((item, idx) => (
                    <div className="graph-box" key={idx}>
                        <div className="analytics-question-text">
                            <i>Que {item.question_no}</i>: {item.question + " "}
                            <i><b>({item.response_type === "single_correct" ? "Single Correct" : "Multiple Correct"})</b></i>

                            <BasicTable data={item.data} />
                        </div>
                        <div className="chart">
                            {item.response_type === "single_correct" ? (
                                <BasicPieChart data={item.data} />
                            ) : (
                                <BasicBarGraph data={item.data} />
                            )}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}