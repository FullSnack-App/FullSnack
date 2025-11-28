import Button from '../../../components/Button';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import { FaBars } from 'react-icons/fa';

export default function AdminNav({ toggleAside }) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
      logout();
        navigate('/');
    };
    return (
        <nav className="bg-[#2E2A2A] text-white flex justify-between items-center px-6 py-4 shadow-md">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleAside}
                    className="md:hidden text-white hover:text-gray-300"
                >
                    <FaBars size={20} />
                </button>
                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>

            <Button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
                Logout
            </Button>
        </nav>
    );
}
