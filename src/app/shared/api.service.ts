import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmploye(employeData: any) {
    return this.http.post<any>("http://localhost:3000/posts", employeData)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  getEmploye() {
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any) => {
      return res;
    }))
  }

  updateEmployee(employeeData: any, id: number) {
    console.log("++++++++++++++++++++++++")
    console.log(id)
    return this.http.put<any>("http://localhost:3000/posts/"+id, employeeData)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any) => {
      return res;
    }))
  }

}
