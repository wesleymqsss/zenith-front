import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselMinhasAvaliacoesComponent } from './carrossel-minhas-avaliacoes.component';

describe('CarrosselMinhasAvaliacoesComponent', () => {
  let component: CarrosselMinhasAvaliacoesComponent;
  let fixture: ComponentFixture<CarrosselMinhasAvaliacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarrosselMinhasAvaliacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrosselMinhasAvaliacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
