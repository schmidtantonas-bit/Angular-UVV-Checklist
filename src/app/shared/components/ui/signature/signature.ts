import { Component, ElementRef, inject, signal, ViewChild } from "@angular/core";
import { ChecklistState } from "@app/pages/checklist/state/checklist.state";
import { UiButtonDirective } from "../button/ui-button.directive";
import { SaveButtonComponent } from "../save-button/save-button";

export const SIGNATURE_ITEM_KEY = "technician-signature-1";
export const SIGNATURE_VALUE_KEY_IMG = "signature";
export const SIGNATURE_VALUE_KEY_WIDTH = "signature-width";
export const SIGNATURE_VALUE_KEY_HEIGHT = "signature-height";

@Component({
    selector: "signature",
    templateUrl: "signature.html",
    styleUrl: "signature.css",
    imports: [UiButtonDirective, SaveButtonComponent]
})
export class SignatureComponent {
    readonly state = inject(ChecklistState);
    @ViewChild("canvas") canvas?: ElementRef<HTMLCanvasElement>;
    ctx?: CanvasRenderingContext2D | null;
    w = 100;
    h= 150;
    dirty = signal(false);
    delete = signal(false);

    ngAfterViewInit() {
        this.ctx = this.canvas?.nativeElement.getContext("2d");
        this.updateContainer();
    }

    public saveSignature() {
        this.state.setItemStatus(SIGNATURE_ITEM_KEY, "ok");
        if (this.canvas) {
            const img = this.canvas.nativeElement.toDataURL("image/png", 1);
            this.state.setItemValue(SIGNATURE_ITEM_KEY, SIGNATURE_VALUE_KEY_IMG, img);
            this.state.setItemValue(SIGNATURE_ITEM_KEY, SIGNATURE_VALUE_KEY_WIDTH, this.w);
            this.state.setItemValue(SIGNATURE_ITEM_KEY, SIGNATURE_VALUE_KEY_HEIGHT, this.h);
        }
        this.dirty.set(false);
    }

    public clearSignature() {
        this.ctx?.reset();
        this.state.setItemStatus(SIGNATURE_ITEM_KEY, null);
        this.state.setItemValue(SIGNATURE_ITEM_KEY, SIGNATURE_VALUE_KEY_IMG, null);
        this.state.setItemValue(SIGNATURE_ITEM_KEY, SIGNATURE_VALUE_KEY_WIDTH, null);
        this.state.setItemValue(SIGNATURE_ITEM_KEY, SIGNATURE_VALUE_KEY_HEIGHT, null);
        this.dirty.set(false);
        this.delete.set(false);
        this.drawing = false;
    }

    private drawing = false;

    public updateContainer() {
        if (this.canvas) {
            this.w = this.canvas.nativeElement.offsetWidth;
            this.h = this.canvas.nativeElement.offsetHeight;
        }
    }

    private normX(x: number) {
        return x / this.w * 800;
    }

    private normY(y: number) {
        return y / this.h * 300;
    }

    public startDraw(event: PointerEvent) {
        if (this.drawing)
            return;

        this.drawing = true;
        if (this.ctx)
            this.ctx.lineWidth = 2;
        this.ctx?.beginPath();
        this.ctx?.moveTo(this.normX(event.offsetX), this.normY(event.offsetY));
        this.dirty.set(true);
        this.delete.set(true);
    }

    public updateDraw(event: PointerEvent) {
        if (!this.drawing)
            return;

        this.ctx?.lineTo(this.normX(event.offsetX), this.normY(event.offsetY));
        this.ctx?.stroke();
        this.ctx?.closePath();
        this.ctx?.beginPath();
        this.ctx?.moveTo(this.normX(event.offsetX), this.normY(event.offsetY));
    }

    public stopDrawing(event: PointerEvent) {
        if (!this.drawing)
            return;

        this.drawing = false;
        this.ctx?.lineTo(this.normX(event.offsetX), this.normY(event.offsetY));
        this.ctx?.stroke();
        this.ctx?.closePath();
    }
}