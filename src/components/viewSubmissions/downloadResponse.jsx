import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function DownloadResponse({ responses, questionMap }) {
    const handleDownload = () => {
        console.log(responses, questionMap)
        let responseList = []
        responseList = responses.map((resp) => {
            const row = {
                Name: resp.respondent_name,
                Respondent_ID: resp.respondent_id,
                Created_At: resp.created_at,
            };
            console.log(row);
            (resp.response || []).forEach((answerObj) => {
                const question = questionMap[answerObj.question_no] || `Q${answerObj.question_no}`;
                // Join multiple answers with comma
                row[question] = Array.isArray(answerObj.response)
                    ? answerObj.response.join(', ')
                    : answerObj.response;
            });
            return row;
        });
        console.log(responseList)
        if (!responseList.length) {
            console.warn('No responses to export.');
            return;
        }
        const data = responseList;
        if (!responses?.length) {
            console.warn('No responses to export.');
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");
        XLSX.writeFile(workbook, `response_${responses[0]?.form_id}.xlsx`);
    };

    return (
        <div className='download-response-button'>
            <Button
                variant="contained"
                startIcon={<FileDownloadIcon />}
                color="success"
                onClick={handleDownload}
            >
                Download Response
            </Button>
        </div>
    );
}
