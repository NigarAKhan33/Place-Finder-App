import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPlacePage } from './search-place.page';

describe('SearchPlacePage', () => {
  let component: SearchPlacePage;
  let fixture: ComponentFixture<SearchPlacePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
