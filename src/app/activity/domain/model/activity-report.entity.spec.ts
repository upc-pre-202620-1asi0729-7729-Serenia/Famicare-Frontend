import { ActivityReport } from './activity-report.entity';

describe('ActivityReport', () => {
  const report = new ActivityReport({
    id: 1, weekStart: '2026-05-11', dailySteps: [4044, 6617, 4963, 7720, 6249, 8363, 6984],
    averageSteps: 6420, weeklyChangePercent: 8, outings: 5, outingsInsideSafeZones: 5, routineStable: true,
  });

  it('builds seven days and gives the best day a 91% bar', () => {
    const days = report.days;
    expect(days.length).toBe(7);
    expect(Math.max(...days.map(d => d.heightPercent))).toBe(91);
  });

  it('knows when every outing was inside a safe zone', () => {
    expect(report.allOutingsSafe).toBeTrue();
  });
});
