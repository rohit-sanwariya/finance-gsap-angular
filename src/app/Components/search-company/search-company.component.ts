import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ZodError, z } from 'zod';

@Component({
  selector: 'app-search-company',
  standalone: true,
  imports: [NgIf, MatFormFieldModule, MatInputModule],
  templateUrl: './search-company.component.html',
  styleUrl: './search-company.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchCompanyComponent,
      multi: true,
    },
  ],
})
export class SearchCompanyComponent implements ControlValueAccessor {
  afterRegister!: Tfn;
  afterTouch!: Tfn;
  isDiabled = false;
  error = signal<string | ''>('');
  value = '';
  writeValue(obj: string): void {
    this.value = obj;
  }
  registerOnChange(fn: Tfn): void {
    this.afterRegister = fn;
  }
  registerOnTouched(fn: Tfn): void {
    this.afterTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDiabled = isDisabled;
  }
  afterChange(input: EventTarget | null) {
    const value = (input as HTMLInputElement).value;
    try {
      const zval = z.string().min(5).parse(value);
      this.afterRegister(zval);
      this.error.set('');
    } catch (error) {
      const err = error as ZodError;
      this.error.set(err.flatten().formErrors[0]);
    }
  }
}

type Tfn = <T>(value: T) => void;
