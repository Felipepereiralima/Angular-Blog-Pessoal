import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  Tema: Tema = new Tema()
  postagem: Postagem = new Postagem()
  listaTemas: Tema[]
  idTema: number
  user: Usuario = new Usuario()
  idUser = environment.id
  listaPostagens: Postagem[]


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(){

    if(environment.token == ""){
      alert("Sua sessão expirou, faça login novamente.")
      this.router.navigate(['/entrar'])
    }
    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.Tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }

  findByIdUsuario(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario)=>{
      this.user = resp
    })
  }

  publicar(){
    this.Tema.id = this.idTema
    this.postagem.tema = this.Tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagens(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert("Postagem realizada com sucesso!")
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}
