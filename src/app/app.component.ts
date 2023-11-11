import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudComponent } from './crud/crud.component';
import { CrudService } from './services/crud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'namaDepan',
    'namaBelakang',
    'email',
    'tl',
    'gender',
    'nim',
    'ipk',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title = 'CRUD-Project';
  
  constructor(
    private _dialog: MatDialog,
    private _dataService: CrudService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getDataList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CrudComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDataList();
        }
      },
    });
  }

  getDataList() {
    this._dataService.getDataList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteData(id: number) {
    this._dataService.deleteData(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Data Di Hapus!', 'done');
        this.getDataList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CrudComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDataList();
        }
      },
    });
  }
}
