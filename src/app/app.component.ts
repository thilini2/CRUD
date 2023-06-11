import { Component } from '@angular/core';

interface Employee {
  name: string;
  designation: string;
  salary: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD-APP';
  employees: Employee[] = [];
  newEmployee: Employee = { name: '', designation: '', salary: 0 };
  editingEmployee: Employee | null = null;

  addEmployee() {
    if (this.editingEmployee) {
      this.updateEmployee();
    } else {
      this.employees.push(this.newEmployee);
      this.newEmployee = { name: '', designation: '', salary: 0 };
      this.saveToLocalStorage();
    }
  }

  editEmployee(employee: Employee) {
    this.editingEmployee = employee;
    this.newEmployee = { ...employee };
  }

  updateEmployee() {
    if (this.editingEmployee) {
      const index = this.employees.indexOf(this.editingEmployee);
      this.employees[index] = this.newEmployee;
      this.editingEmployee = null;
      this.newEmployee = { name: '', designation: '', salary: 0 };
      this.saveToLocalStorage();
    }
  }

  deleteEmployee(employee: Employee) {
    const index = this.employees.indexOf(employee);
    this.employees.splice(index, 1);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  getFromLocalStorage() {
    const data = localStorage.getItem('employees');
    if (data) {
      this.employees = JSON.parse(data);
    }
  }

  ngOnInit() {
    this.getFromLocalStorage();
  }

}
