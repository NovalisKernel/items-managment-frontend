import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Item } from '../models';
import { ItemsService } from '../services';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;
  dataSource = new MatTableDataSource<Array<Item>>([]);
  displayedColumns = ['imageUrl', 'name', 'location', 'description', 'action'];
  loading!: boolean;

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.loading = true;
    this.itemsService.getItems().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<Array<Item>>(data);
      this.loading = false;
    });
  }
  handleCreate() {
    this.router.navigate(['../create-item'], { relativeTo: this.route });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getRow(row: any) {
    this.router.navigate(['/edit', row.id]);
  }
  openDialog(row: any) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      restoreFocus: false,
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Deleted') {
        this.getItems();
      }
    });
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteDialog {
  local_data: any;
  constructor(
    private itemService: ItemsService,
    private dialogRef: MatDialogRef<DeleteDialog>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Item
  ) {
    this.local_data = { ...data };
  }
  handleDelete() {
    this.itemService.deleteItem(this.local_data.id).subscribe(() => {
      this.dialogRef.close({ event: 'Deleted' });
    });
  }
}
