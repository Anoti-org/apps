import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';
import { BehaviorSubject, debounceTime } from 'rxjs';

const MOBILE_SIZE = 1200;

@Component({
  selector: 'lading-page-anoti',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss'],
})

export class LandingPageComponent {
  public standardPrice: number = 10;
  public premiumPrice: number = 10;
  public is6Months: boolean = false;
  public isLanding: boolean = true;
  public isMobile: boolean = window.innerWidth < MOBILE_SIZE;
  public isStandardPopupShowing: boolean = false;
  public isPremiumPopupShowing: boolean = false;
  public standardOptions: Options = {
    hideLimitLabels: true,
    floor: 0,
    ceil: 100,
    step: 10,
  };

  public premiumOptions: Options = {
    hideLimitLabels: true,
    floor: 0,
    ceil: 100,
    step: 10,
  };

  public standardPricesToEconomy: { [key: number]: { price: number, gain: string }} = {
    [10]: { price: 15, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(76), },
    [20]: { price: 29, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(164), },
    [30]: { price: 41, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(276), },
    [40]: { price: 51, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(412), },
    [50]: { price: 61, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(548), },
    [60]: { price: 70, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(696), },
    [70]: { price: 77, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(868), },
    [80]: { price: 84, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(1040), },
    [90]: { price: 90, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(1224), },
    [100]: { price: 93, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(1444), },
  };

  public premiumPricesToEconomy: { [key: number]: { price: number, gain: string }} = {
    [10]: { price: 45, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(8702) },
    [20]: { price: 86, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(17452) },
    [30]: { price: 122, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(26261) },
    [40]: { price: 154, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(35119) },
    [50]: { price: 183, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(44013) },
    [60]: { price: 209, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(52943) },
    [70]: { price: 232, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(61909) },
    [80]: { price: 252, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(70911) },
    [90]: { price: 269, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(79948) },
    [100]: { price: 278, gain: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, minimumFractionDigits: 0,}).format(89082) },
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < MOBILE_SIZE;
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.url.subscribe(url => {
      this.is6Months = url.join('').includes('6mois');
      this.isLanding = !url.join('').includes('contractor') || window.location.hostname === 'landing.anoti.eu';
    });
  }

  public openLegalMentions(): void {
    this.router.navigate(['/legal-mentions'], { relativeTo: this.route });
  }

  public requestDemo(): void {
    if (this.is6Months) {
      window.open('https://outlook.office365.com/owa/calendar/Dmo30minutesCopier@anoti.eu/bookings/s/tUs3RBbkWUe0Da7hOWLd7Q2');
      return;
    }
    window.open('https://outlook.office365.com/owa/calendar/Dmo@anoti.eu/bookings/');
  }

  public defaultPriceChanged($event: any): void {
    console.log('$event.target.value', $event.target.value);
    this.standardPrice = $event.target.value;
  }

  public premiumPriceChanged($event: any): void {
    this.premiumPrice = $event.target.value;
  }

  public toggleStandardPopup(isPopupOpen: boolean): void {
    this.isStandardPopupShowing = isPopupOpen;
  }

  public togglePremiumPopup(isPopupOpen: boolean): void {
    this.isPremiumPopupShowing = isPopupOpen;
  }
}