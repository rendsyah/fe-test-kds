import { Meta } from './commons.types';
import { MenuGroups } from './menu-groups.types';

export type DetailMenuDto = {
  id: string;
};

export type Menus = {
  id: string;
  group_id: string;
  groups: string;
  name: string;
  path: string;
  status: number;
};

export type MenuListDto = {
  page: number;
  limit: number;
  search?: string;
};

export type MenusList = {
  items: MenuGroups[];
  meta: Meta;
};

export type CreateMenuDto = {
  group_id: string;
  name: string;
  path: string;
};
