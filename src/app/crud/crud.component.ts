import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  dataForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dataService: CrudService,
    private _dialogRef: MatDialogRef<CrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.dataForm = this._fb.group({
      namaDepan: '',
      namaBelakang: '',
      email: '',
      tl: '',
      gender: '',
      nim: '',
      ipk: '',
    });
  }

  ngOnInit(): void {
    this.dataForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.dataForm.valid) {
      if (this.data) {
        this._dataService
          .updateData(this.data.id, this.dataForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Data berhasil DiPerbarui!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._dataService.addData(this.dataForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Data berhasil ditambahkan');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
