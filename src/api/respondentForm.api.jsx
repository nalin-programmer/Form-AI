export async function fetchForm(formId) {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        if (!baseUrl) {
            throw new Error('API base URL is not defined');
        }
        const response = await fetch(`${baseUrl}/forms/${formId}`);
        if (response.status === 404) {
            console.error('Form not found');
            throw new Error('Form not found');
        }
        if (!response.ok) {
            console.error('Error fetching form:', response.statusText);
            throw new Error('Failed to fetch form');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching form:', error);
        throw error;
    }
}

export async function createResponse(formId, respondentName, respondentId) {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        if (!baseUrl) {
            throw new Error('API base URL is not defined');
        }
        const response = await fetch(`${baseUrl}/responses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ form_id: formId, respondent_name: respondentName, respondent_id: respondentId }),
        });
        if (!response.ok) {
            console.error('Error creating response:', response.statusText);
            throw new Error('Failed to create response');
        }
        return response.json();
    } catch (error) {
        console.error('Error creating response:', error);
        throw error;
    }
}

// Put api/response api functions here
export async function updateResponse(responseId, questionId, answer) {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        if (!baseUrl) {
            throw new Error('API base URL is not defined');
        }
        const res = await fetch(`${baseUrl}/responses`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ response_id: responseId, question_no: questionId, response: answer }),
        });
        if (!res.ok) {
            console.error('Error submitting response:', res.statusText);
            throw new Error('Failed to submit response');
        }
        return res.json();
    } catch (error) {
        console.error('Error submitting response:', error);
        throw error;
    }
}


export async function fetchAnalytics(formId) {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        if (!baseUrl) {
            throw new Error('API base URL is not defined');
        }
        const response = await fetch(`${baseUrl}/responses/analytics/${formId}`);
        if (response.status === 404) {
            console.error('Analysis not found');
            throw new Error('Analysis not found');
        }
        if (!response.ok) {
            console.error('Error fetching analysis:', response.statusText);
            throw new Error('Failed to fetch analysis');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching form:', error);
        throw error;
    }
}