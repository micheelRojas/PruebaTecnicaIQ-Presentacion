import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisEmployeeComponent } from './list-employee.component';

describe('ListUsuarioComponent', () => {
  let component: LisEmployeeComponent;
  let fixture: ComponentFixture<LisEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LisEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LisEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
