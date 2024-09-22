import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '@core/interfaces/user';
import { UserApiService } from '@core/services/user-api.service';

interface EditDialogData {
  user?: IUser;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  readonly userApi = inject(UserApiService);
  readonly dialogRef = inject(MatDialogRef<EditComponent>);
  readonly data = inject<EditDialogData>(MAT_DIALOG_DATA);
  edit = false;

  ngOnInit(): void {
    console.log('ngOnInit', this.data);
    if (this.data.user) {
      this.form.patchValue(this.data.user);
      this.edit = true;
    }
    this.setPasswordValidators();
  }

  setPasswordValidators() {
    if (this.edit) {
      this.form.get('password')?.setValidators([Validators.minLength(8)]);
    } else {
      this.form.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
    }
    this.form.get('password')?.updateValueAndValidity();
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl(''),
  });

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  save() {
    const sub = this.#submitData().subscribe(() => {
      console.log('submit');
      this.dialogRef.close(true);
      sub.unsubscribe();
    })
  }

  #submitData() {
    if (this.edit) {
      const value = this.form.value;
      let password = value.password? value.password : undefined;
      return this.userApi.update(this.data.user?.id!, {
        ...value,
        password,
      });
    } else {
      return this.userApi.create(this.form.value);
    }

  }
}
