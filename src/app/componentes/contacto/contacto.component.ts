import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  formData = {};

  constructor(private http: HttpClient) {}

  submitForm() {
      this.generarPDF();
  }

  generarPDF() {
    const nombre =(<HTMLInputElement>document.getElementById("name")).value;
    const telefono =(<HTMLInputElement>document.getElementById("contact")).value;
    const mail=(<HTMLInputElement>document.getElementById("email")).value;

    const contacto = new jsPDF();

    contacto.text('Contacto: ' + nombre, 40, 40);
    contacto.text('Telefono del contacto: ' + telefono, 40, 60);
    contacto.text('Mail del contacto: ' + mail, 40, 80);

    contacto.save('formulario.pdf');


  }
}
