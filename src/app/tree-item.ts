
export class ItemCondition {
    title: string;
    value: boolean;
    selected: boolean;

    constructor() {
        this.title = "новое условие";
        this.value = true;
        this.selected = false;
    }
}

export class RngCondition {
    toTax: number;
    tax1: number;
    tax2: number;

    constructor() {
        this.toTax = 0;
        this.tax1 = 0;
        this.tax2 = 0;
    }
}

export class TreeItem {
    ID: number;
    name: string;
    items: TreeItem[];
    conditions: ItemCondition[];
    taxranges: RngCondition[];
    selected: boolean;

    constructor() {
        this.name = 'Новая';
        this.items = [];
        this.conditions = [];
        this.taxranges = [];
        this.selected = false;
    }

}

/*export const TREES: TreeItem[] = [
    { name: 'Ветвь по акции 7,7', selected: false, conditions: [
        {title: 'Акция 7,7', selected: false, value: true }
    ], taxranges: [] ,items: [
        {name: 'Для сотрудников партнеров', selected: false, conditions: [
            {title: 'Сотрудник партнера', selected: false, value: true }
        ], taxranges: [
            {toTax: 85, tax1: 7.7, tax2: 10.45}
        ], items: []},
        {name: 'Для зарплатников', selected: false, conditions: [
            { title: 'Держатель зарплатной карты', selected: false, value: true }
        ], taxranges: [
            {toTax: 85, tax1: 7.7, tax2: 10.45}
        ], items: []},
        {name: 'Общие условия', selected: false, conditions: [], taxranges: [], items: [
            {name: 'Со страховкой', selected: false, conditions: [
                {title: 'Страхование жизни', selected: false, value: true}
            ], taxranges: [
                {toTax: 85, tax1: 7.7, tax2: 10.45}
            ], items: []},
            {name: 'Без страховки', selected: false, conditions: [], taxranges: [
                {toTax: 85, tax1: 7.7, tax2: 10.45}
            ], items: []},
        ]}
    ]},
    { name: "Дома по спецпредложению", selected: false, conditions: [
        { title: 'МКР Полтавский', selected: false, value: true }
    ], taxranges: [
        {toTax: 85, tax1: 7.7, tax2: 10.45}
    ], items: [] },
    { name: "Общие условия", selected: false, conditions: [], taxranges: [
        {toTax: 85, tax1: 12, tax2: 12}
    ], items: [] }
];*/

