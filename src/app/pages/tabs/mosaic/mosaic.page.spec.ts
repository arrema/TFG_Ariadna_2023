import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MosaicPage } from './mosaic.page';

describe('MosaicPage', () => {
  let component: MosaicPage;
  let fixture: ComponentFixture<MosaicPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MosaicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
