import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemsService } from '../services';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css'],
})
export class CreateItemComponent implements OnInit {
  addItemForm!: FormGroup;
  loading = false;
  submitted = false;
  imageSrc!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageFile: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addItemForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addItemForm.invalid) {
      return;
    }

    this.loading = true;
    const data = new FormData();
    data.append('image', this.addItemForm.get('imageFile')?.value);
    data.append('name', this.addItemForm.get('name')?.value);
    data.append('location', this.addItemForm.get('location')?.value);
    data.append('description', this.addItemForm.get('description')?.value);
    this.itemsService.createItem(data).subscribe({
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
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      this.addItemForm.patchValue({
        imageFile: file,
      });
      this.addItemForm.get('imageFile')?.updateValueAndValidity();
    }
  }
}
