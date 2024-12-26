import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YoloPage } from './yolo.page';

describe('YoloPage', () => {
  let component: YoloPage;
  let fixture: ComponentFixture<YoloPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(YoloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
