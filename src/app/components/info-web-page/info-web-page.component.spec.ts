import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWebPageComponent } from './info-web-page.component';

describe('InfoWebPageComponent', () => {
  let component: InfoWebPageComponent;
  let fixture: ComponentFixture<InfoWebPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoWebPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoWebPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
