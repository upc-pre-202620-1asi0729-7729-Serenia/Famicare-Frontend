export const environment = {
  production: true,
  /** Mientras no exista el backend de FamiCare, un interceptor simula la API (ver shared/infrastructure/fake-backend.interceptor.ts). */
  useFakeBackend: true,
  apiBase: 'https://api.famicare.app/api/v1',
};
