import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { IonButton, IonModal, NavController } from '@ionic/angular';
import { Restaurants } from 'src/app/interfaces/restaurants';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  restaurant: Restaurants | any;
  sizes: string[] = ["XS", "S", "M", "L", "XL"];
  selectedSize: any = null;
  colorSelected: string = 'color1';
  totalPrice = 0;
  unities = 0;
  allProducts: Product | any;
  similarProducts: string[] = [];
  isActive: boolean = false;
  isActiveButton = false;
  positionArrayPhotos = 0;
  constructor(private activatedRouter: ActivatedRoute, private router: Router, private navCtrl: NavController) { }

  ionViewDidEnter() {

    this.modal.ionBreakpointDidChange.subscribe(modalPosition => {
      console.log(modalPosition);
      if (modalPosition.detail.breakpoint == 1) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    })
  }

  ngOnInit() {
    this.getRestaurant();
    this.probando();
    setTimeout(() => {
      console.log("Product Received: ", this.restaurant);
    }, 500);
    setTimeout(() => {
      console.log("All Products Received: ", this.allProducts);
    }, 500);


  }

  async getRestaurant() {
    this.activatedRouter.queryParams.subscribe(res => {
      this.restaurant = res['object'];
      this.allProducts = res['objectProducts'];
    })
  }

  goBackMosaic(): void {
    this.navCtrl.navigateBack(['tabs']);
    this.modal.isOpen = false;
  }

  selectDiv(item: any) {
    if (this.selectedSize === item) {
      this.selectedSize = null;
    } else {
      this.selectedSize = item;
    }
  }

  changeColorSelected(color: string) {
    this.colorSelected = color;
  }

  incrementCount() {
    this.unities++
  }

  decrementCount() {
    if (this.totalPrice > 0) {
      this.unities--
    }
  }

  getSimilarClothes() {
    let randomNums = [];
    for (let i = 0; i < 3; i++) {
      let randomNum = Math.round(Math.random() * this.allProducts.length);

      randomNums.push(randomNum);
    }
    for (let i = 0; i < 3; i++) {
      this.similarProducts.push(this.allProducts[randomNums[i]].images[0]);
    }

  }

  probando() {
    let randomNumbers: number[] = []
    while (randomNumbers.length < 3) {
      if (randomNumbers.length < 3) {
        let randomNum = Math.round(Math.random() * this.allProducts.length);

        if (!randomNumbers.includes(randomNum)) {
          randomNumbers.push(randomNum);
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      this.similarProducts.push(this.allProducts[randomNumbers[i]].images[0]);
    }

  }
  toggleActive() {
    this.isActiveButton = true;
  }

  nextPhoto() {
    this.positionArrayPhotos++;
    if (this.positionArrayPhotos == this.restaurant.Photos.length) {
      this.positionArrayPhotos = 0;
    }

  }

  beforePhoto() {
    if (this.positionArrayPhotos == 0) {
      this.positionArrayPhotos = this.restaurant.Photos.length;
    }
    this.positionArrayPhotos--;

  }

  openReservePage() {
    window.open(this.restaurant.Reservation);
  }

}


