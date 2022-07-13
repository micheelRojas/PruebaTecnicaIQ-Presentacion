import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAutenticadosComponent } from './list-autenticados.component';

describe('ListAutenticadosComponent', () => {
  let component: ListAutenticadosComponent;
  let fixture: ComponentFixture<ListAutenticadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAutenticadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAutenticadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
