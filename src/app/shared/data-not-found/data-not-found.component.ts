import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-not-found',
  standalone: false,
  templateUrl: './data-not-found.component.html',
  styleUrl: './data-not-found.component.scss'
})
export class DataNotFoundComponent {
  @Input() title: string = 'Nenhum resultado';
  @Input() message: string = 'Não há dados para a busca solicitada.';
  @Input() icon: string = 'pi pi-search-minus';
}
