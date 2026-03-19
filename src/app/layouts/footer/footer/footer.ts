import { Component, inject } from '@angular/core';
import { OVERLOAD_FIELD_UI, OVERLOAD_RESULTS_UI } from '@app/config/overload/overload-ui';
import { ConfigChecklistService } from '@app/config/service/config-service';
import { OverloadField, OverloadValues } from '@app/features/overload/overload.types';
import { CheckStatus } from '@app/features/sections/check-item/check-item';
import { SpeedCheckRowResult } from '@app/features/speed-check/speed-check.domain';
import { ChecklistState } from '@app/pages/checklist/state/checklist.state';
import { UiButtonDirective } from '@ui/button/ui-button.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [UiButtonDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  private readonly config = inject(ConfigChecklistService);
  private readonly checklist = inject(ChecklistState);

  private readonly maxImageSize = 600;

  // crucial step for ensuring that the request is small enough to be sent
  private async compressImage(file: File) {
    if (!file.type.startsWith('image/'))
      return null;
    
    const blob = new Blob([await file.arrayBuffer()]);
    const imgurl = URL.createObjectURL(blob);
    const img = new Image();
    img.src = imgurl;
    await img.decode();

    var width = img.width, height = img.height;
    if (width > this.maxImageSize || height > this.maxImageSize) {
      if (width > height) {
        height = height / width * this.maxImageSize;
        width = this.maxImageSize;
      }
      else {
        width = width / height * this.maxImageSize;
        height = this.maxImageSize;
      }
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      img.remove();
      return null;
    }

    ctx.drawImage(img, 0, 0, width, height);
    const resimg = canvas.toDataURL('image/jpeg', 0.8);
    canvas.remove();
    img.remove();
    return resimg;
  }

  private async preparePdfItem(section: {items: any[]}, item: {id: string, title: string}, check: { status: CheckStatus, note?: string, measurement?: string, photos?: File[] }) {
    const i = {
      id: item.id,
      title: item.title,
      status: check.status,
      note: check.note,
      measurement: check.measurement,
      photos: [] as string[]
    };
    section.items.push(i);

    if (!check.photos)
      return;

    // photos
    for (const photo of check.photos) {
      var f = await this.compressImage(photo);
      if (!f)
        continue;
      i.photos.push(f);
    }
  }

  private async preparePdf() {
    const c = this.config.getCurrentConfig();
    const ch = this.checklist.snapshot()?.items;
    if (!c || !ch)
      return null;

    const out = {
      overview: {
        title: c.overview.title,
        subtitle: c.overview.subtitle
      },
      customerData: ch['customerData'].values['fields'],
      sections: [] as any[]
    };

    // add the section items
    for (const value of c.sections) {
      const secout = { id: value.id, title: value.title, items: [] as any[] };
      out.sections.push(secout);

      for (const item of value.items) {
        const check = this.checklist.getItem(value.id + ":" + item.id);
        // just for testing, remove later
        //if (!check?.status)
          //continue;
        await this.preparePdfItem(secout, item, check);
      }

      // this could be optimized but the config IDs and checklist entries are a little messsy as of right now, section:id format does not always apply and some values are stored in the "values" container
      switch (value.id) {
        // additional items
        case 'sec-misc-1': {
          for (const key in ch) {
            if (key.startsWith('ZP-')) {
              const zp = ch[key];
              await this.preparePdfItem(secout, { id: key, title: (zp.values['title'] as string) ?? key }, zp);
            }
          }
          break;
        }
        // add the measurements and results for the overload check
        case 'sec-overload-1': {
          const check = ch['overload'];
          const measurements = check?.values['measurements'] as OverloadValues;
          // not very clean, but it gets the job done and can easily be expanded.
          if (measurements) {
            for (const key in measurements) {
              const k = key as OverloadField;
              const ui = OVERLOAD_FIELD_UI[k];
              if (!ui || measurements[k] === null)
                continue;
              await this.preparePdfItem(secout, { id: k, title: ui.title }, { status: null, measurement: measurements[k] + "mm" });
            }
          }

          // this may need adjustments, maybe include the titles and IDs in the config or reorganize the summary structure (see Speed Checks below)
          const evalu = check?.results['evaluation'] as any;
          if (evalu) {
            if (evalu.diffPreloadAfterMm !== null) {
              const calc1stat: CheckStatus = evalu.withinThresholdPreloadAfter ? 'ok' : 'nok';
              const calc1note =
                calc1stat === 'ok' ? 'Bestanden - Grenzwert ≤ 100 mm eingehalten' : 'Grenzwert 100mm überschritten';
              await this.preparePdfItem(secout, { id: 'diff1', title: OVERLOAD_RESULTS_UI['diffPreloadAfter'].title }, { status: calc1stat, note: calc1note, measurement: evalu.diffPreloadAfterMm + 'mm' });
            }
            if (evalu.diffLoadStart10Mm !== null) {
              const calc2stat: CheckStatus = evalu.withinThresholdLoadStart10 ? 'ok' : 'nok';
              const calc2note =
                calc2stat === 'ok' ? 'Bestanden - Grenzwert ≤ 100 mm eingehalten' : 'Grenzwert 100mm überschritten';
              await this.preparePdfItem(secout, { id: 'diff2', title: OVERLOAD_RESULTS_UI['diffLoadStart10'].title }, { status: calc2stat, note: calc2note, measurement: evalu.diffLoadStart10Mm + 'mm' });
            }
          }
          break;
        }
        // add the batteries to the output. if included in the config, they could appear without having to be mentioned here explicitly.
        case 'sec-battery-1': {
          const b1 = ch['battery1'];
          if (b1)
            await this.preparePdfItem(secout, { id: 'battery1', title: 'Batterie 1' }, b1);
          const b2 = ch['battery2'];
          if (b2)
            await this.preparePdfItem(secout, { id: 'battery2', title: 'Batterie 2' }, b2);
          break;
        }
        // add speed checks, nice structure :)
        case 'sec-speed-1': {
          const speed = ch['speed-check']?.results;
          if (speed) {
            const evaluation = speed['evaluation'] as SpeedCheckRowResult[];
            for (const e of evaluation) {
              if (e.measuredSec === null)
                continue;
              const note =
                (e.withinTolerance ? 'Bestanden' : 'Nicht im Sollbereich') +
                ' - Soll: ' +
                e.referenceSec +
                's ± ' +
                e.toleranceSec +
                's - Diff: ' +
                e.deltaSec +
                's';
              await this.preparePdfItem(secout, { id: e.key, title: e.label }, { status: e.withinTolerance ? 'ok' : 'nok', note, measurement: e.measuredSec + 's' });
            }
            const summary = speed['summary'] as { okCount: number, filledCount: number };
            await this.preparePdfItem(secout, { id: 'summary', title: 'Zusammenfassung' }, {
              status: summary.okCount >= summary.filledCount ? 'ok' : 'nok',
              note: summary.okCount >= summary.filledCount ? 'Alle Messwerte sind im Sollbereich.' : 'Nicht alle Messwerte sind im Sollbereich.',
              measurement: summary.okCount + ' / ' + summary.filledCount
            });
          }
          break;
        }
      }
    }

    return out;
  }

  print(type = 'pdf') {
    this.preparePdf().then(out => {
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
            .then(r => r.blob())
            .then(b => window.open(URL.createObjectURL(b), '_blank'))
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
