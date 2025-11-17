/*  `src/app/app.ts` - Componente raíz de la aplicación que registra componentes y añade la plantilla y estilos principales. */
import { Component, signal, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarjetaCreditoComponent } from "./components/tarjeta-credito/tarjeta-credito";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TarjetaCreditoComponent, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('EFTarjetaCredito');
}

// Remove NgModule and use bootstrapApplication in main.ts instead
