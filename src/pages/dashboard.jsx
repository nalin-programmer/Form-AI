import React, { useEffect, useState } from 'react'
import FormComponent from '../component.jsx/formComponent'
import AddForm from '../component.jsx/addFormComponent'
import { fetchForms } from '../api/adminForm.api'
import { deleteForm } from '../api/adminForm.api';

export default function Dashboard() {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchForms()
            .then(setForms)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading forms.</div>;

    const handleDelete = async (id) => {
        const res = await deleteForm(id);
        if (res) {
            setForms((prevForms) => prevForms.filter((form) => form._id !== id));
            console.log('Delete form with id:', id);
        }
    };
    return (
        <div className="full-width form-list">
            <AddForm />
            {forms.map(form => (
                <FormComponent key={form.id} form={form} handleDelete={handleDelete} />
            ))}
        </div>
    )
}
