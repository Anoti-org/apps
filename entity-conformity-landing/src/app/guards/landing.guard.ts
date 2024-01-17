import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LandingGuard implements CanActivate {
  constructor(private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    console.log('Location:', window.location.hostname);
    const isLanding = window.location.hostname === 'landing.anoti.eu';
    return isLanding ? true : this.router.parseUrl('/contractor');
  }
}