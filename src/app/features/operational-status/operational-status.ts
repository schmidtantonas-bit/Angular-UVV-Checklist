import { NgClass } from '@angular/common';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiCardDirective } from '@ui/card/ui-card.directive';
import { ChecklistState } from '@pages/checklist/state/checklist.state';

export type OperationalStatusValue = 'full' | 'restricted' | 'not_operational';

interface OperationalStatusOption {
  value: OperationalStatusValue;
  label: string;
  description: string;
  tone: 'ok' | 'warn' | 'danger';
}

const OPERATONAL_STATUS_ITEM_KEY = 'operational-status';

const OPTIONS: readonly OperationalStatusOption[] = [
  {
    value: 'full',
    label: 'Voll einsatzfähig',
    description: 'Gerät kann ohne Einschränkung eingesetzt werden.',
    tone: 'ok'
  },
  {
    value: 'restricted',
    label: 'Eingeschränkt einsatzfähig',
    description: 'Gerät ist einsatzfähig, die Gebrauchstauglichkeit ist eingeschränkt.',
    tone: 'warn'
  },
  {
    value: 'not_operational',
    label: 'Nicht einsatzfähig',
    description: 'Gerät darf nicht eingesetzt werden.',
    tone: 'danger'
  }
] as const;

function isOperationalStatusValue(value: unknown): value is OperationalStatusValue {
  return value === 'full' || value === 'restricted' || value === 'not_operational';
}

@Component({
  selector: 'app-operational-status',
  standalone: true,
  imports: [NgClass, UiButtonDirective, UiCardDirective],
  templateUrl: './operational-status.html',
  styleUrl: './operational-status.scss',
  encapsulation: ViewEncapsulation.None
})
export class OperationalStatusComponent {
  private readonly checklistState = inject(ChecklistState);

  readonly options = OPTIONS;
  readonly selected = signal<OperationalStatusValue | null>(this.readInitialValue());

  select(value: OperationalStatusValue) {
    this.selected.set(value);
    this.checklistState.setItemValue(OPERATONAL_STATUS_ITEM_KEY, 'status', value);
    this.checklistState.setItemResult(OPERATONAL_STATUS_ITEM_KEY, 'label', this.optionLabel(value));
    this.checklistState.setItemStatus(OPERATONAL_STATUS_ITEM_KEY, 'ok');
  }

  clear() {
    this.selected.set(null);
    this.checklistState.setItemValue(OPERATONAL_STATUS_ITEM_KEY, 'status', null);
    this.checklistState.setItemResult(OPERATONAL_STATUS_ITEM_KEY, 'label', null);
    this.checklistState.setItemStatus(OPERATONAL_STATUS_ITEM_KEY, null);
  }

  isSelected(value: OperationalStatusValue) {
    return this.selected() === value;
  }

  private readInitialValue(): OperationalStatusValue | null {
    const stored = this.checklistState.getItem(OPERATONAL_STATUS_ITEM_KEY).values['status'];
    return isOperationalStatusValue(stored) ? stored : null;
  }

  private optionLabel(value: OperationalStatusValue): string {
    return OPTIONS.find((option) => option.value === value)?.label ?? value;
  }
}
