export type LoginDto = {
  username: string;
  password: string;
};

export type LoginResponse = {
  redirect_to: string;
};
