import { ConfigChecklistService } from '@app/config/service/config-service';
import { ChecklistState } from '@app/pages/checklist/state/checklist.state';
import { OVERLOAD_FIELD_UI, OVERLOAD_RESULTS_UI } from '@app/config/overload/overload-ui';
import { diffStatusNote, evaluateDiffStatus, isDiffStatus, type DiffStatus } from '@app/features/overload/overload.domain';
import { OverloadField, OverloadValues } from '@app/features/overload/overload.types';
import { CheckStatus } from '@app/features/sections/check-item/check-item';
import { SpeedCheckRowResult } from '@app/features/speed-check/speed-check.domain';
import { OPERATONAL_STATUS_ITEM_KEY } from '../operational-status/operational-status';

export class DocGenerationModel {
  private readonly config: ConfigChecklistService;
  private readonly checklist: ChecklistState;

  constructor(config: ConfigChecklistService, state: ChecklistState) {
    this.config = config;
    this.checklist = state;
  }

  private readonly maxImageSize = 600;

  private overloadPdfStatus(status: DiffStatus): CheckStatus {
    if (status === 'ok') return 'ok';
    if (status === 'followUpRequired') return 'na';
    return 'nok';
  }

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

  public async preparePdf() {
    const c = this.config.getCurrentConfig();
    const ch = this.checklist.snapshot()?.items;
    if (!c || !ch)
      return null;

    const out = {
      overview: {
        title: c.overview.title,
        subtitle: c.overview.subtitle,
        status: ch[OPERATONAL_STATUS_ITEM_KEY]?.values['status'],
        statusLabel: ch[OPERATONAL_STATUS_ITEM_KEY]?.results['label']
      },
      customerData: ch['customerData'].values['fields'],
      sections: [] as any[]
    };

    // add the section items
    for (const value of c.sections) {
      const secout = { id: value.id, title: value.pdfTitle ?? value.title, items: [] as any[] };
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
        // operational status, stored in overview
        case 'sec-operational-status-1': {
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
              const diff1Status = isDiffStatus(evalu.diffPreloadAfterStatus)
                ? evalu.diffPreloadAfterStatus
                : evaluateDiffStatus(evalu.diffPreloadAfterMm);
              await this.preparePdfItem(
                secout,
                { id: 'diff1', title: OVERLOAD_RESULTS_UI['diffPreloadAfter'].title },
                {
                  status: this.overloadPdfStatus(diff1Status),
                  note: diffStatusNote(diff1Status) ?? undefined,
                  measurement: evalu.diffPreloadAfterMm + 'mm'
                }
              );
            }
            if (evalu.diffLoadStart10Mm !== null) {
              const diff2Status = isDiffStatus(evalu.diffLoadStart10Status)
                ? evalu.diffLoadStart10Status
                : evaluateDiffStatus(evalu.diffLoadStart10Mm);
              await this.preparePdfItem(
                secout,
                { id: 'diff2', title: OVERLOAD_RESULTS_UI['diffLoadStart10'].title },
                {
                  status: this.overloadPdfStatus(diff2Status),
                  note: diffStatusNote(diff2Status) ?? undefined,
                  measurement: evalu.diffLoadStart10Mm + 'mm'
                }
              );
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
              const stateLabel = e.withinTolerance
                ? 'Bestanden'
                : e.measuredSec < e.referenceSec
                  ? 'zu schnell'
                  : 'zu langsam';
              const note =
                stateLabel +
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
}