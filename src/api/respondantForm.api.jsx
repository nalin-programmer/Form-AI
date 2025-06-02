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
