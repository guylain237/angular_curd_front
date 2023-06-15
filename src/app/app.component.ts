import {Component, OnInit , AfterViewInit, ViewChild} from '@angular/core';
import {DialogComponent} from "./dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "./services/api.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular_material_form';
  displayedColumns: string[] = ['productName', 'category', 'date' , 'freshness' , 'price' , 'comment' , 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  durationInSeconds = 5;

  constructor(private dialog: MatDialog,
              private api: ApiService,) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe( val => {
      if(val === "close"){
        this.getAllProducts();
      }
    });
  }

  getAllProducts() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error: () => {
          alert('Error while fetching the Records!!')
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct( row : any) {
    this.dialog.open(DialogComponent , {
      width : '30%',
      data: row
    }).afterClosed().subscribe( val => {
      if(val === 'update'){
        this.getAllProducts();
      }
    })
  }

  deleteProduct(id : number) {
    this.api.deleteProduct(id).subscribe({
      next : (res) => {
        alert("Product deleting successfully")
      },
      error : () => {
        alert(" Error while deleting the product !!")
      }
    })
  }

}
