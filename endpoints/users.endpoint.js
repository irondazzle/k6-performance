import { environment } from '../environment.js';

export class UsersEndpoint {
  constructor(token) {
    this.body = null;
    this.token = token;
    this.params = { headers: { 'X-CSRF-TOKEN': `${token}` }};
    this.url = `${environment.liteHost}/api/users`;
  }

  getUserData() {
    return ['GET', `${this.url}/me`, this.body, this.params];
  }

  getUserPermissions() {
    return ['GET', `${this.url}/me/permissions`, this.body, this.params];
  }

  getUserProjectTree() {
    return ['GET', `${this.url}/me/project-tree`, this.body, this.params];
  }
}
