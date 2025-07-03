import { v4 as uuidv4 } from 'uuid';
import type { Meta, MutationResponse } from '@/types/commons.types';
import type {
  CreateMenuGroupsDto,
  MenuGroupsListDto,
  MenuGroups,
  MenuGroupsList,
  UpdateMenuGroupsDto,
  MenuGroupsOptions,
} from '@/types/menu-groups.types';

export const MENU_GROUPS_KEY = 'cms-app.menu-groups';

export class MenuGroupsRepository {
  /**
   * Get Detail Menu Groups
   * @param id
   * @returns
   */
  detailMenuGroup(id: string): Promise<MenuGroups> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const json = localStorage.getItem(MENU_GROUPS_KEY);
          const data: MenuGroups[] = json ? JSON.parse(json) : [];

          const getMenuGroup = data.find((item) => item.id === id);

          if (!getMenuGroup) {
            return reject({
              status: 400,
              data: null,
              message: 'Menu Group not found',
              errors: [],
            });
          }

          resolve(getMenuGroup);
        } catch (error) {
          console.log(error, 'MENU GROUP');
          return reject({
            status: 500,
            data: null,
            message: 'Something Went Wrong!',
            errors: [],
          });
        }
      }, 300);
    });
  }

  /**
   * Get Menu Groups Options
   * @returns
   */
  menuGroupOptions(): Promise<MenuGroupsOptions[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const json = localStorage.getItem(MENU_GROUPS_KEY);
          const data: MenuGroups[] = json ? JSON.parse(json) : [];

          const options = data.map((item) => ({
            id: item.id,
            name: item.name,
          }));

          resolve(options);
        } catch {
          resolve([]);
        }
      }, 300);
    });
  }

  /**
   * Get Menu Groups List
   * @param dto
   * @returns
   */
  menuGroupList(dto: MenuGroupsListDto): Promise<MenuGroupsList> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const json = localStorage.getItem(MENU_GROUPS_KEY);
          const data: MenuGroups[] = json ? JSON.parse(json) : [];

          const filtered = dto.search
            ? data.filter((item) => item.name.includes(dto.search!.toLowerCase()))
            : data;

          const start = (dto.page - 1) * dto.limit;

          const items = filtered.slice(start, start + dto.limit);
          const meta: Meta = {
            page: dto.page,
            limit: dto.limit,
            totalData: filtered.length,
            totalPage: Math.ceil(filtered.length / dto.limit),
          };

          resolve({ items, meta });
        } catch {
          resolve({
            items: [],
            meta: { page: 1, limit: 10, totalData: 0, totalPage: 0 },
          });
        }
      }, 300);
    });
  }

  /**
   * Create Menu Groups
   * @param dto
   * @returns
   */
  createMenuGroup(dto: CreateMenuGroupsDto): Promise<MutationResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const json = localStorage.getItem(MENU_GROUPS_KEY);
          const data: MenuGroups[] = json ? JSON.parse(json) : [];

          const getMenuGroup = data.find(
            (item) => item.name.toLowerCase() === dto.name.toLowerCase(),
          );

          if (getMenuGroup) {
            return reject({
              status: 400,
              data: null,
              message: 'Group already exists',
              errors: [],
            });
          }

          const insertMenuGroup = {
            id: uuidv4(),
            name: dto.name,
            desc: dto.desc,
            status: 1,
            menus: [],
          };

          localStorage.setItem(MENU_GROUPS_KEY, JSON.stringify([...data, insertMenuGroup]));

          return resolve({
            status: 201,
            message: 'Successfully created',
          });
        } catch (error) {
          console.log(error, 'CREATE MENU GROUP');
          return reject({
            status: 500,
            data: null,
            message: 'Something Went Wrong!',
            errors: [],
          });
        }
      }, 300);
    });
  }

  /**
   * Update Menu Groups
   * @param dto
   * @returns
   */
  updateMenuGroup(dto: UpdateMenuGroupsDto): Promise<MutationResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const json = localStorage.getItem(MENU_GROUPS_KEY);
          const data: MenuGroups[] = json ? JSON.parse(json) : [];

          const getMenuGroup = data.find((item) => item.id === dto.id);

          if (!getMenuGroup) {
            return reject({
              status: 400,
              data: null,
              message: 'Menu Group not found',
              errors: [],
            });
          }

          getMenuGroup.name = dto.name;
          getMenuGroup.desc = dto.desc;
          getMenuGroup.status = dto.status;
          getMenuGroup.menus = dto.menus;

          localStorage.setItem(MENU_GROUPS_KEY, JSON.stringify(data));

          return resolve({
            status: 200,
            message: 'Successfully updated',
          });
        } catch (error) {
          console.log(error, 'UPDATE MENU GROUP');
          return reject({
            status: 500,
            data: null,
            message: 'Something Went Wrong!',
            errors: [],
          });
        }
      }, 500);
    });
  }

  /**
   * Delete Menu Groups
   * @param id
   * @returns
   */
  deleteMenuGroup(id: string): Promise<MutationResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const json = localStorage.getItem(MENU_GROUPS_KEY);
          const data: MenuGroups[] = json ? JSON.parse(json) : [];

          const getMenuGroup = data.find((item) => item.id === id);

          if (!getMenuGroup) {
            return reject({
              status: 400,
              data: null,
              message: 'Group not found',
              errors: [],
            });
          }

          localStorage.setItem(
            MENU_GROUPS_KEY,
            JSON.stringify(data.filter((item) => item.id !== id)),
          );

          return resolve({
            status: 200,
            message: 'Successfully deleted',
          });
        } catch (error) {
          console.log(error, 'DELETE MENU GROUP');
          return reject({
            status: 500,
            data: null,
            message: 'Something Went Wrong!',
            errors: [],
          });
        }
      }, 300);
    });
  }

  deleteChildMenuGroup(id: string, menu_id: string): Promise<MutationResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const json = localStorage.getItem(MENU_GROUPS_KEY);
          const data: MenuGroups[] = json ? JSON.parse(json) : [];

          const index = data.findIndex((item) => item.id === id);
          if (index === -1) {
            return reject({
              status: 400,
              data: null,
              message: 'Menu Group not found',
              errors: [],
            });
          }

          const menuGroup = data[index];
          menuGroup.menus = menuGroup.menus.filter((menu) => menu.id !== menu_id);

          localStorage.setItem(MENU_GROUPS_KEY, JSON.stringify(data));

          return resolve({
            status: 200,
            message: 'Successfully deleted menu from group',
          });
        } catch (error) {
          console.log(error, 'DELETE CHILD MENU');
          return reject({
            status: 500,
            data: null,
            message: 'Something Went Wrong!',
            errors: [],
          });
        }
      }, 300);
    });
  }
}
