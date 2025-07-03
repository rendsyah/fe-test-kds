import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { MenusRepository } from '@/libs/services/menus.repository';
import { isApiError } from '@/libs/utils/catch.utils';
import Notification from '@/components/ui/notification/Notification';
import type { MenuGroups } from '@/types/menu-groups.types';

const useMenus = () => {
  const queryClient = useQueryClient();

  const [expandMenu, setExpandMenu] = useState(-1);
  const [selectedExpand, setSelectedExpand] = useState<MenuGroups | null>(null);

  const menusRepository = new MenusRepository();
  const fetchMenuGroups = usePaginatedFetch<MenuGroups>({
    key: 'menus',
    queryFn: (query) => menusRepository.menusList(query),
  });

  const onExpand = (index: number, item: MenuGroups) => {
    setExpandMenu((prev) => (prev === index ? -1 : index));
    setSelectedExpand(item);
  };

  const onDelete = useMutation({
    mutationFn: (id: string) => menusRepository.deleteMenus(id),
    onSuccess: (res) => {
      Notification({
        type: 'success',
        message: 'Success!',
        description: res.message,
        position: 'bottom-right',
      });
      queryClient.invalidateQueries({ queryKey: ['menus'] });
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
    expandMenu,
    selectedExpand,
    onExpand,
    onDelete,
  };
};

export default useMenus;
