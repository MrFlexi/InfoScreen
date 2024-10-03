import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDatasetPage } from './add-dataset.page';

describe('AddDatasetPage', () => {
  let component: AddDatasetPage;
  let fixture: ComponentFixture<AddDatasetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDatasetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
