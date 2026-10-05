import { CareAlert } from './care-alert.entity';

describe('CareAlert', () => {
  const base = { id: 1, type: 'LOW_BATTERY' as const, occurredAt: '2026-05-13T18:42:00Z', handledBy: null, origin: 'AUTOMATIC' as const, params: {} };

  it('is pending only while its status is PENDING', () => {
    expect(new CareAlert({ ...base, status: 'PENDING' }).isPending).toBeTrue();
    expect(new CareAlert({ ...base, status: 'HANDLED' }).isPending).toBeFalse();
  });

  it('maps its type to a design icon', () => {
    expect(new CareAlert({ ...base, status: 'PENDING' }).icon).toBe('battery');
    expect(new CareAlert({ ...base, type: 'SAFE_ZONE_RETURN', status: 'PENDING' }).icon).toBe('shield');
  });
});
