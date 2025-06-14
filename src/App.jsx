import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import CreateForm from './pages/createForm'
import MainLayout from './utils/mainLayout'
import Form from './pages/form'
import ViewSubmissions from './pages/viewSubmissions'


function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/form/create" element={<CreateForm />} />
                <Route path="/form/:formId" element={<Form />} />
                <Route path="/form/:formId/responses" element={<ViewSubmissions />} />
                {/* Add other routes here */}
            </Routes>
        </MainLayout>
    )
}

export default App