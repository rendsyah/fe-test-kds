import { v4 as uuidv4 } from 'uuid';
import type { MutationResponse } from '@/types/commons.types';
import { MenuGroupsRepository } from './menu-groups.repository';
import { CreateMenuDto, MenuListDto, Menus, MenusList } from '@/types/menus.types';

export const MENUS_KEY = 'cms-app.menus';

export class MenusRepository {
  private menuGroupsRepository = new MenuGroupsRepository();

  /**
   * Get Menus List
   * @param dto
   * @returns
   */
  menusList(dto: MenuListDto): Promise<MenusList> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const getMenuGroups = await this.menuGroupsRepository.menuGroupList(dto);
          resolve(getMenuGroups);
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
   * Create Menus
   * @param dto
   * @returns
   */
  createMenus(dto: CreateMenuDto): Promise<MutationResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const json = localStorage.getItem(MENUS_KEY);
          const data: Menus[] = json ? JSON.parse(json) : [];

          const getMenu = data.find((item) => item.name.toLowerCase() === dto.name.toLowerCase());

          if (getMenu) {
            return reject({
              status: 400,
              data: null,
              message: 'Menu already exists',
              errors: [],
            });
          }

          const getMenuGroups = await this.menuGroupsRepository.detailMenuGroup(dto.group_id);

          const insertMenu = {
            id: uuidv4(),
            group_id: dto.group_id,
            groups: getMenuGroups.name,
            name: dto.name,
            path: dto.path,
            status: 1,
          };

          localStorage.setItem(MENUS_KEY, JSON.stringify([...data, insertMenu]));

          getMenuGroups.menus.push(insertMenu);

          await this.menuGroupsRepository.updateMenuGroup(getMenuGroups);

          return resolve({
            status: 201,
            message: 'Successfully created',
          });
        } catch (error) {
          console.log(error, 'CREATE MENU');
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
   * Delete Menu
   * @param id
   * @returns
   */
  deleteMenus(id: string): Promise<MutationResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const json = localStorage.getItem(MENUS_KEY);
          const data: Menus[] = json ? JSON.parse(json) : [];

          const getMenu = data.find((item) => item.id === id);

          if (!getMenu) {
            return reject({
              status: 400,
              data: null,
              message: 'Menu not found',
              errors: [],
            });
          }

          await this.menuGroupsRepository.deleteChildMenuGroup(getMenu.group_id, id);
          localStorage.setItem(MENUS_KEY, JSON.stringify(data.filter((item) => item.id !== id)));

          return resolve({
            status: 200,
            message: 'Successfully deleted',
          });
        } catch (error) {
          console.log(error, 'DELETE MENU');
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
