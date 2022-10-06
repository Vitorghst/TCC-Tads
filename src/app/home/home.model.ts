export interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    imagePath: any
    category: string,
}

export interface Adicionais {
    id: string
    name: string
    price: number
}





export class CartItem {
  constructor(public menuItem: MenuItem, 
              public quantity: number = 1,
              public adicionais: Adicionais[] = [],
              public observacao: string = '',
      ){}

  
  value(): number {
    return this.menuItem.price * this.quantity 
  }

  


}
