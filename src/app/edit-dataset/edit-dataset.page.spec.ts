import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDatasetPage } from './edit-dataset.page';

describe('EditDatasetPage', () => {
  let component: EditDatasetPage;
  let fixture: ComponentFixture<EditDatasetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDatasetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
