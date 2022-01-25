export const authRole = {
  admin: ["admin"],
  user: ["user", "admin"],
};

export enum RoutePermittedRole {
  Admin = 'admin',
  User = 'user',
}

export const initialUrl = '/clients/all'; // this url will open after login
