import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators'
import { EmployeeService } from '../user/employee.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  displayName!: string;
  initial!: string;
  images: string[] = [
    'menu',
    'caret-down',
    'inventory',
    'person',
    'expand-more',
    'close_black',
    'purchase_order',
    'report_black',
    'timeline_black',
  ]

  showFiller: Boolean = false;
  public activeLang: string = 'en';

  mode = 'side';
  open = 'true';
  title = 'Responsive Sidenav Starter';

  panelOpenState = false;

  isExpandedInventory = true;
  showSubmenuInventory: boolean = false;
  isShowingInventory = false;

  isExpandedTerceros = true;
  showSubmenuTerceros: boolean = false;
  isShowingTerceros = false;

  isExpandedPurchase = true;
  showSubmenuPurchase: boolean = false;
  isShowingPurchase = false;

  isExpandedTransversal = true;
  showSubmenuTransversal: boolean = false;
  isShowingTransversal = false;

  constructor(
    private observer: BreakpointObserver,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private service: EmployeeService
  ) {
    this.iconRegistry();
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  iconRegistry(): void {
    this.images.forEach((image) => {
      this.matIconRegistry.addSvgIcon(image,
       this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/'+ image +'.svg')
      );
    });
  }
  onSignOut(){
    //this.service.logout();
  }

}
