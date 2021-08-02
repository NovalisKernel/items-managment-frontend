import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

import { User } from '../models';
import { AccountService } from '../services';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private accountService: AccountService) {
    console.log(this.accountService.userValue);
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {}
}
