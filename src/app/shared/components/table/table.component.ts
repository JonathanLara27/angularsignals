import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TableColumn } from '../../interfaces/table-colums.interface';

@Component({
  selector: 'shared-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() public columns!: TableColumn[];
  @Input() public data!: any[];
  public displayedColumns: string[] = [];

  public carga!: boolean;

  constructor() { }
  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

}
