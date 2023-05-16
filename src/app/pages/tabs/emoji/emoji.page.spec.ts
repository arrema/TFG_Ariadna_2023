import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmojiPage } from './emoji.page';

describe('EmojiPage', () => {
  let component: EmojiPage;
  let fixture: ComponentFixture<EmojiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmojiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
