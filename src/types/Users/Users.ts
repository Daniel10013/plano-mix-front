export type User = {
  id: number,
  name: string,
  email: string,
  type: "admin" | "default"
}

export type UserCreate = Omit<User, "id"> & {
  password: string;
};

export type JwtPayload = {
  sub: string,
  name: string,
  email: string,
  type: 'default' | 'admin',
  iat: number,
  exp: number
}