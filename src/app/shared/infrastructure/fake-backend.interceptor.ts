import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Backend simulado de FamiCare.
 *
 * Mientras no exista la API real, este interceptor responde a las mismas rutas REST que usarán
 * las clases `*-api.ts` de cada bounded context, con los datos del prototipo de diseño.
 * Para conectar el backend real basta con poner `useFakeBackend: false` en `environment.ts`.
 *
 * Los datos viven en memoria: se reinician al recargar la página.
 */

// ── Helpers de fechas (todo es relativo a "ahora" para que la demo siempre se vea viva) ──────────
const minutesAgo = (n: number): string => new Date(Date.now() - n * 60_000).toISOString();

const daysAgoAt = (days: number, hour: number, minute: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

/** Lunes de la semana actual (YYYY-MM-DD). */
const mondayOfThisWeek = (): string => {
  const d = new Date();
  const diff = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - diff);
  return d.toISOString().slice(0, 10);
};

// ── Base de datos en memoria ────────────────────────────────────────────────────────────────────
const db = {
  nextId: { user: 2, zone: 3, alert: 5, caregiver: 4 },

  users: [
    {
      id: 1,
      fullName: 'Valeria Campos',
      email: 'valeria@famicare.com',
      phone: '+51 987 654 321',
      role: 'PRIMARY_CAREGIVER',
      plan: 'FAMILY',
      password: 'famicare123',
    },
  ],

  senior: { id: 1, firstName: 'Elena', fullName: 'Elena Campos', initials: 'EC', age: 78 },

  location: {
    id: 1,
    seniorId: 1,
    placeName: 'Parque Castilla',
    address: 'Av. César Vallejo 247',
    district: 'San Isidro, Lima',
    latitude: -12.0967,
    longitude: -77.0365,
    recordedAt: minutesAgo(2),
    accuracyMeters: 12,
    movementState: 'MOVING',
    insideSafeZone: true,
    safeZoneId: 2,
  },

  locationHistory: [
    { id: 6, seniorId: 1, placeName: 'Parque Castilla', address: 'Av. César Vallejo 247', district: 'San Isidro, Lima', latitude: -12.0967, longitude: -77.0365, recordedAt: minutesAgo(2), accuracyMeters: 12, movementState: 'MOVING', insideSafeZone: true, safeZoneId: 2 },
    { id: 5, seniorId: 1, placeName: 'Parque Castilla', address: 'Av. César Vallejo 247', district: 'San Isidro, Lima', latitude: -12.0966, longitude: -77.0361, recordedAt: minutesAgo(40), accuracyMeters: 10, movementState: 'STILL', insideSafeZone: true, safeZoneId: 2 },
    { id: 4, seniorId: 1, placeName: 'Casa de Elena', address: 'Calle Los Cedros 118', district: 'San Isidro, Lima', latitude: -12.0991, longitude: -77.0402, recordedAt: daysAgoAt(1, 19, 5), accuracyMeters: 9, movementState: 'STILL', insideSafeZone: true, safeZoneId: 1 },
    { id: 3, seniorId: 1, placeName: 'Parque Castilla', address: 'Av. César Vallejo 247', district: 'San Isidro, Lima', latitude: -12.0967, longitude: -77.0365, recordedAt: daysAgoAt(1, 17, 40), accuracyMeters: 14, movementState: 'MOVING', insideSafeZone: true, safeZoneId: 2 },
    { id: 2, seniorId: 1, placeName: 'Casa de Elena', address: 'Calle Los Cedros 118', district: 'San Isidro, Lima', latitude: -12.0991, longitude: -77.0402, recordedAt: daysAgoAt(2, 11, 6), accuracyMeters: 8, movementState: 'STILL', insideSafeZone: true, safeZoneId: 1 },
  ],

  safeZones: [
    { id: 1, name: 'Casa de Elena', type: 'HOME', radiusMeters: 300, active: true, address: 'Calle Los Cedros 118, San Isidro' },
    { id: 2, name: 'Parque Castilla', type: 'PARK', radiusMeters: 180, active: true, address: 'Av. César Vallejo 247, San Isidro' },
  ] as Array<Record<string, unknown>>,

  alerts: [
    { id: 4, type: 'BATTERY_RECHARGED', occurredAt: minutesAgo(25), status: 'PENDING', handledBy: null, origin: 'AUTOMATIC', params: { battery: 78 } },
    { id: 3, type: 'LOW_BATTERY', occurredAt: daysAgoAt(1, 18, 42), status: 'HANDLED', handledBy: 'Valeria', origin: 'AUTOMATIC', params: { battery: 15 } },
    { id: 2, type: 'SAFE_ZONE_RETURN', occurredAt: daysAgoAt(2, 11, 6), status: 'HANDLED', handledBy: null, origin: 'AUTOMATIC', params: { zone: 'Casa de Elena' } },
    { id: 1, type: 'HELP_BUTTON_TEST', occurredAt: daysAgoAt(3, 16, 20), status: 'HANDLED', handledBy: null, origin: 'TEST', params: {} },
  ] as Array<Record<string, unknown>>,

  caregivers: [
    { id: 1, fullName: 'Valeria Campos', initials: 'VC', role: 'PRIMARY', availability: 'ONLINE', shiftStart: null, shiftEnd: null, phone: '+51 987 654 321', email: 'valeria@famicare.com', tone: 'coral' },
    { id: 2, fullName: 'Diego Campos', initials: 'DC', role: 'COLLABORATOR', availability: 'AVAILABLE', shiftStart: null, shiftEnd: null, phone: '+51 987 111 222', email: 'diego@famicare.com', tone: 'yellow' },
    { id: 3, fullName: 'Rosa Mendoza', initials: 'RM', role: 'PROFESSIONAL', availability: 'SCHEDULED', shiftStart: '08:00', shiftEnd: '14:00', phone: '+51 987 333 444', email: 'rosa@famicare.com', tone: 'mint' },
  ] as Array<Record<string, unknown>>,

  activity: {
    id: 1,
    weekStart: mondayOfThisWeek(),
    dailySteps: [4044, 6617, 4963, 7720, 6249, 8363, 6984],
    averageSteps: 6420,
    weeklyChangePercent: 8,
    outings: 5,
    outingsInsideSafeZones: 5,
    routineStable: true,
  },

  routineToday: [
    { id: 1, time: '08:10', type: 'LEFT_HOME', state: 'DONE' },
    { id: 2, time: '08:28', type: 'ARRIVED_PARK', state: 'DONE' },
    { id: 3, time: 'NOW', type: 'WALKING_PARK', state: 'CURRENT' },
  ],

  device: {
    id: 1,
    serialNumber: 'FC-2048',
    model: 'Pulsera FC-2048',
    connected: true,
    batteryPercent: 78,
    estimatedDaysLeft: 3,
    lastSignalAt: minutesAgo(2),
    gpsSignal: 'HIGH',
    gpsAccuracyMeters: 12,
    firmwareVersion: '2.4.1',
    lastHelpTestAt: daysAgoAt(3, 16, 20),
  },
};

// ── Routing ─────────────────────────────────────────────────────────────────────────────────────
interface Reply { status: number; body: unknown }
const ok = (body: unknown, status = 200): Reply => ({ status, body });
const fail = (status: number, message: string): never => {
  throw new HttpErrorResponse({ status, statusText: message, error: { message } });
};

const publicUser = (u: (typeof db.users)[number]) => {
  const { password: _password, ...rest } = u;
  return rest;
};

const currentUser = () => db.users[0];

function route(method: string, path: string, body: any): Reply {
  let m: RegExpMatchArray | null;

  // ── Auth ──
  if (method === 'POST' && path === '/auth/sign-in') {
    const user = db.users.find(u => u.email === String(body?.email ?? '').toLowerCase() && u.password === body?.password);
    if (!user) return fail(401, 'INVALID_CREDENTIALS');
    return ok({ token: `fake.${user.id}.${Date.now()}`, user: publicUser(user) });
  }
  if (method === 'POST' && path === '/auth/sign-up') {
    const email = String(body?.email ?? '').toLowerCase();
    if (db.users.some(u => u.email === email)) return fail(409, 'EMAIL_TAKEN');
    const user = { id: db.nextId.user++, fullName: body.fullName, email, phone: body.phone ?? '', role: 'PRIMARY_CAREGIVER', plan: 'FAMILY', password: body.password };
    db.users.push(user);
    return ok({ token: `fake.${user.id}.${Date.now()}`, user: publicUser(user) }, 201);
  }
  if (method === 'POST' && path === '/auth/forgot-password') return ok({});
  if (path === '/auth/me') {
    if (method === 'GET') return ok(publicUser(currentUser()));
    if (method === 'PATCH') {
      Object.assign(currentUser(), { fullName: body.fullName ?? currentUser().fullName, phone: body.phone ?? currentUser().phone });
      return ok(publicUser(currentUser()));
    }
  }

  // ── Senior ──
  if (method === 'GET' && path === '/seniors/current') return ok(db.senior);

  // ── Ubicación ──
  if (method === 'GET' && path === '/locations/current') return ok(db.location);
  if (method === 'GET' && path === '/locations/history') return ok(db.locationHistory);
  if (method === 'POST' && path === '/locations/refresh') {
    db.location.recordedAt = new Date().toISOString();
    db.location.accuracyMeters = 8 + Math.floor(Math.random() * 7);
    db.device.lastSignalAt = db.location.recordedAt;
    return ok(db.location);
  }

  // ── Zonas seguras ──
  if (path === '/safe-zones') {
    if (method === 'GET') return ok(db.safeZones);
    if (method === 'POST') {
      const zone = { id: db.nextId.zone++, name: body.name, type: body.type ?? 'OTHER', radiusMeters: Number(body.radiusMeters), active: true, address: body.address ?? '' };
      db.safeZones.push(zone);
      return ok(zone, 201);
    }
  }
  if ((m = path.match(/^\/safe-zones\/(\d+)$/))) {
    const idx = db.safeZones.findIndex(z => z['id'] === Number(m![1]));
    if (idx < 0) return fail(404, 'NOT_FOUND');
    if (method === 'PATCH') { db.safeZones[idx] = { ...db.safeZones[idx], ...body }; return ok(db.safeZones[idx]); }
    if (method === 'DELETE') { db.safeZones.splice(idx, 1); return ok(null, 204); }
  }

  // ── Alertas ──
  if (method === 'GET' && path === '/alerts') return ok(db.alerts);
  if ((m = path.match(/^\/alerts\/(\d+)\/(handle|reopen)$/)) && method === 'PATCH') {
    const alert = db.alerts.find(a => a['id'] === Number(m![1]));
    if (!alert) return fail(404, 'NOT_FOUND');
    if (m[2] === 'handle') { alert['status'] = 'HANDLED'; alert['handledBy'] = currentUser().fullName.split(' ')[0]; }
    else { alert['status'] = 'PENDING'; alert['handledBy'] = null; }
    return ok(alert);
  }

  // ── Red de cuidado ──
  if (path === '/caregivers') {
    if (method === 'GET') return ok(db.caregivers);
    if (method === 'POST') {
      const name = String(body.fullName ?? '').trim();
      const caregiver = {
        id: db.nextId.caregiver++,
        fullName: name,
        initials: name.split(/\s+/).map((w: string) => w[0]).join('').slice(0, 2).toUpperCase(),
        role: body.role ?? 'COLLABORATOR',
        availability: 'INVITED',
        shiftStart: null,
        shiftEnd: null,
        phone: '',
        email: body.email,
        tone: ['coral', 'yellow', 'mint'][db.caregivers.length % 3],
      };
      db.caregivers.push(caregiver);
      return ok(caregiver, 201);
    }
  }
  if ((m = path.match(/^\/caregivers\/(\d+)$/)) && method === 'DELETE') {
    const idx = db.caregivers.findIndex(c => c['id'] === Number(m![1]));
    if (idx < 0) return fail(404, 'NOT_FOUND');
    if (db.caregivers[idx]['role'] === 'PRIMARY') return fail(409, 'CANNOT_REMOVE_PRIMARY');
    db.caregivers.splice(idx, 1);
    return ok(null, 204);
  }

  // ── Actividad ──
  if (method === 'GET' && path === '/activity/weekly') return ok(db.activity);
  if (method === 'GET' && path === '/activity/today') return ok(db.routineToday);

  // ── Dispositivo ──
  if (method === 'GET' && path === '/devices/current') return ok(db.device);
  if (method === 'POST' && path === '/devices/current/sync') {
    db.device.lastSignalAt = new Date().toISOString();
    return ok(db.device);
  }
  if (method === 'POST' && path === '/devices/current/help-test') {
    const now = new Date().toISOString();
    db.device.lastHelpTestAt = now;
    db.alerts.unshift({ id: db.nextId.alert++, type: 'HELP_BUTTON_TEST', occurredAt: now, status: 'HANDLED', handledBy: null, origin: 'TEST', params: {} });
    return ok(db.device);
  }

  return fail(404, 'NOT_FOUND');
}

export const fakeBackendInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.useFakeBackend || !req.url.startsWith(environment.apiBase)) {
    return next(req);
  }

  const path = req.url.slice(environment.apiBase.length).split('?')[0];

  try {
    const { status, body } = route(req.method, path, req.body);
    return of(new HttpResponse({ status, body })).pipe(delay(250));
  } catch (error) {
    return throwError(() => error).pipe(delay(250));
  }
};
