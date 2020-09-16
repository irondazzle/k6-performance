import { getPreviousMonthToday, getToday } from '../helpers/date-helper.js';

import { environment } from '../environment.js';

export class TrackedTimesEndpoint {
  constructor(token) {
    this.token = token;
    this.body = null;
    this.params = { headers: { 'X-CSRF-TOKEN': `${token}` } };
    this.url = `${environment.liteHost}/api/tracked-times`;
  }

  getTrackedPeriods(userId) {
    const url = `${this.url}?employee_id=${userId}&day$gte=${getPreviousMonthToday()}&day$lte=${getToday()}`;

    return ['GET', url, this.body, this.params];
  }
}
