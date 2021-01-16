import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RellenaDietaComponent } from './rellena-dieta.component';

describe('RellenaDietaComponent', () => {
  let component: RellenaDietaComponent;
  let fixture: ComponentFixture<RellenaDietaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RellenaDietaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RellenaDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
