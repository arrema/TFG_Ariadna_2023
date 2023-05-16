import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { HttpService } from '../../../services/http.service';
import { IonicModule, NavController } from '@ionic/angular';
import { initializeApp } from "firebase/app";
import { getAnalytics, initializeAnalytics } from "firebase/analytics";
import { environment } from 'src/environments/environment';
import { FirestoreServiceService } from 'src/app/services/firestore-service.service';
import { Restaurants } from '../../../interfaces/restaurants';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  product!: Product;
  allProducts: Product[] = [];
  restaurantsList: Restaurants[]  =  [];
  findText = '';
  restaurantsFilteredList : Restaurants | any = this.restaurantsList;

  constructor(private firestoreService: FirestoreServiceService, private http: HttpService, private navcontroler: NavController) { }

  ngOnInit() {
    this.loadProducts();
    this.firestoreService.getOneRestaurant();
    console.log('restaurantes', this.restaurantsList)
    this.firestoreService.getAllRestaurants()
      .then(res => {
        console.log("data from firebase", res);
        this.restaurantsList = res;

      }).catch(error => {
        console.log('error')
      })
    setTimeout(() => {
      console.log('restaurantes', this.restaurantsList)
    }, 1000);
  }

  loadProducts() {
    this.http.loadProduct().subscribe(data => {
      console.log(data);
      // this.product=data.results;
      // console.log(res.results);
      // console.log(this.product);
      this.allProducts = data.products;
    })

  }

  showRestaurantDetails(restaurant: Restaurants ) {
    console.log(restaurant)
    this.navcontroler.navigateForward('product-details', {
      queryParams: {
        object: restaurant,
        objectProducts: this.allProducts
      }
    })
  }

 findRestaurant(event : any){
  //console.log(event)
  this.findText = event.detail.value;
 

 }


}
