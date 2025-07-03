export type Nullable<T> = T | undefined;

export type User = {
  id: number;
  name: string;
  access: string;
  email: string;
  phone: string;
  image: string;
};

export type Device = {
  browserName: string;
  browserVersion: string;
  osName: string;
  osVersion: string;
  deviceType: string;
  deviceVendor: string;
  deviceModel: string;
  userAgent: string;
};

export type Menu = {
  id: number;
  name: string;
  path: string;
  icon: string;
  level: number;
  child: Menu[];
};

export type Options = {
  id: string | number;
  name: string;
};

export type Sort = {
  column: string;
  order: '' | 'ASC' | 'DESC';
};

export type Meta = {
  page: number;
  limit: number;
  totalData: number;
  totalPage: number;
};

export type ApiError = {
  status: number;
  data: null;
  message: string;
  errors?: string[];
};

export type MutationResponse = {
  status: number;
  message: string;
};
