import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import packageInfo from '../../../../package.json';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  iframeSrc = "#";
  public appVersion = packageInfo.version;
  public currentYear: string = DateTime.now().toFormat('y');

  selectComponent(route: string) {
    // Update the iframe source based on the selected route
    const iframe = document.getElementById('myIframe') as HTMLIFrameElement;
    iframe.src = route;
  }
}
