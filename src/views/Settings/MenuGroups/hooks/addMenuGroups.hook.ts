import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGlobal } from '@/contexts/global.context';
import { MenuGroupsRepository } from '@/libs/services/menu-groups.repository';
import { isApiError } from '@/libs/utils/catch.utils';
import type { CreateMenuGroupsDto } from '@/types/menu-groups.types';
import Notification from '@/components/ui/notification/Notification';

const addMenuGroupsSchema = yup.object({
  name: yup.string().required('Name is required'),
  desc: yup.string().required('Description is required'),
});

const useAddMenuGroups = () => {
  const { handleModal } = useGlobal();

  const queryClient = useQueryClient();
  const menuGroupsRepository = new MenuGroupsRepository();

  const form = useForm<CreateMenuGroupsDto>({
    resolver: yupResolver(addMenuGroupsSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: CreateMenuGroupsDto) => menuGroupsRepository.createMenuGroup(data),
  });

  const onSubmit: SubmitHandler<CreateMenuGroupsDto> = async (data) => {
    try {
      const res = await mutation.mutateAsync(data);
      onCancel();
      Notification({
        type: 'success',
        message: 'Success!',
        description: res.message,
        position: 'bottom-right',
      });
      queryClient.invalidateQueries({ queryKey: ['menu-groups'] });
    } catch (e) {
      if (isApiError(e)) {
        Notification({
          type: 'error',
          message: 'Failed!',
          description: e.message,
          position: 'bottom-right',
        });
      }
    }
  };

  const onCancel = () => {
    form.reset();
    handleModal();
  };

  return {
    form,
    onSubmit,
    onCancel,
  };
};

export default useAddMenuGroups;
