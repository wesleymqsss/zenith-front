import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComunidadeComponent } from './lista-comunidade.component';

describe('ListaComunidadeComponent', () => {
  let component: ListaComunidadeComponent;
  let fixture: ComponentFixture<ListaComunidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaComunidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaComunidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
