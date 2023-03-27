import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TekaCompletaComponent } from './teka-completa.component';

describe('TekaCompletaComponent', () => {
  let component: TekaCompletaComponent;
  let fixture: ComponentFixture<TekaCompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TekaCompletaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TekaCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
