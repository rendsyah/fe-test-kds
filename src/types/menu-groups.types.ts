import type { Meta } from './commons.types';
import type { Menus } from './menus.types';

export type DetailMenuDto = {
  id: string;
};

export type MenuGroups = {
  id: string;
  name: string;
  desc: string;
  status: number;
  menus: Menus[];
};

export type MenuGroupsListDto = {
  page: number;
  limit: number;
  search?: string;
};

export type MenuGroupsOptions = {
  id: string;
  name: string;
};

export type MenuGroupsList = {
  items: MenuGroups[];
  meta: Meta;
};

export type CreateMenuGroupsDto = {
  name: string;
  desc: string;
};

export type UpdateMenuGroupsDto = MenuGroups;
