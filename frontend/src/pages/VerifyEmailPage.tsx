import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify-email/${token}`);
        if (response.data.success) {
          toast.success('Email verified successfully! You can now log in.');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Email verification failed');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isVerifying ? 'Verifying your email...' : 'Email Verification'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isVerifying ? 'Please wait while we verify your email address.' : 'You will be redirected shortly.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage; 