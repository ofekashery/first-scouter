import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InputSpinnerComponent } from './input-spinner.component';

describe('InputSpinnerComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        InputSpinnerComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(InputSpinnerComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('maximum should work', () => {
    const fixture = TestBed.createComponent(InputSpinnerComponent);
    fixture.componentInstance.min = 0;
    fixture.componentInstance.max = 5;
    for (let i = 0; i < 10; i++) {
      fixture.componentInstance.increment()
    }
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h5').textContent).toBe('5');
    });
  });

  it('minimum should work', () => {
    const fixture = TestBed.createComponent(InputSpinnerComponent);
    fixture.componentInstance.min = -5;
    fixture.componentInstance.max = 5;
    for (let i = 0; i < 2; i++) {
      fixture.componentInstance.increment();
    }
    for (let i = 0; i < 10; i++) {
      fixture.componentInstance.decrement()
    }
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h5').textContent).toBe('-5');
    });
  });
});
