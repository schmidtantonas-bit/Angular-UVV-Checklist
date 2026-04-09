import { Component, input, output } from "@angular/core";
import { SaveButtonComponent } from "../save-button/save-button";
import { UiButtonDirective } from "../button/ui-button.directive";

@Component({
    selector: "save-delete-container",
    template: `
        <button
            (click)="delete.emit()"
            uiButton
            kind="danger"
            size="s"
            type="button"
            [disabled]="!canDelete()"
        >
            Löschen
        </button>
        <save-button (save)="save.emit()" [isSaved]="isSaved()"></save-button>
    `,
    styles: `
        :host {
            display: flex;
            flex-direction: row-reverse;
            gap: var(--space-xs);
        }
    `,
    imports: [SaveButtonComponent, UiButtonDirective]
})
export class SaveDeleteComponent {
    delete = output();
    save = output();
    isSaved = input(false);
    canDelete = input(false);
}