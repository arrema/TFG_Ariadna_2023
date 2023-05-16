import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  
  tabActive : string = "";

  constructor() { }

  ngOnInit() {
  }

  onTabsWillChange(event : any){
    this.tabActive = event.tab;
  }
}
