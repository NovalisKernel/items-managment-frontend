import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ItemsService } from '../services';
import { Item } from '../models';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  editItemForm!: FormGroup;
  loading = false;
  submitted = false;
  imageSrc!: string;
  itemId!: number;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemsService: ItemsService
  ) {
    this.subscription = route.params.subscribe(
      (params) => (this.itemId = params['id'])
    );
  }

  ngOnInit(): void {
    this.editItemForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageFile: [''],
    });
    this.itemsService
      .getItemById(this.itemId as number)
      .subscribe((data: Item) => {
        this.editItemForm.patchValue({
          name: data.name,
          location: data.location,
          description: data.description,
        });
        this.imageSrc = data.imageUrl;
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editItemForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editItemForm.invalid) {
      return;
    }

    this.loading = true;
    const data = new FormData();
    data.append('image', this.editItemForm.get('imageFile')?.value);
    data.append('name', this.editItemForm.get('name')?.value);
    data.append('location', this.editItemForm.get('location')?.value);
    data.append('description', this.editItemForm.get('description')?.value);
    this.itemsService.editItem(data, this.itemId).subscribe({
      next: () => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
  onFileSelect(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      this.editItemForm.patchValue({
        imageFile: file,
      });
      this.editItemForm.get('imageFile')?.updateValueAndValidity();
    }
  }
}
