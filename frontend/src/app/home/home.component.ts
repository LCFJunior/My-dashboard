import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';  // Importando o axios
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule] // Não precisamos mais do HttpClientModule aqui
})
export class HomeComponent implements OnInit, AfterViewInit {
  isExpanded = false;

  // Alterado para nomes em português
  loginData = { email: '', senha: '' }; // 'password' alterado para 'senha'
  registerData = { nome: '', email: '', senha: '', confirmSenha: '' }; // 'name' para 'nome' e 'password' para 'senha'

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const intro = document.getElementById('intro');
        if (intro) {
          intro.classList.add('fade-out');
        }
      }, 3000);
    }
  }

  toggleRegister() {
    this.isExpanded = !this.isExpanded;
  }

  onSubmit() {
    if (this.isExpanded) {
      this.registerUser();
    } else {
      this.loginUser();
    }
  }

  registerUser() {
    if (!this.registerData.nome || !this.registerData.email || !this.registerData.senha || !this.registerData.confirmSenha) {
      alert('Todos os campos são obrigatórios!');
      return;
    }
  
    if (this.registerData.senha !== this.registerData.confirmSenha) {
      alert('As senhas não coincidem!');
      return;
    }
  
    axios.post('http://localhost:3000/cadastro', this.registerData, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      console.log('Cadastro realizado com sucesso:', response);
      alert('Usuário cadastrado com sucesso!');
      this.isExpanded = false;
    })
    .catch(err => {
      console.error('Erro no cadastro:', err.response?.data || err.message);
      alert('Erro ao realizar o cadastro. Tente novamente.');
    });
  }
  

  loginUser() {
    axios.post('http://localhost:3000/login', this.loginData)
      .then((response: any) => {
        console.log('Login realizado com sucesso:', response);
        alert('Login realizado!');
        this.router.navigate(['/dashboard']); // Redirecionamento SPA
      })
      .catch((err) => {
        console.error('Erro no login:', err.response?.data || err.message);
        alert('Erro ao realizar login. Tente novamente.');
      });
  }
}
