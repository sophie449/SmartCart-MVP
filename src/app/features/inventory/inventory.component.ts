import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InventoryItem, InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventory: InventoryItem[] = [];
  newItem: InventoryItem = { name: '', quantity: 0, unit: '' };

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe(data => {
      this.inventory = data;
    });
  }

  addItem(): void {
    if (this.newItem.name && this.newItem.quantity && this.newItem.unit) {
      this.inventoryService.addItem(this.newItem).subscribe(() => {
        this.loadInventory();
        this.newItem = { name: '', quantity: 0, unit: '' };
      });
    }
  }

  deleteItem(id: number): void {
    this.inventoryService.deleteItem(id).subscribe(() => {
      this.loadInventory();
    });
  }
}
