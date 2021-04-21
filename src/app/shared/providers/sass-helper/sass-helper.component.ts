import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sass-helper',
  templateUrl: './sass-helper.component.html',
  styleUrls: ['./sass-helper.component.scss']
})
export class SassHelperComponent implements OnInit {

  PREFIX = '--';

  constructor() { }

  ngOnInit(): void {
  }

  readProperty(name: string): string {
    const bodyStyles = window.getComputedStyle(document.body);
    return bodyStyles.getPropertyValue(this.PREFIX + name).replace(' ', '');
  }

  setProperty(name: string, value: string): void {
    document.body.style.setProperty(this.PREFIX + name, value);
  }

  setLighterOrDarkerProperty(name: string, value: string, percentage: number): void {
    document.body.style.setProperty(this.PREFIX + name, this.makeLighterOrDarker(value, percentage));
  }

  makeLighterOrDarker(hex: string, percentage: number): string {
    let R = parseInt(String(parseInt(hex.substring(1, 3), 16) * (100 + percentage) / 100));
    let G = parseInt(String(parseInt(hex.substring(3, 5), 16) * (100 + percentage) / 100));
    let B = parseInt(String(parseInt(hex.substring(5, 7), 16) * (100 + percentage) / 100));

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    const RR = ((R.toString(16).length == 1) ? '0' + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length == 1) ? '0' + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length == 1) ? '0' + B.toString(16) : B.toString(16));

    return '#' + RR + GG + BB;
  }
}
