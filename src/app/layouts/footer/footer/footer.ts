import { Component, ElementRef, inject, Signal, viewChild } from '@angular/core';
import { ConfigChecklistService } from '@app/config/service/config-service';
import { DocGenerationModel } from '@app/features/doc/doc';
import { ChecklistState } from '@app/pages/checklist/state/checklist.state';
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
  private readonly download = viewChild.required("download") as any as Signal<ElementRef<HTMLAnchorElement>>;

  print(type = 'pdf') {
    const documentGenerator = new DocGenerationModel(this.config, this.checklist);
    documentGenerator.preparePdf().then(out => {
      if (out) {
        var outstr = JSON.stringify(out);
        console.log('request size:', outstr.length);

        // check if too big, the backend WILL limit requests to 10 MB. if the request is above 10 MB it will throw an HTTP error
        if (outstr.length > 10000000) {
          // Add some sort of on-screen pop-up telling the user they went above 10 MB limit
        }
        else {
          // allowed types are pdf and docx (word)
          fetch('/api/' + type, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: outstr })
            .then(r => {
              this.download().nativeElement.setAttribute("download", decodeURIComponent(r.headers.get("DocumentTitle") ?? ""));
              return r.blob();
            })
            .then(b => {
              this.download().nativeElement.href = URL.createObjectURL(b);
              this.download().nativeElement.click();
            })
            .catch(c => {
              // let the user know something went wrong
              console.log(c);
            });
        }
      }
      // add some sort of on-screen pop-up telling the user tha something went wrong
    });
  }
}
