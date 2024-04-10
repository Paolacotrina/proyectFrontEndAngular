import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuAppComponent } from './hu-app.component';

describe('HuAppComponent', () => {
  let component: HuAppComponent;
  let fixture: ComponentFixture<HuAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HuAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
