import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDepartureComponent } from './home-departure.component';

describe('HomeDepartureComponent', () => {
  let component: HomeDepartureComponent;
  let fixture: ComponentFixture<HomeDepartureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDepartureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
