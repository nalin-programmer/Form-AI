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