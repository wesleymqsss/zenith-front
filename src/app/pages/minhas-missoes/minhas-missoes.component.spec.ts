import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasMissoesComponent } from './minhas-missoes.component';

describe('MinhasMissoesComponent', () => {
  let component: MinhasMissoesComponent;
  let fixture: ComponentFixture<MinhasMissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinhasMissoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasMissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
