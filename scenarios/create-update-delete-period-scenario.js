import http from 'k6/http';
import { Trend } from 'k6/metrics';

import { DescribedTimesEndpoint } from '../endpoints/described-times.endpoint.js';

import { getToken } from '../helpers/authorization-helper.js';

const data = JSON.parse(open('../helpers/users-helper.json'));
const trends = {
  createPeriodTrend: new Trend('create-period-trend'),
  deletePeriodTrend: new Trend('delete-period-trend'),
  updatePeriodTrend: new Trend('update-period-trend')
};

export default function createUpdateAndDeletePeriodScenario() {
  const user = data.users[Math.floor(Math.random() * data.users.length)];
  const describedTimesEndpoint = new DescribedTimesEndpoint(getToken(user.id));
  const duration = 10;
  const updatedDuration = 35;

  const createPeriodResponse = http.request(...describedTimesEndpoint.createPeriod(duration));
  const periodId = JSON.parse(createPeriodResponse.body).data.id;

  const updatePeriodResponse = http.request(...describedTimesEndpoint.updatePeriod(periodId, updatedDuration));

  const deletePeriodResponse = http.request(...describedTimesEndpoint.deletePeriod(periodId));

  trends.createPeriodTrend.add(createPeriodResponse.timings.duration);
  trends.updatePeriodTrend.add(updatePeriodResponse.timings.duration);
  trends.deletePeriodTrend.add(deletePeriodResponse.timings.duration);
};
