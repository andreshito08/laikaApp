import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {Basic} from '../../Models/Basic';
import {TipoIdentificacionService} from '../../Services/TipoIdentificacion.service';

@Component({
  selector: 'app-TipoIdentificacion',
  templateUrl: './TipoIdentificacion.component.html',
  styleUrls: ['./TipoIdentificacion.component.scss']
})

export class TipoIdentificacionComponent implements OnInit {
  myForm: FormGroup;
  constructor(public tipoIdentService:TipoIdentificacionService,public fb: FormBuilder) {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],

    });

   }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource:any;
  selectTipoIdent:Basic = new Basic();
  displayedColumns: string[] = ['nombre','actions'];

  ngOnInit() {
    this.getAll();

  }

  public getAll(){
    this.tipoIdentService.getAll()
    .subscribe(
      (data)=> {
        console.log(data);
        this.dataSource = new MatTableDataSource<Basic>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
        alert("Error.");
      }
    );
  }

  public delete(id){
    if(confirm("Delete")){
      this.tipoIdentService.delete(id)
      .subscribe(
        (data)=> {
          alert(data["mensaje"]);
          this.getAll();
        },
        (error) => {
          console.log(error);
          alert("Error.");
        }
      );
    }
  }

  public get(id){
    this.tipoIdentService.get(id)
    .subscribe(
      (data)=> {
        console.log(data);
        this.selectTipoIdent = data;
      },
      (error) => {
        console.log(error);
        alert("Error.");
      }
    );
  }

  public update(data: Basic){
    if(this.validar())
      return;
    this.tipoIdentService.put(data)
    .subscribe(
      (data)=> {
        alert(data["mensaje"]);
        this.getAll();
      },
      (error) => {
        console.log(error);
        alert("Error.");
      }
    );
  }

  public save(data:Basic){
    if(this.validar())
      return;
    this.tipoIdentService.post(data)
    .subscribe(
      (data)=> {
        alert(data["mensaje"]);
        this.getAll();
      },
      (error) => {
        console.log(error);
        alert("Error.");
      }
    );
  }

  public validar():boolean{
    console.log(this.myForm.value);
    if (this.selectTipoIdent.nombre == null) {
      alert("El campo nombre es requerido.");
      return true;
    }
  }
}
