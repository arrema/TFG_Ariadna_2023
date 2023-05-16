import { Component, OnInit ,ViewChild} from '@angular/core';
import { IonButton, IonModal, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/interfaces/event';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.page.html',
  styleUrls: ['./events-details.page.scss'],
})
export class EventsDetailsPage implements OnInit {
  
  @ViewChild(IonModal) modal!: IonModal;
  event : Event | any ;
  public isReadMore: boolean = false;
  isActive: boolean = false;
  constructor(private navCtrl: NavController,private activatedRouter: ActivatedRoute) { }
  ionViewDidEnter() {

    this.modal.ionBreakpointDidChange.subscribe(modalPosition => {
      console.log(modalPosition);
      if (modalPosition.detail.breakpoint == 1) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    })
  }  ngOnInit() {
    this.getEvents();

  }

  goBackMosaic(): void {
    this.navCtrl.navigateBack(['tabs/tabs/mosaic']);
    this.modal.isOpen = false;
  }

  async getEvents(){
    this.activatedRouter.queryParams.subscribe(res => {
      this.event = res['object'];
      console.log("event",this.event)
    })
  }

  readMore(){
    this.isReadMore=!this.isReadMore;
  }

}
