import { CareAlert } from '../domain/model/care-alert.entity';

/** Claves i18n de un evento: el título cambia según esté pendiente o atendido ("Batería baja" → "Batería baja resuelta"). */
export function alertTitleKey(alert: CareAlert): string {
  return `alerts.types.${alert.type}.${alert.isPending ? 'pending' : 'handled'}`;
}

export function alertDescriptionKey(alert: CareAlert): string {
  return `alerts.types.${alert.type}.description`;
}

/** Origen / responsable que aparece junto a la fecha: "Atendida por Valeria", "Automática", "Prueba mensual"… */
export function alertOrigin(alert: CareAlert): { key: string; params: Record<string, string> } {
  if (alert.isPending)  return { key: 'alerts.origin.pending', params: {} };
  if (alert.handledBy)  return { key: 'alerts.origin.handledBy', params: { name: alert.handledBy } };
  return { key: `alerts.origin.${alert.origin}`, params: {} };
}
