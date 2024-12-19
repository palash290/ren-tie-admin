import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  apiUrl = environment.baseUrl

  constructor(private http: HttpClient, private route: Router) { }

  setToken(token: string) {
    localStorage.setItem('rentieToken', token)
  }

  getToken() {
    return localStorage.getItem('rentieToken')
  }

  isLogedIn() {
    return this.getToken() !== null
  }

  loginUser(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    return this.http.post<any>(this.apiUrl + 'adminRouter/login', params, {
      headers: headers
    })
  }

  support(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    return this.http.post<any>(
      this.apiUrl + 'userRouter/sendSupportEmail',
      params,
      {
        headers: headers
      }
    )
  }

  getApi(url: any): Observable<any> {
    const authToken = localStorage.getItem('rentieToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    })
    return this.http.get(this.apiUrl + url, { headers: headers })
  }

  postAPI(url: any, data: any): Observable<any> {
    const authToken = localStorage.getItem('rentieToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${authToken}`
    })
    return this.http.post(this.apiUrl + url, data, { headers: headers })
  }

  postAPIFormData(url: any, data: any): Observable<any> {
    const authToken = localStorage.getItem('rentieToken')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    })
    return this.http.post(this.apiUrl + url, data, { headers: headers })
  }

  updatePassword(params: any): Observable<any> {
    const authToken = localStorage.getItem('rentieToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${authToken}`
    })
    return this.http.post<any>(
      this.apiUrl + 'adminRouter/changePassword',
      params,
      { headers: headers }
    )
  }

  logout() {
    localStorage.removeItem('rentieToken')
    this.route.navigateByUrl('/admin/login')
  }

  uploadImages(
    existingImages: string[],
    newImages: File[],
    id: any
  ): Observable<any> {
    const authToken = localStorage.getItem('rentieToken')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    })
    const formData = new FormData()
    formData.append('user_id', id)
    //existingImages.forEach(imageUrl => formData.append('uploads', JSON.stringify(imageUrl)));
    formData.append('uploads', JSON.stringify(existingImages))
    newImages.forEach(image => formData.append('uploads', image))
    return this.http.post(this.apiUrl + 'adminRouter/updateImage', formData, {
      headers: headers
    })
  }

  deleteImage(imageUrl: any): Observable<any> {
    const authToken = localStorage.getItem('rentieToken')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    })
    return this.http.post(`${this.apiUrl}adminRouter/deleteImage`, imageUrl, {
      headers: headers
    })
  }

  // Example function to delete activity
  deleteActivity(payload: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: payload
    }
    return this.http.request(
      'delete',
      `${this.apiUrl}/adminRouter/delete_activity`,
      options
    )
  }

  resetPassword(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    return this.http.post<any>(this.apiUrl + '/changePassword', params, {
      headers: headers
    })
  }
}
