import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLexiusComponent } from './info-lexius.component';

describe('InfoLexiusComponent', () => {
  let component: InfoLexiusComponent;
  let fixture: ComponentFixture<InfoLexiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoLexiusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoLexiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
