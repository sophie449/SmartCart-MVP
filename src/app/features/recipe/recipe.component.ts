import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MarkdownComponent} from 'ngx-markdown';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  imports: [
    FormsModule,
    MarkdownComponent,
    NgIf
  ],
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  selectedIngredients: string[] = [];
  selectedFilter: string = 'Vegetarisch';
  generatedRecipe: string = '';

  constructor(private http: HttpClient) {}

  updateIngredients(event: any) {
    this.selectedIngredients = event.target.value.split(',').map((ingredient: string) => ingredient.trim());
  }

  generateRecipe() {
    const payload = {
      ingredients: this.selectedIngredients,
      filter: this.selectedFilter
    };

    this.http.post<any>('http://localhost:3000/api/recipes/generate', payload).subscribe(
      response => {
        this.generatedRecipe = response.recipe;
      },
      error => {
        console.error('❌ Fehler bei der Rezeptgenerierung:', error);
      }
    );
  }
}
