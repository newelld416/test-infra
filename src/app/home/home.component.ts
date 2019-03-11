import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Logger } from '@app/core';
import { Card } from '@app/models/card.model';

const log = new Logger('Home');

const CARD_CLASS = 'amway-card';
const CARD_DISABLED_CLASS = 'amway-card-disabled';
const CARDS = [
  {
    primaryTitle: 'ECS',
    description: 'This function is used to manage any infrastructure running on ECS',
    link: 'ecs',
    class: CARD_CLASS
  },
  {
    primaryTitle: 'Environment Admin',
    description: 'This function to help administer our envorinments',
    link: 'env-admin',
    class: CARD_CLASS
  },
  {
    primaryTitle: 'Kafka',
    description: 'This function is used to manage kafka platform',
    link: 'kafka',
    class: CARD_DISABLED_CLASS
  },
  {
    primaryTitle: 'Keep',
    description: 'This function is used to manage the KEEP platform',
    link: 'keep',
    class: CARD_DISABLED_CLASS
  },
  {
    primaryTitle: 'Search Force',
    description: 'This function is used to manage the Seach Force platform',
    link: 'search-force',
    class: CARD_DISABLED_CLASS
  },
  {
    primaryTitle: 'Transactional Messaging',
    description: 'This function is used to manage the Transactional Messaging platform',
    link: 'search-force',
    class: CARD_DISABLED_CLASS
  }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading = false;
  loginForm: FormGroup;
  cards: Card[];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
    this.cards = CARDS;
  }

  ngOnInit() { }

  navigateToFeature(link: string, cardClass: string) {
    if (cardClass === CARD_CLASS) {
      this.router.navigate([`/${link}`]);
    }
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}
