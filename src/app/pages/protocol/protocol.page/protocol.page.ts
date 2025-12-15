import { DOCUMENT } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ChecklistState } from '@pages/checklist/state/checklist.state';

const CUSTOMER_DATA_ITEM_KEY = 'customerData';
const CUSTOMER_DATA_VALUES_KEY = 'fields';

type CustomerFieldKey =
  | 'inspectionType'
  | 'customerName'
  | 'address'
  | 'orderNumber'
  | 'licensePlate'
  | 'deviceType'
  | 'bodyNumber'
  | 'mileageKm'
  | 'operatingHours'
  | 'serviceTechnician'
  | 'date'
  | 'location';

type CustomerFieldDef = { key: CustomerFieldKey; label: string };

const CUSTOMER_FIELDS: readonly CustomerFieldDef[] = [
  { key: 'inspectionType', label: 'Inspektionsart' },
  { key: 'customerName', label: 'Kunde' },
  { key: 'address', label: 'Adresse' },
  { key: 'orderNumber', label: 'Auftragsnummer' },
  { key: 'licensePlate', label: 'Kennzeichen' },
  { key: 'deviceType', label: 'Gerätetyp' },
  { key: 'bodyNumber', label: 'Aufbaunummer' },
  { key: 'mileageKm', label: 'Kilometerstand' },
  { key: 'operatingHours', label: 'Betriebsstunden' },
  { key: 'serviceTechnician', label: 'Servicetechniker' },
  { key: 'date', label: 'Datum' },
  { key: 'location', label: 'Ort' }
] as const;

function coerceDisplayValue(value: unknown): string {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === '' ? '—' : trimmed;
  }

  if (typeof value === 'number' && Number.isFinite(value)) return String(value);

  return '—';
}

function coerceCustomerFields(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object') return {};
  return value as Record<string, unknown>;
}

@Component({
  selector: 'app-protocol-page',
  standalone: true,
  imports: [],
  templateUrl: './protocol.page.html',
  styleUrl: './protocol.page.scss'
})
export class ProtocolPageComponent {
  private readonly checklistState = inject(ChecklistState);
  private readonly document = inject(DOCUMENT);

  private readonly customerFieldsRaw = computed(
    () => this.checklistState.getItem(CUSTOMER_DATA_ITEM_KEY).values[CUSTOMER_DATA_VALUES_KEY]
  );

  readonly customerRows = computed(() => {
    const fields = coerceCustomerFields(this.customerFieldsRaw());
    return CUSTOMER_FIELDS.map((def) => ({
      key: def.key,
      label: def.label,
      value: coerceDisplayValue(fields[def.key])
    }));
  });

  ngOnInit(): void {
    this.document.body.classList.add('print-protocol');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('print-protocol');
  }
}
