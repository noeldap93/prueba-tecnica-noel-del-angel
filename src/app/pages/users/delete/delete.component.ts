import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '@core/interfaces/user';
import { UserApiService } from '@core/services/user-api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteComponent>);
  readonly user = inject<IUser>(MAT_DIALOG_DATA);
  readonly userApi = inject(UserApiService);

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    const sub = this.userApi.delete(this.user.id).subscribe(()=>{
      this.dialogRef.close(true);
      sub.unsubscribe();
    })
  }

}
