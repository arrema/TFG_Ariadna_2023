import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreServiceService } from 'src/app/services/firestore-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule,LoginPage]
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  isSubmited =false;
  regexPassword = new RegExp('^(?=.*?[A-Z])[a-zA-Z0-9_]{8,}');
  URLJSON = 'assets/providers/users.json';
  usersList: User[] | any[] = [];
  user : User | any;
  isAlertShown=false;
  public loading = false;

  constructor(public formBuilder: FormBuilder, private alertController: AlertController, private http: HttpClient, private router: Router, private navcontroler : NavController,private firestoreService: FirestoreServiceService) {
    this.ionicForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.pattern(this.regexPassword)]]
    });
    //console.log(this.ionicForm.controls['username'].status)
  }

  ngOnInit() {
    this.firestoreService.getAllUsers()
    .then(res => {
      console.log("data from firebase", res);
      this.usersList = res;

    }).catch(error => {
      console.log('error')
    })
  setTimeout(() => {
    console.log('users', this.usersList)
  }, 1000);
  }

  loginGoogle(){
    this.firestoreService.loginGoogleAndroid();
  }
  logoutGoogle(){
    this.firestoreService.logOut();
  }


  get errorControl() {
    return this.ionicForm.controls;
  }
  
  async presentAlert() {
  
      const alert = await this.alertController.create({
        header: 'User not recognized',
        message: 'Check data.',
        buttons: ['OK']
      });
  
      await alert.present();
     
  }

  goRegister(){
    this.navcontroler.navigateForward(['register'])
  }
  

  submitForm() {
    console.log('entra')
    if (!this.ionicForm.valid) {
    } else {
      this.user = this.ionicForm.getRawValue();
      for (let i = 0; i < this.usersList.length; i++) {
        if (this.user.username == this.usersList[i].username &&
          this.user.password == this.usersList[i].password) {
            
            console.log(this.user.name)
            this.user = this.usersList[i]
            console.log(this.user)
            this.navcontroler.navigateForward('tabs',{state : {user : this.user}}); 
            this.isSubmited = true;
            
        }
      }
    }
    if (!this.isSubmited){
      this.presentAlert();
    }
  }


}
