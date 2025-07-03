import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { MenuGroupsRepository } from '@/libs/services/menu-groups.repository';
import { isApiError } from '@/libs/utils/catch.utils';
import Notification from '@/components/ui/notification/Notification';
import type { MenuGroups } from '@/types/menu-groups.types';

const useMenuGroups = () => {
  const queryClient = useQueryClient();

  const menuGroupsRepository = new MenuGroupsRepository();
  const fetchMenuGroups = usePaginatedFetch<MenuGroups>({
    key: 'menu-groups',
    queryFn: (query) => menuGroupsRepository.menuGroupList(query),
  });

  const onDelete = useMutation({
    mutationFn: (id: string) => menuGroupsRepository.deleteMenuGroup(id),
    onSuccess: (res) => {
      Notification({
        type: 'success',
        message: 'Success!',
        description: res.message,
        position: 'bottom-right',
      });
      queryClient.invalidateQueries({ queryKey: ['menu-groups'] });
    },
    onError: (e) => {
      if (isApiError(e)) {
        Notification({
          type: 'error',
          message: 'Failed!',
          description: e.message,
          position: 'bottom-right',
        });
      }
    },
  });

  return {
    ...fetchMenuGroups,
    onDelete,
  };
};

export default useMenuGroups;
