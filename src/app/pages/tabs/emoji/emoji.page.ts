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
  selector: 'app-emoji',
  templateUrl: './emoji.page.html',
  styleUrls: ['./emoji.page.scss'],
})
export class EmojiPage implements OnInit {

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

 
  get errorControl() {
    return this.ionicFormRegister.controls;
  }
}
