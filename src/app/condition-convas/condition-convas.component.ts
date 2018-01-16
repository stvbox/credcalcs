import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TreeItem } from '../tree-item';
import { ConditionTreeService } from '../condition-tree.service';

@Component({
  selector: 'app-condition-convas',
  templateUrl: './condition-convas.component.html',
  styleUrls: ['./condition-convas.component.css']
})
export class ConditionConvasComponent implements OnInit {
  private curCondsTree: TreeItem = null;

  constructor(private condTreeService: ConditionTreeService) {
    condTreeService.selectTree$.subscribe(tree => {
      this.curCondsTree = tree;
    });
  }

  ngOnInit() {
    
  }

}
