import * as yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGlobal } from '@/contexts/global.context';
import { MenusRepository } from '@/libs/services/menus.repository';
import { MenuGroupsRepository } from '@/libs/services/menu-groups.repository';
import { isApiError } from '@/libs/utils/catch.utils';
import type { CreateMenuDto } from '@/types/menus.types';
import Notification from '@/components/ui/notification/Notification';

const addMenusSchema = yup.object({
  group_id: yup.string().required('Group is required'),
  name: yup.string().required('Name is required'),
  path: yup.string().required('Path is required'),
});

const useAddMenus = () => {
  const { handleModal } = useGlobal();

  const queryClient = useQueryClient();
  const menusRepository = new MenusRepository();
  const menuGroupsRepository = new MenuGroupsRepository();

  const { data: menuGroupsOptions = [] } = useQuery({
    queryKey: ['menu-group-options'],
    queryFn: () => menuGroupsRepository.menuGroupOptions(),
    placeholderData: (prev) => prev,
  });

  const form = useForm<CreateMenuDto>({
    resolver: yupResolver(addMenusSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: CreateMenuDto) => menusRepository.createMenus(data),
  });

  const onSubmit: SubmitHandler<CreateMenuDto> = async (data) => {
    try {
      const res = await mutation.mutateAsync(data);
      onCancel();
      Notification({
        type: 'success',
        message: 'Success!',
        description: res.message,
        position: 'bottom-right',
      });
      queryClient.invalidateQueries({ queryKey: ['menus'] });
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
    menuGroupsOptions,
    form,
    onSubmit,
    onCancel,
  };
};

export default useAddMenus;
