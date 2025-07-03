import type { User } from '@/types/commons.types';
import type { LoginDto, LoginResponse } from '@/types/auth.types';

const defaultUsers = [
  {
    id: 1,
    name: 'Admin',
    access: 'Administrator',
    username: 'admin',
    password: 'admin',
    email: 'admin@example.com',
    phone: '08123456789',
    image: '',
  },
];

const AUTH_KEY = 'cms-app.auth';

export class AuthRepository {
  /**
   * Get Me
   * @returns
   */
  me(): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const json = localStorage.getItem(AUTH_KEY);

          if (!json) {
            return reject({
              status: 401,
              data: null,
              message: 'Unauthorized',
              errors: [],
            });
          }

          const user: User = JSON.parse(json);

          return resolve({
            id: user.id,
            name: user.name,
            access: user.access,
            email: user.email,
            phone: user.phone,
            image: user.image,
          });
        } catch (error) {
          console.log(error, 'ME');
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
   * Login
   * @param dto
   * @returns
   */
  login(dto: LoginDto): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!dto.username || !dto.password) {
            return reject({
              status: 400,
              data: null,
              message: 'Username or password is required',
              errors: [],
            });
          }

          const user = defaultUsers.find((user) => user.username === dto.username);

          if (!user) {
            return reject({
              status: 400,
              data: null,
              message: 'Username or password is incorrect',
              errors: [],
            });
          }

          const matchPassword = dto.password === user.password;

          if (!matchPassword) {
            return reject({
              status: 400,
              data: null,
              message: 'Username or password is incorrect',
              errors: [],
            });
          }

          localStorage.setItem(
            AUTH_KEY,
            JSON.stringify({
              id: user.id,
              name: user.name,
              access: user.access,
              email: user.email,
              phone: user.phone,
              image: user.image,
            }),
          );

          return resolve({
            redirect_to: '/home',
          });
        } catch (error) {
          console.log(error, 'LOGIN');
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
   * Logout
   * @returns
   */
  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          localStorage.removeItem(AUTH_KEY);
          return resolve();
        } catch (error) {
          console.log(error, 'LOGOUT');
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
