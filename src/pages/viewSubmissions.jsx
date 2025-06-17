import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/viewSubmissions.css';
import BasicLineChart from '../components/viewSubmissions/BasicLineChart';
import { fetchFormResponsesById } from '../api/adminForm.api';
import ResponseTable from '../components/viewSubmissions/responseTable';
import DownloadResponse from '../components/viewSubmissions/downloadResponse';

export default function ViewSubmissions() {
    const { formId } = useParams();
    const [form, setForm] = useState(null);
    const [responses, setResponses] = useState([]); // State to hold form submissions data
    const [questionMap, setQuestionMap] = useState({});
    const [graphData, setGraphData] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            const formData = await fetchFormResponsesById(formId);
            setForm(formData.form);
            setResponses(formData.responses);
            setQuestionMap(formData.questionMap);
            setGraphData(formData.graphData)
        };
        fetchData();
        // console.log("formData.graphData", formData)
        // Fetch form submissions data using formId
    }, [formId]);

    return (
        <div className='view-submissions-container'>
            {form && (<><h2><i>{form.title}</i></h2>
                <p>{form.description}</p>
                <BasicLineChart graphData={graphData} />
                <DownloadResponse questionMap={questionMap} responses={responses} />
                <ResponseTable responses={responses} form={form} questionMap={questionMap} />
            </>)}

        </div>
    )
}
