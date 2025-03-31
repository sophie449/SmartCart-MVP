import { Component, OnInit } from '@angular/core';
import { InventoryService, InventoryItem } from './inventory.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventory: InventoryItem[] = [];
  newItem: InventoryItem = { name: '', quantity: 0, unit: '' };
  editItem: InventoryItem | null = null;

  constructor(private inventoryService: InventoryService) {}

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

  startEdit(item: InventoryItem): void {
    this.editItem = { ...item };
  }

  saveEdit(): void {
    if (this.editItem && this.editItem.id) {
      this.inventoryService.updateItem(this.editItem.id, this.editItem).subscribe(() => {
        this.loadInventory();
        this.editItem = null;
      });
    }
  }

  cancelEdit(): void {
    this.editItem = null;
  }
}
