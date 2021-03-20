import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {TipoIdentificacionService} from '../../Services/TipoIdentificacion.service';
import {UsuarioService} from '../../Services/Usuario.service';
import {Usuario} from '../../Models/Usuario';
import {Basic} from '../../Models/Basic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-Usuarios',
  templateUrl: './Usuarios.component.html',
  styleUrls: ['./Usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {
  myForm: FormGroup;
  constructor(public tipoIdentService:TipoIdentificacionService, public usuarioService:UsuarioService,public fb: FormBuilder) {
    this.myForm = this.fb.group({
      identificacion: ['', [Validators.required]],
      tipo_identificacion_cod: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: [''],
    });
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  createForm: FormGroup;
  dataSource:any;
  selectUsuario:Usuario = new Usuario();
  tipoIdents:Basic[];
  displayedColumns: string[] = ['identificacion','tipo_identificacion','nombre','apellidos','email','actions'];

  ngOnInit() {
    this.getAll();
    this.getTipoIdent();
  }

  public getAll(){
    this.usuarioService.getAll()
    .subscribe(
      (data)=> {
        console.log(data);
        this.dataSource = new MatTableDataSource<Usuario>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
        alert("Error.");
      }
    );
  }

  public getTipoIdent(){
    this.tipoIdentService.getAll()
    .subscribe(
      (data)=> {
        console.log(data);
        this.tipoIdents = data;
      },
      (error) => {
        console.log(error);
        alert("Error.");
      }
    );
  }

  public delete(id){
    if(confirm("Delete")){
      this.usuarioService.delete(id)
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
    this.usuarioService.get(id)
    .subscribe(
      (data)=> {
        console.log(data);
        this.selectUsuario = data;
      },
      (error) => {
        console.log(error);
        alert("Error.");
      }
    );
  }

  public update(user: Usuario){
    if(this.validar())
      return;
    this.usuarioService.put(user)
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

  public save(user:Usuario){
    if(this.validar())
      return;
    this.usuarioService.post(user)
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
    if (this.selectUsuario.identificacion == null) {
      alert("El campo identificacion es requerido.");
      return true;
    }else if (this.selectUsuario.nombre == null) {
      alert("El campo nombre es requerido.");
      return true;
    }else if (this.selectUsuario.apellidos == null) {
      alert("El campo apellidos es requerido.");
      return true;
    }else if (this.selectUsuario.tipo_identificacion_cod == null) {
      alert("El campo tipo identificacion es requerido.");
      return true;
    }
  }
}
