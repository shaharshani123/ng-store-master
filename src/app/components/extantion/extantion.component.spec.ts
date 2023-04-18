import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtantionComponent } from './extantion.component';

describe('ExtantionComponent', () => {
  let component: ExtantionComponent;
  let fixture: ComponentFixture<ExtantionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtantionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtantionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
