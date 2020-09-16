import { getPreviousMonthToday, getToday } from '../helpers/date-helper.js';

import { environment } from '../environment.js';

export class DescribedTimesEndpoint {
  constructor(token) {
    this.body = null;
    this.token = token;
    this.params = { headers: { 'X-CSRF-TOKEN': `${token}` }};
    this.today = getToday();
    this.url = `${environment.liteHost}/api/described-times`;
  }

  createPeriod(duration) {
    const body = {
      can_edit: true,
      day: this.today,
      description: `Created by K6 ${this.today}`,
      duration: duration,
      project_id: 1035,
      task_id: 6205,
      worktype_id: 0,
    };

    return ['POST', this.url, body, this.params];
  }

  deletePeriod(periodId) {
    return ['DELETE', `${this.url}/${periodId}`, this.body, this.params];
  }

  getDescribedPeriods(userId) {
    const url = `${this.url}?employee_id=${userId}&day$gte=${getPreviousMonthToday()}&day$lte=${this.today}`;

    return ['GET', url, this.body, this.params];
  }

  updatePeriod(periodId, duration) {
    const body = {
      assignmentName: "General",
      can_edit: true,
      day: this.today,
      description: `Created by K6 ${this.today}`,
      duration: duration,
      id: periodId,
      nodeNames: ["Workforce Mgmt", "Profiles and Personal Files"],
      project_id: 1035,
      task_id: 6205,
      worktype_id: 0
    };

    return ['PUT', `${this.url}/${periodId}`, body, this.params];
  }
}
