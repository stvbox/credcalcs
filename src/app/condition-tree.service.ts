import { Injectable } from '@angular/core';
import { RngCondition, TreeItem, ItemCondition } from './tree-item';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

export class TaxRangeParams {
  credit: number = 0;
  preprt: number = 0;
}

class LoadTreeItem{
  ID: number;
  NAME: string;
  TREE: TreeItem;
  createdAt: Date;
  updatedAt: Date;
}

const rootItem: TreeItem = {
  ID: null,
  name: 'Новостройка от партнеров',
  selected: false,
  conditions: [],
  taxranges: [],
  items: new Array<TreeItem>()

  /*items: TREES*/
};

@Injectable()
export class ConditionTreeService {
  currentTree: TreeItem = rootItem;
  condTrees: Array<TreeItem> = null;

  constructor(private http: HttpClient) { }

  getTrees(callback): void {
    if(!this.condTrees) {
      this.loadTrees().then(trees => {
        this.condTrees = trees;
        let tree = this.condTrees.length?this.condTrees[0]:null;
        this.selectTree(tree);
        callback(this.condTrees);
      });
    }
    else {
      callback(this.condTrees);
    }
  }

  loadTrees(): Promise<Array<TreeItem>> {
    //let url = 'http://localhost:3000/api/tree';
    //let url = 'http://192.168.56.1:3000/api/tree';
    let url = 'api/tree';
    return new Promise((res, rej) => {
      this.http.get<LoadTreeItem[]>(url).toPromise().then(result => {
        const trees = new Array<TreeItem>();
        result.forEach(item => {
          item.TREE['ID'] = item.ID;
          this.mergeTreeConditions(item.TREE);
          trees.push(item.TREE);
        });        
        res(trees);
      }).catch(result => {
        console.log('>>>>>>>> ' + result);
        rej(result);
      });
    });
  }

  createTree(): TreeItem {
    let tree = new TreeItem();
    this.getTrees((trees) => {
      trees.push(tree);
      this.treesChanged();
    });
    return tree;
  }
  
  saveTree(tree: TreeItem) {
    let url = 'api/tree';
    this.http.post(url, {tree: tree}).subscribe(result => {
      console.log(result);
    });
  }

  getTree(): TreeItem {
    return this.currentTree;
  }

  checkCondition(item: TreeItem, conditions: Array<ItemCondition>): boolean {
    if(item.conditions.length == 0) return true;
    let result = true;

    for (let index in item.conditions) {
      let condition = item.conditions[index];
      if(condition.selected != condition.value) result = false;
    }

    return result;
  }

  resetItemSelections(item: TreeItem): void {
    item.selected = false;
    for(var index in item.items) {
      item.items[index].selected = false;
      this.resetItemSelections(item.items[index]);
    }
  }

  _moveNode(item: TreeItem, offset: number) {
    let parenNode = this.findParentForNode(item, null);
    var index = parenNode.items.lastIndexOf(item);
    var newIndex = index + offset;

    if(parenNode.items[newIndex]){
      var tmpItem = parenNode.items[newIndex];
      parenNode.items[newIndex] = parenNode.items[index];
      parenNode.items[index] = tmpItem;
    }
    this.treeChanged();
  }

  moveNodeLeft(item: TreeItem) {
    this._moveNode(item, -1);
  }

  moveNoderight(item: TreeItem) {
    this._moveNode(item, 1);
  }

  removeTree(item: TreeItem): boolean {
    let newTree = this.condTrees.filter(tree => {
      return tree != item;
    });
    this.condTrees = newTree;
    this.currentTree = this.condTrees.length?this.condTrees[0]:null;

    //this.treeChanged();
    this.selectTree(this.currentTree);
    this.treesChanged();

    return true;
  }

  removeNode(item: TreeItem): boolean {
    let parenNode = this.findParentForNode(item, null);
    var index = parenNode.items.indexOf(item);
    parenNode.items.splice(index, 1);
    console.log(parenNode.name);

    this.treeChanged();

    return true;
  }

  getAllConditions(): Array<ItemCondition> {
    let many = new Array<ItemCondition>();

    this.getConditions(this.currentTree).forEach(item => {
      if(many.indexOf(item) == -1) many.push(item);
    });

    return many;
  }

  getConditions(item: TreeItem): Array<ItemCondition> {
    var resultConditions = new Array<ItemCondition>();
    if(item == null) return resultConditions;

    for(var index in item.conditions) {
      resultConditions.push(item.conditions[index]);
    }

    for(var index in item.items) {
      var tmpConds = this.getConditions(item.items[index]);
      resultConditions = resultConditions.concat(tmpConds);
    }

    return resultConditions;
  }

  removeCondition(item: TreeItem, condition: ItemCondition) {
    let newConditions = item.conditions.filter(findCond => {
      return findCond !== condition;
    });
    item.conditions = newConditions;
    this.treeChanged();
  }

  findParentForNode(item: TreeItem, many: TreeItem): TreeItem {
    if(many == null) many = this.currentTree;

    for(var index in many.items) {
      if(many.items[index] == item) return many;
      
      var result = this.findParentForNode(item, many.items[index]);
      if(result != null) return result;
    }

    return null;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Действия над условиями /////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  traceConditions(conditions: Array<ItemCondition>, treeItem: TreeItem = null, taxParams: TaxRangeParams = null): Array<TreeItem> {
    var returnItems = new Array<TreeItem>();
  
    let firstIteration = false;
    if(treeItem === null) {
      treeItem = this.currentTree;
      this.resetItemSelections(treeItem);
      firstIteration = true;
    }
  
    for(var index in treeItem.items) {
      var testItem = treeItem.items[index];
      if(this.checkCondition(testItem, conditions)) {
        returnItems.push(testItem);
        var innerItems = this.traceConditions(conditions, testItem, taxParams);
        returnItems = returnItems.concat(innerItems);
        //continue;
      }
    }
  
    var bestItem: TreeItem = null;
    if(firstIteration) {
      let stop = false;
      for(var index in returnItems) {
        if(stop) break;

        let taxRange = this.getNodeTaxRange(returnItems[index], taxParams);
        if(taxRange) {
          returnItems[index].selected = true;
          bestItem = returnItems[index];
          stop = true;
        }

        /*if(returnItems[index].taxranges.length > 0){
          returnItems[index].selected = true;
          bestItem = returnItems[index];
          stop = true;
        }*/
      }
    }

    return returnItems;
  }

  findConditionTwin(condition: ItemCondition, callback): ItemCondition {
    let twin = this.getAllConditions().find(findCond => {
      if(condition === findCond) return false;
      return findCond.title == condition.title;
    });
    callback(twin);
    return twin;
  }

  mergeTreeConditions(tree: TreeItem, conditions: Array<ItemCondition> = new Array<ItemCondition>()) {
    tree.items.forEach(item => {
      this.mergeTreeConditions(item, conditions);
    });

    let newConds = new Array<ItemCondition>();
    tree.conditions.forEach(condition => {
      let existCondition = conditions.find(existCondition => {
        /*if(existCondition.title == condition.title){
          console.log(existCondition.title + ' >> ' + condition.title);
        }*/
        return existCondition.title == condition.title;
      });

      let pushItem = existCondition?existCondition:condition;
      newConds.push(pushItem);
      conditions.push(pushItem);
    });

    tree.conditions = newConds;

    return conditions;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Действия над ставками //////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  getNodeTaxRange(node: TreeItem, params: TaxRangeParams): RngCondition {
    /*console.log(' ---- node: ' + JSON.stringify(node));*/
    var taxRange: RngCondition = null;
    node['taxranges'].sort((a, b)=>{
      if(a.toTax > b.toTax) return -1;
      if(a.toTax < b.toTax) return 1;
      return 0;
    }).forEach(range => {
      if(params.preprt < range.toTax){
        taxRange = range;
      }
    });
    /*console.log(' ---- tax: ' + JSON.stringify(taxRange));*/
    return taxRange;
  }

  removeTaxRange(item: TreeItem, tax: RngCondition) {
    let newTaxs = item.taxranges.filter(findTax => {
      return findTax !== tax;
    });
    item.taxranges = newTaxs;
  }

  //////////////////////////////////////////////////////////////////////////
  // События ///////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  private selectTreeSource = new Subject<TreeItem>();
  selectTree$ = this.selectTreeSource.asObservable();
  selectTree(treeItem: TreeItem) {

    console.log('selectTree: ' + treeItem);

    this.currentTree = treeItem;
    this.selectTreeSource.next(treeItem);
  }

  private treeChangedSource = new Subject();
  treeChanged$ = this.treeChangedSource.asObservable();
  treeChanged() {
    this.treeChangedSource.next();
  }

  private treesChangedSource = new Subject<void>();
  treesChanged$ = this.treesChangedSource.asObservable();
  treesChanged() {
    this.treesChangedSource.next();
  }

}
