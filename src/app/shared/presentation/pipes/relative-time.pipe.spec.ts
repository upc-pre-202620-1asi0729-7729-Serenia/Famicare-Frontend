import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { RelativeTimePipe } from './relative-time.pipe';

describe('RelativeTimePipe', () => {
  let pipe: RelativeTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [RelativeTimePipe, provideTranslateService()] });
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', {
      time: { justNow: 'ahora mismo', minutesAgo: 'hace {{count}} min', hoursAgo: 'hace {{count}} h' },
    });
    translate.use('es');
    pipe = TestBed.inject(RelativeTimePipe);
  });

  it('returns an empty string without a date', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('formats minutes', () => {
    expect(pipe.transform(new Date(Date.now() - 2 * 60_000).toISOString())).toBe('hace 2 min');
  });

  it('formats hours', () => {
    expect(pipe.transform(new Date(Date.now() - 3 * 3_600_000).toISOString())).toBe('hace 3 h');
  });
});
