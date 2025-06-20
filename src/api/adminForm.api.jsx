export async function fetchForms() {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        if (!baseUrl) {
            throw new Error('API base URL is not defined');
        }
        const response = await fetch(`${baseUrl}/forms`, {
            headers: { accept: 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to fetch forms');
        return response.json();
    } catch (error) {
        console.error('Error fetching forms:', error);
        throw error; // Re-throw the error to be handled by the caller

    }
}

export async function createForm(formData) {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        if (!baseUrl) {
            throw new Error('API base URL is not defined');
        }
        const response = await fetch(`${baseUrl}/forms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Failed to create form');
        return response.json();
    } catch (error) {
        console.error('Error creating form:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export async function deleteForm(formId) {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        if (!baseUrl) {
            throw new Error('API base URL is not defined');
        }
        const response = await fetch(`${baseUrl}/forms/${formId}`, {
            method: 'DELETE',
            headers: { accept: 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to delete form');
        return response.json();
    } catch (error) {
        console.error('Error deleting form:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export async function fetchFormResponsesById(formId) {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        if (!baseUrl) {
            throw new Error('API base URL is not defined');
        }
        const response = await fetch(`${baseUrl}/responses/${formId}`, {
            headers: { accept: 'application/json' },
        });
        if (response.status === 404) {
            throw new Error('Form not found');
        }
        if (!response.ok) throw new Error('Failed to fetch form responses');
        return response.json();
    } catch (error) {
        console.error('Error fetching form responses:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export async function uploadBackgroundImages(payload) {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        if (!baseUrl) {
            throw new Error('API base URL is not defined');
        }

        const response = await fetch(`${baseUrl}/files/upload`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                // Do not set Content-Type, browser will set it to multipart/form-data with boundary
            },
            body: payload,
        });

        if (!response.ok) throw new Error('Failed to upload background image');
        return response.json();
    } catch (error) {
        console.error('Error uploading background image:', error);
        throw error;
    }
}