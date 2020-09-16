import http from 'k6/http';
import { Trend } from 'k6/metrics';

import { DescribedTimesEndpoint } from '../endpoints/described-times.endpoint.js';
import { TrackedTimesEndpoint } from '../endpoints/tracked-times.endpoint.js';
import { UsersEndpoint } from '../endpoints/users.endpoint.js';

import { getToken } from '../helpers/authorization-helper.js';

const data = JSON.parse(open('../helpers/users-helper.json'));
const trends = {
  getDescribedPeriodsTrend: new Trend('get-described-periods'),
  getTrackedPeriodsTrend: new Trend('get-tracked-periods'),
  getUserDataTrend: new Trend('get-user-data'),
  getUserPermissionsTrend: new Trend('get-user-permissions'),
  getUserProjectTreeTrend: new Trend('get-user-project-tree')
};

export default function getDescribedAndTrackedPeriodsScenario() {
  const user = data.users[Math.floor(Math.random() * data.users.length)];
  const token = getToken(user.id);
  
  const describedTimesEndpoint = new DescribedTimesEndpoint(token);
  const trackedTimesEndpoint = new TrackedTimesEndpoint(token);
  const usersEndpoint = new UsersEndpoint(token);

  const [describedPeriodsResponse, trackedPeriodsResponse, userDataResponse, userPermissionsResponse, userProjectTreeResponse] = http.batch([
    describedTimesEndpoint.getDescribedPeriods(user.id),
    trackedTimesEndpoint.getTrackedPeriods(user.id),
    usersEndpoint.getUserData(),
    usersEndpoint.getUserPermissions(),
    usersEndpoint.getUserProjectTree()
  ]);

  trends.getDescribedPeriodsTrend.add(describedPeriodsResponse.timings.duration);
  trends.getTrackedPeriodsTrend.add(trackedPeriodsResponse.timings.duration);
  trends.getUserDataTrend.add(userDataResponse.timings.duration);
  trends.getUserPermissionsTrend.add(userPermissionsResponse.timings.duration);
  trends.getUserProjectTreeTrend.add(userProjectTreeResponse.timings.duration);
};
