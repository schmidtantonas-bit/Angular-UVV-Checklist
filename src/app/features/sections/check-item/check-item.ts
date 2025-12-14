import {
  booleanAttribute,
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
  effect,
  inject,
  input,
  runInInjectionContext,
  signal
} from '@angular/core';
import { NgClass } from '@angular/common';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiCardDirective } from '@ui/card/ui-card.directive';
import { TextareaComponent } from '@ui/textarea/textarea';
import { CheckItemMediaComponent } from '@features/sections/check-item-media/check-item-media';
import { ChecklistState } from '@pages/checklist/state/checklist.state';

export type CheckStatus = 'ok' | 'na' | 'nok' | null;

export interface CheckItemModel {
  id: string;
  title: string;
  description?: string;
  status: CheckStatus;
  note?: string;
}

@Component({
  selector: 'app-check-item',
  standalone: true,
  imports: [NgClass, UiButtonDirective, UiCardDirective, TextareaComponent, CheckItemMediaComponent],
  templateUrl: './check-item.html',
  styleUrl: './check-item.scss'
})
export class CheckItemComponent implements OnInit {
  model = input.required<CheckItemModel>();
  stateKey = input<string | null>(null);
  editableTitle = input(false, { transform: booleanAttribute });
  showMedia = input(true, { transform: booleanAttribute });
  showSaveButton = input(true, { transform: booleanAttribute });

  @Output() titleChange = new EventEmitter<{ id: string; title: string }>();
  @Output() statusChange = new EventEmitter<CheckStatus>();
  @Output() noteChange = new EventEmitter<{ id: string; note: string }>();

  readonly status = signal<CheckStatus>(null);
  readonly isNokOpen = signal(false);
  readonly photos = signal<File[]>([]);
  readonly note = signal('');

  private currentStateKey: string | null = null;
  private readonly checklistState = inject(ChecklistState, { optional: true });
  private readonly injector = inject(Injector);

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const nextModel = this.model();
        const nextStateKey = this.stateKey() ?? nextModel.id;
        if (nextStateKey !== this.currentStateKey) {
          this.currentStateKey = nextStateKey;
          this.photos.set([]);
        }

        const storedStatus = this.checklistState?.getItem(nextStateKey).status;
        const nextStatus = storedStatus !== undefined ? storedStatus : nextModel.status;
        this.status.set(nextStatus);
        this.isNokOpen.set(nextStatus === 'nok');

        this.note.set(nextModel.note ?? '');
      });
    });
  }

  setStatus(next: Exclude<CheckStatus, null>) {
    this.status.set(next);
    this.isNokOpen.set(false);
    if (this.currentStateKey) this.checklistState?.setItemStatus(this.currentStateKey, next);
    this.statusChange.emit(next);
  }

  toggleNok() {
    if (this.status() !== 'nok') {
      this.status.set('nok');
      this.isNokOpen.set(true);
      if (this.currentStateKey) this.checklistState?.setItemStatus(this.currentStateKey, 'nok');
      this.statusChange.emit('nok');
      return;
    }

    this.isNokOpen.update((current) => !current);
  }

  onTitleInput(id: string, raw: string) {
    this.titleChange.emit({ id, title: raw });
  }

  setNote(id: string, note: string) {
    this.note.set(note);
    this.noteChange.emit({ id, note });
  }
}
