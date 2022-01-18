import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formvalue !: FormGroup;
  employee: Employee = new Employee(); 
  employees !: any;
  isAddingEmployee !: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {

   }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });

    this.employees = this.getAllEmployees()
  }


  clickAddEmployee() {
    this.formvalue.reset()
    this.isAddingEmployee = true
  }
  postEmployeedetails() {
    this.employee.firstname = this.formvalue.value.firstname;
    this.employee.lastname = this.formvalue.value.lastname;
    this.employee.email = this.formvalue.value.email;
    this.employee.mobile = this.formvalue.value.mobile;
    this.employee.salary = this.formvalue.value.salary;

    console.log("============================")
    console.log(this.employee)

    this.api.postEmploye(this.employee)
    .subscribe(res=> {
      alert("Successfully Added");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formvalue.reset();
      this.getAllEmployees();
    },
    err=> {
      alert("Something went wrong");
    })
  }

  getAllEmployees() {
    this.api.getEmploye()
    .subscribe(res => {
      this.employees = res
      console.log(res)
    });
  }

  deleteEmployee(employee: any) {
    this.api.deleteEmployee(employee.id)
    .subscribe(res => {
      alert("Employee deleted")
      this.getAllEmployees()
    }) 
  }

  onEdit(employee: any) {
    this.isAddingEmployee = false
    this.employee.id = employee.id;
    this.formvalue.controls['firstname'].setValue(employee.firstname);
    this.formvalue.controls['lastname'].setValue(employee.lastname);
    this.formvalue.controls['email'].setValue(employee.email);
    this.formvalue.controls['mobile'].setValue(employee.mobile);
    this.formvalue.controls['salary'].setValue(employee.salary);
  }

  updateEmployeedetails() {
    this.employee.firstname = this.formvalue.value.firstname;
    this.employee.lastname = this.formvalue.value.lastname;
    this.employee.email = this.formvalue.value.email;
    this.employee.mobile = this.formvalue.value.mobile;
    this.employee.salary = this.formvalue.value.salary;

    console.log(this.formvalue.value);

    this.api.updateEmployee(this.employee, this.employee.id)
    .subscribe(res => {
      alert("Updated Successfully")
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formvalue.reset();
      this.getAllEmployees();
    })
  }
}
