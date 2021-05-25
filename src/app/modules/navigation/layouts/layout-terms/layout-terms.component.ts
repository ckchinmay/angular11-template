import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-layout-terms',
  templateUrl: './layout-terms.component.html',
  styleUrls: ['./layout-terms.component.scss']
})

export class LayoutTermsComponent implements OnInit {
  @Input() hideBreadcrumbs = false;
  @Input() static = false;
  @Input() light = false;
  sidenavStyle = 'app-sidenav-light';
  constructor(
  ) {

  }
  ngOnInit() {
    if (this.light) {
      this.sidenavStyle = 'app-sidenav-light';
    }

  }
}
