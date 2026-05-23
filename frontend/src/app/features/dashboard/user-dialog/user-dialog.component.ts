import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '@core/services/user.service';
import { User, UserRole } from '@shared/models/user.model';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  dialogRef = inject(MatDialogRef<UserDialogComponent>);
  editData = inject<User | null>(MAT_DIALOG_DATA, { optional: true });

  isEditMode = false;
  roles = Object.values(UserRole);
  userForm!: FormGroup;

  ngOnInit(): void {
    this.isEditMode = !!this.editData;
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      userId: [
        { value: this.editData?.userId || '', disabled: this.isEditMode },
        this.isEditMode ? [] : [Validators.required, Validators.minLength(3)]
      ],
      password: [
        '',
        this.isEditMode ? [] : [Validators.required, Validators.minLength(5)]
      ],
      firstName: [this.editData?.firstName || '', [Validators.required]],
      lastName: [this.editData?.lastName || '', [Validators.required]],
      email: [this.editData?.email || '', [Validators.required, Validators.email]],
      role: [this.editData?.role || '', [Validators.required]],
      department: [this.editData?.department || '', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const rawValue = this.userForm.getRawValue();

    if (this.isEditMode && this.editData) {
      const updatePayload = {
        firstName: rawValue.firstName,
        lastName: rawValue.lastName,
        email: rawValue.email,
        role: rawValue.role,
        department: rawValue.department
      };

      this.userService.updateUser(this.editData.id, updatePayload).subscribe({
        next: () => {
          this.snackBar.open('User updated successfully.', 'Dismiss', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          const errorMsg = err.error?.error || 'Failed to update user.';
          this.snackBar.open(errorMsg, 'Dismiss', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.userService.createUser(rawValue).subscribe({
        next: () => {
          this.snackBar.open('User created successfully.', 'Dismiss', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          const errorMsg = err.error?.error || 'Failed to create user.';
          this.snackBar.open(errorMsg, 'Dismiss', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
