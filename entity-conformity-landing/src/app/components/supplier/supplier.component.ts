import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'supplier-anoti',
  templateUrl: 'supplier.component.html',
  styleUrls: ['supplier.component.scss'],
})

export class SupplierComponent {
  constructor(private route: ActivatedRoute, private router: Router) { }

  public openLegalMentions(): void {
    this.router.navigate(['/admin'], { relativeTo: this.route });
  }

  public requestDemo(): void {
    window.open('https://calendly.com/guillaume-morelli-3/30min');
  }
}