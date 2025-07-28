import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapDirectionsPage } from './map-directions.page';

describe('MapDirectionsPage', () => {
  let component: MapDirectionsPage;
  let fixture: ComponentFixture<MapDirectionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MapDirectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
