import { Component, ElementRef, inject, signal, Signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigChecklistService } from '@app/config/service/config-service';
import { DocGenerationModel } from '@app/features/doc/doc';
import { ChecklistState } from '@app/pages/checklist/state/checklist.state';
import { ChecklistPersistence } from '@app/pages/checklist/state/checklist.persistence';
import { LoaderService } from '@app/shared/components/ui/loader';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { SignatureComponent } from "@app/shared/components/ui/signature/signature";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [UiButtonDirective, SignatureComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  private readonly config = inject(ConfigChecklistService);
  private readonly checklist = inject(ChecklistState);
  private readonly persistence = inject(ChecklistPersistence);
  private readonly router = inject(Router);
  private readonly loader = inject(LoaderService);
  private readonly download = viewChild.required("download") as any as Signal<ElementRef<HTMLAnchorElement>>;
  public addresses = signal<string[]>([]);
  public mailadr = signal("");
  
  /** Confirmation dialog state */
  public showCompleteDialog = signal(false);

  constructor() {
    fetch("/api/mail")
      .then(r => {
        if (r.ok)
          return r.json();
        else
          return new Promise(() => []);
      })
      .then(r => this.addresses.set(r));
  }

  setMail(event: Event) {
    var mail = event.target as HTMLSelectElement;
    if (mail && mail.value) {
      this.mailadr.set(mail.value);
    }
  }

  async print(type = 'pdf', download = true) {
    const typeLabel = download ? type === 'pdf' ? 'PDF' : 'Word-Dokument' : "E-Mail";
    this.loader.start(`${typeLabel} wird erstellt...`);

    try {
      const documentGenerator = new DocGenerationModel(this.config, this.checklist);
      const out = await documentGenerator.preparePdf();

      if (!out) {
        this.loader.error('Dokument konnte nicht erstellt werden.');
        return;
      }

      const outstr = JSON.stringify(out);
      console.log('request size:', outstr.length);

      if (outstr.length > 10000000) {
        this.loader.error('Dokument ist zu groß (max. 10 MB). Löschen Sie Photos, um die Dateigröße zu minimieren.');
        return;
      }

      const response = await fetch('/api/' + type, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: outstr
      });

      if (!response.ok) {
        throw new Error('Ein Server-Fehler ist aufgetreten. Versuchen Sie es später erneut.');
      }

      if (download) {
        const blob = await response.blob();
        this.download().nativeElement.download = decodeURIComponent(response.headers.get("DocumentTitle") ?? "");
        this.download().nativeElement.href = URL.createObjectURL(blob);
        this.download().nativeElement.click();
        this.loader.success(`${typeLabel} heruntergeladen!`);
      } else {
        this.loader.success('E-Mail gesendet!');
      }
    } catch (error) {
      console.error(error);
      this.loader.error(download ? `${typeLabel} konnte nicht erstellt werden.` : 'E-Mail konnte nicht gesendet werden.');
    }
  }

  mail(to: string) {
    this.print("mail/" + to, false);
  }

  /** Opens the confirmation dialog */
  openCompleteDialog(): void {
    this.showCompleteDialog.set(true);
  }

  /** Closes the confirmation dialog */
  closeCompleteDialog(): void {
    this.showCompleteDialog.set(false);
  }

  /** Confirms and completes the inspection */
  async confirmComplete(): Promise<void> {
    this.showCompleteDialog.set(false);
    await this.persistence.completeSession();
    this.router.navigate(['/wizard']);
  }
}
