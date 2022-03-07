import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

// export const requests = new Counter ('http_reqs');

export const options = {
  vus: 100,
  duration: '15s'
}

// const url = `http://localhost:3000/products/4/styles`;
const url = `http://localhost:3000/products`;


export default function () {
  const res = http.get(url);
  sleep(1);
  check(res, {
    'is status 200': r => r.status === 200,
    'Return time < 2ms': r => r.timings.duration < 2,
    'Return time < 3ms': r => r.timings.duration < 3,
    'Return time < 5ms': r => r.timings.duration < 5,
    'Return time < 10ms': r => r.timings.duration < 10,
    'Return time < 20ms': r => r.timings.duration < 20,
    'Return time < 50ms': r => r.timings.duration < 50,
    'Return time < 60ms': r => r.timings.duration < 60,
    'Return time < 100ms': r => r.timings.duration < 100,
    'Return time < 200ms': r => r.timings.duration < 200,
    'Return time < 500ms': r => r.timings.duration < 500
  })
}