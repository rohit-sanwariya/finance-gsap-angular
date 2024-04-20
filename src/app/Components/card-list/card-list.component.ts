import { CardComponent } from '@Component/card/card.component';
import { SearchCompanyComponent } from '@Component/search-company/search-company.component';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent, SearchCompanyComponent, ReactiveFormsModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  search = new FormControl<string>('');
  /**
   *
   */
  constructor() {
    console.log(this.search.value);
    this.search.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
