import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/shared/models/patient';
import { PatientService } from 'src/app/shared/services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { CreatePatientComponent } from '../create-patient/create-patient.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'b_date'];
  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private ps: PatientService,
    private dialog: MatDialog) { }


  ngOnInit() {
    this.ps.patients$.subscribe(
      patients => {
        this.dataSource = new MatTableDataSource(patients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error fetching patients:', error);
      }
    );
    this.ps.getPatients();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialogCreatePatient() {
    this.dialog.open(CreatePatientComponent)
  }


  openDialogPatientInfo(patientId: number): void {
    this.dialog.open(PatientInfoComponent, {
      data: { id: patientId }
    });
  }

}
