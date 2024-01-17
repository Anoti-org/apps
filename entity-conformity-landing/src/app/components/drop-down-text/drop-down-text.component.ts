import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'drop-down-text',
  templateUrl: 'drop-down-text.component.html',
  styleUrls: ['drop-down-text.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
      })),
      state('closed', style({
        height: '0',
      })),
      transition('open => closed', [
        animate('.3s ease-in')
      ]),
      transition('closed => open', [
        animate('.3s ease-in')
      ]),
    ]),
  ],
})

export class DropDownTextComponent {
  @Input() public title: string = '';
  @Input() public content: string = '';
  @Input() public subContent: string = '';
  @Input() public set isAnimationEnabled(value: boolean) {
    if (this.shouldAnimate && !value) { 
      this.isOpen = true;
    }
    if (!this.shouldAnimate && value) {
      this.isOpen = false;
    }
    this.shouldAnimate = value;
  };

  public shouldAnimate = true;
  public isOpen = false;

  public open() {
    if (!this.shouldAnimate) { return; }
    this.isOpen = true;
  }

  public close() {
    if (!this.shouldAnimate) { return; }
    this.isOpen = false;
  }
}