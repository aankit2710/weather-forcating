import test from 'node:test';
import assert from 'node:assert/strict';
import { HealthService } from './health-service';

test('HealthService: status returns expected literal', () => {
  const svc = new HealthService();
  assert.equal(svc.status(), 'ok');
});
