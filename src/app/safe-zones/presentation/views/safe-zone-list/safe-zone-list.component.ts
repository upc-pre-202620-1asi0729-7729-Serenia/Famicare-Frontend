import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeadingComponent } from '../../../../shared/presentation/components/page-heading/page-heading.component';
import { MapComponent } from '../../../../shared/presentation/components/map/map.component';
import { IconComponent, IconName } from '../../../../shared/presentation/components/icon/icon.component';
import { SafeZoneStore } from '../../../application/safe-zone.store';
import { SeniorStore } from '../../../../senior/application/senior.store';
import {
  MAX_RADIUS_METERS, MIN_RADIUS_METERS, SAFE_ZONE_TYPES, SafeZone, SafeZoneType,
} from '../../../domain/model/safe-zone.entity';

/** "Zonas seguras": geocercas que protegen los recorridos cotidianos. */
@Component({
  selector: 'app-safe-zone-list',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, PageHeadingComponent, MapComponent, IconComponent],
  templateUrl: './safe-zone-list.component.html',
  styleUrl: './safe-zone-list.component.css',
})
export class SafeZoneListComponent {
  readonly store = inject(SafeZoneStore);
  readonly senior = inject(SeniorStore).senior;
  private readonly fb = inject(FormBuilder);

  readonly types = SAFE_ZONE_TYPES;
  readonly minRadius = MIN_RADIUS_METERS;
  readonly maxRadius = MAX_RADIUS_METERS;

  readonly modalOpen = signal(false);
  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    name:    ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    type:    ['OTHER' as SafeZoneType, Validators.required],
    radius:  [200, [Validators.required, Validators.min(MIN_RADIUS_METERS), Validators.max(MAX_RADIUS_METERS)]],
    address: ['', Validators.maxLength(120)],
  });

  readonly descriptionKey = computed(() => {
    const n = this.store.zones().length;
    return n === 0 ? 'safeZones.description.none' : n === 1 ? 'safeZones.description.one' : 'safeZones.description.many';
  });

  readonly homeZone = computed(() => this.store.zones().find(z => z.type === 'HOME') ?? null);
  readonly parkZone = computed(() => this.store.zones().find(z => z.type === 'PARK') ?? null);

  iconFor(zone: SafeZone): IconName {
    return zone.type === 'HOME' ? 'home' : zone.type === 'PARK' ? 'location' : 'shield';
  }

  openModal(): void {
    this.form.reset({ name: '', type: 'OTHER', radius: 200, address: '' });
    this.submitted.set(false);
    this.modalOpen.set(true);
  }

  closeModal(): void { this.modalOpen.set(false); }

  invalid(control: 'name' | 'radius'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || this.submitted());
  }

  submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    this.store.create(
      { name: v.name.trim(), type: v.type, radiusMeters: v.radius, address: v.address.trim() },
      () => this.closeModal()
    );
  }
}
