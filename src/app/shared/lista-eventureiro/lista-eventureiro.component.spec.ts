import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEventureiroComponent } from './lista-eventureiro.component';

describe('ListaEventureiroComponent', () => {
  let component: ListaEventureiroComponent;
  let fixture: ComponentFixture<ListaEventureiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaEventureiroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEventureiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
