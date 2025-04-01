import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ]
})
export class RecipeComponent implements OnInit {
  availableIngredients: string[] = [];
  selectedIngredients: string[] = [];
  selectedFilter: string = 'Keine Einschränkung';
  generatedRecipe: string = '';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory() {
    this.recipeService.getInventory().subscribe(
      response => {
        this.availableIngredients = response.map(item => item.name);
        console.log('✅ Zutaten erfolgreich geladen:', this.availableIngredients);
      },
      error => console.error('❌ Fehler beim Laden des Inventars:', error)
    );
  }

  generateRecipe() {
    this.http.post<any>('http://localhost:3000/api/recipes/generate', {
      ingredients: this.selectedIngredients,
      filter: this.selectedFilter
    }).subscribe(
      response => {
        this.generatedRecipe = response.recipe;
        console.log('✅ Rezept erfolgreich geladen:', this.generatedRecipe);
      },
      error => console.error('❌ Fehler beim Laden des Rezepts:', error)
    );
  }

  toggleIngredientSelection(ingredient: string) {
    if (this.selectedIngredients.includes(ingredient)) {
      this.selectedIngredients = this.selectedIngredients.filter(i => i !== ingredient);
    } else {
      this.selectedIngredients.push(ingredient);
    }
  }
}
