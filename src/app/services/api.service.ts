import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  products: any[] = [];
  _products$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.products)
  products$: Observable<any[]> = this._products$.asObservable()

  constructor(private http: HttpClient) {
  }

  postProduct(product: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/productList/", product).pipe(
      tap(()=> {
        this.getProduct()
      })
    )
  }

  getProduct(): Observable<any[]> {
    this.http.get<any[]>("http://localhost:3000/productList/").subscribe(
      (products) => {
        this._products$.next(products)
      }
    )
    return this.products$
  }

  updateProduct(data: any, id: number): Observable<any> {
    return this.http.put<any>("http://localhost:3000/productList/" + id, data).pipe(
      tap(() => {
        this.getProduct()
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>("http://localhost:3000/productList/" + id).pipe(
      tap(() => {
        this.getProduct()
      })
    );
  }
}
