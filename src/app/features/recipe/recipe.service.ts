import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  generateRecipe(ingredients: string[], filter: string): Observable<any> {
    return this.http.post('/api/recipes/generate', { ingredients, filter });
  }
}
