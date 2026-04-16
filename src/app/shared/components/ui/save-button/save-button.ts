import { Component, input, output } from "@angular/core";
import { UiButtonDirective } from "../button/ui-button.directive";

@Component({
    selector: "save-button",
    templateUrl: "save-button.html",
    styleUrl: "save-button.css",
    imports: [UiButtonDirective]
})
export class SaveButtonComponent {
    isSaved = input(false);
    canSave = input(false);
    save = output();
}