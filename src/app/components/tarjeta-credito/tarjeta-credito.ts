/*  `src/app/components/tarjeta-credito/tarjeta-credito.ts` - Componente que gestiona el formulario y listado de tarjetas de crédito. */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tarjeta } from '../../services/tarjeta';
@Component({
  selector: 'app-tarjeta-credito',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarjeta-credito.html',
  styleUrls: ['./tarjeta-credito.css'],
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: any[] = [
  ];
  accion: 'Agregar' | 'Editar' = 'Agregar'; 
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder, private tarjetaService: Tarjeta) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      // expect 16 digit numeric card number (adjust pattern if you accept other lengths)
      numeroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      // MM/YY (slash required)
      fechaExpiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      // CVV as 3 or 4 digits; keep as string to preserve leading zeros
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });


  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this.tarjetaService.getListTarjetas().subscribe({
      next: (data) => {
        this.listTarjetas = data ?? [];
      },
      error: (error) => {
        console.error('Error loading tarjetas from API:', error);
      }
    });
  }



  guardarTarjeta() {
    // Validate form before proceeding
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Build payload while ensuring CVV is a string (preserve leading zeros)
    const tarjetaPayload: any = {
      id: this.id,
      titular: this.form.get('titular')?.value,
      numeroTarjeta: String(this.form.get('numeroTarjeta')?.value).replace(/\s+/g, ''),
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: String(this.form.get('cvv')?.value),
    };

    if (this.accion === 'Agregar') {
      this.tarjetaService.saveTarjeta(tarjetaPayload).subscribe({
        next: (data) => {
          // Log success (avoid logging raw card data)
          console.log('Tarjeta added successfully');
          this.obtenerTarjetas(); // Refresh the list after adding
          this.form.reset();
        },
        error: (error) => {
          console.error('Error adding tarjeta:', error?.status, error?.statusText, error?.error ?? error?.message ?? error);
        }
      });
    } else if (this.accion === 'Editar' && this.id !== undefined) {
      this.tarjetaService.updateTarjeta(this.id, tarjetaPayload).subscribe({
        next: (data) => {
          console.log('Tarjeta updated successfully');
          this.obtenerTarjetas(); // Refresh the list after updating
          this.form.reset();
          this.accion = 'Agregar';
        },
        error: (error) => {
          console.error('Error updating tarjeta:', error?.status, error?.statusText, error?.error ?? error?.message ?? error);
        }
      });
    }
  }

  eliminarTarjeta(id: number) {
    this.tarjetaService.deleteTarjeta(id).subscribe({
      next: () => {
        console.log(`Tarjeta with id ${id} deleted successfully.`);
        this.obtenerTarjetas(); // Refresh the list after deletion
      },
      error: (error) => {
        console.error('Error deleting tarjeta:', error?.status, error?.statusText, error?.error ?? error?.message ?? error);
      }
    });
  }

  EditarTarjeta(tarjeta: any) {
    this.accion = 'Editar';
    this.id = tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: String(tarjeta.numeroTarjeta ?? ''),
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: String(tarjeta.cvv ?? ''),
    });
  }
}
