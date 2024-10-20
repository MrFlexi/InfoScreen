import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditWebcamsPage } from './edit-webcams.page';

describe('EditWebcamsPage', () => {
  let component: EditWebcamsPage;
  let fixture: ComponentFixture<EditWebcamsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWebcamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
