import { Component, OnInit } from '@angular/core';
import { FirestoreServiceService } from 'src/app/services/firestore-service.service';
import { Event } from '../../../interfaces/event';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.page.html',
  styleUrls: ['./mosaic.page.scss'],
})
export class MosaicPage implements OnInit {

  eventsList : Event[]  = []
 

  constructor(private firestoreService: FirestoreServiceService,private navCntrlr: NavController) { }

  ngOnInit() {
    this.firestoreService.getAllEvents()
      .then(res => {
        console.log("data from firebase", res);
        this.eventsList = res;

      }).catch(error => {
        console.log('error')
      })
    setTimeout(() => {
      console.log('eventos', this.eventsList)
    }, 1000);
  }

  showEventDetails(event: Event ) {
    console.log('hola')
    this.navCntrlr.navigateForward('events-details', {
      queryParams: {
        object: event,
      }
    })
  }

}
