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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ionicFormRegister: FormGroup;
  isSubmited = false;
  regexPassword = new RegExp('^(?=.*?[A-Z])[a-zA-Z0-9_]{8,}');
  URLJSON = 'assets/providers/users.json';
  usersList: User[] | any[] = [];
  user: User | any;
  isAlertShown = false;
  public loading = false;


  constructor(public formBuilder: FormBuilder, private alertController: AlertController, private http: HttpClient, private router: Router, private navcontroler: NavController, private firestoreService: FirestoreServiceService) {
    this.ionicFormRegister = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      passwordRepeat: ['', [Validators.required, Validators.pattern(this.regexPassword)]],
      password: ['', [Validators.required, Validators.pattern(this.regexPassword)]],

    });
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

  goBackLogin() {
    this.navcontroler.navigateBack(['login']);
  }
  get errorControl() {
    return this.ionicFormRegister.controls;
  }

  async presentAlert(message : string) {
    console.log('entra')
    const alert = await this.alertController.create({
      header: message,
      message: 'Cmpruebe la informacion',
      buttons: ['OK']
    });

    await alert.present();

  }

  submitForm() {
    console.log('entra')
    if (!this.ionicFormRegister.valid) {
    } else {
      this.user = this.ionicFormRegister.getRawValue();
      for (let i = 0; i < this.usersList.length; i++) {
        if (this.user.username != this.usersList[i].username &&
          this.user.password != this.usersList[i].password) {

          console.log(this.user.name)
          this.user = this.usersList[i]
          console.log(this.user)
          this.navcontroler.navigateForward('tabs', { state: { user: this.user } });
          this.isSubmited = true;

        }
      }
    }
    if (!this.isSubmited) {
      // this.presentAlert();
    }
  }


  validarUsername(usr : string):boolean{
  let correctInfo=false
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

  for(let i = 0; i < this.usersList.length; i++){
    if ( usr == this.usersList[i].username){
      correctInfo = false;
      console.log('el usr ya esta registrado')
    }else{
      correctInfo = true;
      console.log('el usr no esta')

    }
  }
  return correctInfo;
  }

  /**
   * @description this method will verify several things: 
    *  1. That there are no empty fields. 2.
    *  2. That the user you are trying to register has not already been registered.
    *  3. That both passwords match.
    *  If everything is correct, it will save the new user in the list of users in the database.
   * 
   */
  submitFormRegister() {
    if (this.ionicFormRegister.valid){
      let username = this.ionicFormRegister.controls['username'].value;
      let password =this.ionicFormRegister.controls['password'].value;
      let name =this.ionicFormRegister.controls['name'].value;
      
      let validUser: boolean = this.validarUsername(username);

      if(validUser) {
        console.log('Email Valid', "True");

        if(this.ionicFormRegister.controls['password'].value != this.ionicFormRegister.controls['passwordRepeat'].value) {

          this.presentAlert('Las contraseñas no coinciden');
        }else{
          console.log('datos correctos');
          let userAdd : User = {
          "username" : username ,
          "password" : password,
          "name" : name, }
          this.firestoreService.addNewUser(userAdd);
          this.presentAlert("Registro creado correctamente!");
          this.navcontroler.navigateForward('tabs',{state : {userAdd : this.user}});        }
      }else {
        console.log('Email Valid', "False");
        this.presentAlert("El usuario ya existe");
      }
    }else{
      console.log('error en la introduccion de datos')
      this.presentAlert("Error en la introducción de datos");
    }
  }


  goLogin() {
    this.navcontroler.navigateForward(['login'])
  }

}
