export interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    imagePath: any
    category: string,
}





export class CartItem {
  constructor(public menuItem: MenuItem, 
              public quantity: number = 1,
              public observacao: string = '',
              public adicionais: string = ''
      ){}

  
  value(): number {
    return this.menuItem.price * this.quantity
  }

  


}
