import {ConditionTreeService} from '../condition-tree.service';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { TreeItem } from '../tree-item';

@Component({
  selector: 'app-condition-trees',
  templateUrl: './condition-trees.component.html',
  styleUrls: ['./condition-trees.component.css']
})
export class ConditionTreesComponent implements OnInit {
  items: Array<TreeItem>;

  constructor(private condTreeSrvc: ConditionTreeService, private cd: ChangeDetectorRef) {
    condTreeSrvc.treesChanged$.subscribe(() => {
      this.refreshTrees();
    });
    this.refreshTrees();
  }

  refreshTrees() {
    this.condTreeSrvc.getTrees((trees)=>{
      this.items = trees;
    });
  }

  isActive(item: TreeItem): boolean {
    return this.condTreeSrvc.currentTree === item;
  }

  onTreeClick(treeItem: TreeItem) {
    this.condTreeSrvc.selectTree(treeItem);
  }

  createProgramm() {
    let tree = this.condTreeSrvc.createTree();
    this.onTreeClick(tree);
  }

  deleteProgramm() {
    this.condTreeSrvc.removeTree(this.condTreeSrvc.currentTree);
    this.cd.detectChanges();
  }

  ngOnInit() {
  }

}
