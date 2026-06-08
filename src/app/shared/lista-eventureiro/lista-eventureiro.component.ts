import { Component, Input } from '@angular/core';
import { Usuario } from '../../core/interface/usuario';

@Component({
  selector: 'app-lista-eventureiro',
  standalone: false,
  templateUrl: './lista-eventureiro.component.html',
  styleUrl: './lista-eventureiro.component.scss'
})
export class ListaEventureiroComponent {
 @Input() dataSource: Usuario[] = [];

 getSeverity(tipo: string) {
   switch (tipo) {
     case 'Aventureiro':
       return 'success';
     case 'Criador':
       return 'info';
     case 'Cliente':
       return 'warning';
     default:
       return 'secondary';
   }
 }

 getClassTheme(classe: string) {
   const c = (classe || '').trim();
   switch (c) {
     case 'Mago':
       return { color: '#9333ea', icon: 'pi pi-sparkles', label: 'Mago' }; 
     case 'Paladino':
       return { color: '#eab308', icon: 'pi pi-shield', label: 'Paladino' };
     case 'Druida':
       return { color: '#22c55e', icon: 'pi pi-ethereum', label: 'Druida' }; 
     case 'Fighter':
       return { color: '#ef4444', icon: 'pi pi-bolt', label: 'Guerreiro' }; 
     case 'Artificer':
       return { color: '#3b82f6', icon: 'pi pi-cog', label: 'Artífice' }; 
     case 'Clérigo':
       return { color: '#06b6d4', icon: 'pi pi-plus-circle', label: 'Clérigo' }; 
     case 'Bardo':
       return { color: '#ec4899', icon: 'pi pi-volume-up', label: 'Bardo' }; 
     default:
       return { color: '#64748b', icon: 'pi pi-user', label: 'Aventureiro' }; 
   }
 }
}
