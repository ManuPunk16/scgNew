import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecComponent } from './homec.component';

describe('HomeComponent', () => {
  let component: HomecComponent;
  let fixture: ComponentFixture<HomecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
