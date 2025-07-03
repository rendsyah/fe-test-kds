import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGlobal } from '@/contexts/global.context';
import { AuthRepository } from '@/libs/services/auth.repository';
import { isApiError } from '@/libs/utils/catch.utils';
import type { LoginDto } from '@/types/auth.types';

const loginSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const useLogin = () => {
  const { openFeedbackModal } = useGlobal();

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const authRepository = new AuthRepository();

  const form = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<LoginDto> = async (data) => {
    try {
      const request: LoginDto = {
        username: data.username,
        password: data.password,
      };

      const response = await authRepository.login(request);
      console.log(response);
      router.replace(response.redirect_to);
    } catch (e) {
      if (isApiError(e)) {
        openFeedbackModal({
          type: 'error',
          message: e.message,
        });
      }
    }
  };

  return {
    form,
    showPassword,
    handleShow,
    onSubmit,
  };
};

export default useLogin;
