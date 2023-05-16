import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmojiPageRoutingModule } from './emoji-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { EmojiPage } from './emoji.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmojiPageRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule,

  ],
  declarations: [EmojiPage]
})
export class EmojiPageModule {}
