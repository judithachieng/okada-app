import { Component, OnInit, Inject } from '@angular/core';
import { MotoModalService } from '../shared/moto-modal.service';
import { MotoService } from 'src/app/_services/moto/moto.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-moto-form',
  templateUrl: './moto-form.component.html',
  styleUrls: ['./moto-form.component.css']
})


export class MotoFormComponent implements OnInit {
id: number;
  constructor(
    public motoModalService: MotoModalService,
    private motoService: MotoService,
    public dialogRef: MatDialogRef<MotoFormComponent>,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data,

  ) {

  }

  ngOnInit() {

  }

  resetForm() {
    this.motoModalService.form.reset();
    this.motoModalService.InitializeFormGroup();
    this.notificationService.success('Submitted Successfully');
    this.onClose();

  }


  onSubmit() {
    if (this.motoModalService.form.valid) {
      if (!this.motoModalService.form.get('$key').value) {
        this.motoService.createMoto(this.id, this.motoModalService.form.value).subscribe((data: {}) => {
          this.resetForm();
        });
      } else {
        this.motoService.updateMoto(this.id, this.motoModalService.form.get('$key').value, this.motoModalService.form.value);
        this.resetForm();
      }

      }
    }


  onClose() {
    this.motoModalService.form.reset();
    this.motoModalService.InitializeFormGroup();
    this.dialogRef.close();
  }


}
