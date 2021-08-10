import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { User } from '../models';
import { AccountService } from '../services';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;
  user: User;
  constructor(
    public dialog: MatDialog,
    private accountService: AccountService
  ) {
    this.user = this.accountService.userValue;
  }
  openDialog() {
    const dialogRef = this.dialog.open(LogoutDialog, {
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
  ngOnInit(): void {}
}

@Component({
  selector: 'logout-dialog',
  templateUrl: 'logout-dialog.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutDialog {
  constructor(
    private accountService: AccountService,
    private dialogRef: MatDialog
  ) {}
  handleLogout() {
    this.accountService.logout();
    this.dialogRef.closeAll();
  }
}
