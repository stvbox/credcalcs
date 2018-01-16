import { Component, OnInit, Input } from '@angular/core';
import { TreeItem, ItemCondition, RngCondition } from '../tree-item';
import { ConditionTreeService } from '../condition-tree.service';

@Component({
  selector: 'app-condition-way',
  templateUrl: './condition-way.component.html',
  styleUrls: ['./condition-way.component.css']
})
export class ConditionWayComponent implements OnInit {
  @Input() item: TreeItem;
  @Input() isFirstNode: boolean;

  constructor(private conditionTree: ConditionTreeService) { }

  removeTaxRange(item: TreeItem, tax: RngCondition) {
    this.conditionTree.removeTaxRange(item, tax);
  }

  moveLeft(item: TreeItem) {
    this.conditionTree.moveNodeLeft(item);
  }

  moveRight(item: TreeItem) {
    this.conditionTree.moveNoderight(item);
  }

  removeCondition(item: TreeItem, condition: ItemCondition) {
    this.conditionTree.removeCondition(item, condition);
  }

  onChangeCondition(item: TreeItem, condition: ItemCondition) {
    let newCondotions = new Array<ItemCondition>();

    this.conditionTree.findConditionTwin(condition, findCondition => {
      if(findCondition) {
        let index = item.conditions.indexOf(condition);
        item.conditions[index] = findCondition;
      }
    });

    for(var index in item.conditions){
      if(!item.conditions[index].title.length) continue;
      newCondotions.push(item.conditions[index]);
    }

    item.conditions = newCondotions;
    this.conditionTree.treeChanged();
  }

  saveTree() {
    this.conditionTree.saveTree(this.item);
  }

  addCondition(): void {
    if(this.item.conditions === null) this.item.conditions = [];
    this.item.conditions.unshift(new ItemCondition());
    this.conditionTree.treeChanged();
  }

  addRange(): void {
    if(this.item.taxranges === null) this.item.taxranges = [];
    this.item.taxranges.unshift(new RngCondition());
  }

  addBranch(): void {
    if(this.item.items == null) this.item.items = [];
    this.item.items.unshift(new TreeItem());
    this.conditionTree.treeChanged();
  }

  delBranch(item: TreeItem): void {
    this.conditionTree.removeNode(item);
  }

  isEnd(): boolean {
    if(this.item.items === null) return true;
    if(this.item.items.length === 0) return true;
    return false;
  }

  ngOnInit() {
  }

}
