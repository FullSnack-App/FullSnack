import Button from '../../../components/Button';
import { useNavigate } from 'react-router';

export default function AdminNav() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    };
    return (
        <nav className="bg-[#2E2A2A] text-white flex justify-between items-center px-6 py-4 shadow-md">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>

            <Button
                onClick={goBack}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
                GoBack
            </Button>
        </nav>
    );
}
