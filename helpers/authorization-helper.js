import { parseHTML } from 'k6/html';
import http from 'k6/http';

import { environment } from '../environment.js';

export function getToken(userId) {
  const data = { empl_id: `${userId}` };

  http.post(`${environment.host}/login/dev-login`, data);

  return parseHTML(http.get(`${environment.liteHost}/time`).body).find('meta[name=csrf-token]').attr('content');
};
