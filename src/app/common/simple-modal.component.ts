import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { JQ_TOKEN } from './JQuery.service';

@Component({
  selector: 'simple-modal',
  template: `
    <div id="{{ elementId }}" #modalcontainer class="modal fade" tabindex="-1">
      <div class="modal-dialog m-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ title }}</h4>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body" (click)="close()">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-dialog {
        max-width: 650px;
      }

      .modal-body {
        overflow-y: scroll;
      }
    `,
  ],
})
export class SimpleModalComponent implements OnInit {
  @Input() title!: string;
  @Input() elementId!: string;
  @Input() closeBodyOnClick!: string;
  @ViewChild('modalcontainer') containerEl!: ElementRef;

  constructor(@Inject(JQ_TOKEN) private $: any) {}

  ngOnInit(): void {}
  close() {
    //console.log('Close:', this.closeBodyOnClick.toLocaleLowerCase());
    if (this.closeBodyOnClick.toLocaleLowerCase() === 'true') {
      this.$(this.containerEl.nativeElement).modal('hide');
    }
  }
}
