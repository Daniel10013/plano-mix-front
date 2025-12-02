export type User = {
    id : number,
    name : string,
    email: string,
    type: string
}

export type JwtPayload = {
  sub: string,
  name: string,
  email: string,
  type: 'default' | 'admin',
  iat: Date,
  exp: Date
}