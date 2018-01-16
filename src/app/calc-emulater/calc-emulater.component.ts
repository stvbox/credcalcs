import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConditionTreeService, TaxRangeParams } from '../condition-tree.service';
import { RngCondition, ItemCondition,  TreeItem} from '../tree-item';

@Component({
  selector: 'app-calc-emulater',
  templateUrl: './calc-emulater.component.html',
  styleUrls: ['./calc-emulater.component.css']
})
export class CalcEmulaterComponent implements OnInit {
  conditios: Array<ItemCondition>;
  curentNode: TreeItem;

  credit: number = 0;
  prepay: number = 0;
  prepayRate: number = 0;

  taxRange:RngCondition = null;
  viewTaxRange:String = "";

  constructor(private cd: ChangeDetectorRef, private condTreSrvc: ConditionTreeService) {
    this.condTreSrvc.selectTree$.subscribe(treeItem => {
      this.conditios = this.condTreSrvc.getAllConditions();
    });

    this.condTreSrvc.treeChanged$.subscribe(()=>{
      console.log('CalcEmulaterComponent');
      this.conditios = this.condTreSrvc.getAllConditions();
    });

  }

  getTaxParams(): TaxRangeParams {
    let prepay:number = this.prepay;
    let credit:number = this.credit;
    this.prepayRate = prepay / (credit*1 + prepay*1) * 100;
    this.prepayRate = Math.round(this.prepayRate * 100) / 100;
    this.prepayRate = this.prepayRate?this.prepayRate:0;

    return {credit: credit, preprt: this.prepayRate} as TaxRangeParams;
  }

  onConditionClick() {
    this.calcConditions();
  }

  calcConditions() {
    let params = this.getTaxParams();
    var nodes = this.condTreSrvc.traceConditions(this.conditios, null, params);
    this.curentNode = nodes.find(item => item.selected);
    if(this.curentNode) {
      this.taxRange = this.condTreSrvc.getNodeTaxRange(this.curentNode, params);
      this.viewTaxRange = JSON.stringify(this.taxRange);
    }
    this.cd.detectChanges();
  }

  ngOnInit() { }

}
