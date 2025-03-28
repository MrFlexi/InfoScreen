import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ui5TabPage } from './ui5-tab.page';

describe('Ui5TabPage', () => {
  let component: Ui5TabPage;
  let fixture: ComponentFixture<Ui5TabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Ui5TabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
