import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparturesEditComponent } from './departures-edit.component';

describe('DeparturesEditComponent', () => {
  let component: DeparturesEditComponent;
  let fixture: ComponentFixture<DeparturesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeparturesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeparturesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
