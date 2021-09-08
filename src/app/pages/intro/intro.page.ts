import { Component, OnInit } from '@angular/core';
import { App } from 'src/app/models/app.model';
import { LanguageService } from '../../services/language.service';
import { Router } from '@angular/router';
import { Page4 } from '../../models/page4.model';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
app: App;
textos: Page4;

  constructor(private idioma: LanguageService,
              private route: Router) { }

  ngOnInit() {
    this.app = this.idioma.getApp();
  }

  disableIntro() {
    this.app.tutorial = false;
    this.idioma.setApp(this.app);
    this.route.navigateByUrl('/home');
  }
}
