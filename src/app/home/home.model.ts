export interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    imagePath: string, 
    category: string,
}





export class CartItem {
  constructor(public menuItem: MenuItem,
              public quantity: number = 1,
      ){}

  value(): number {
    return this.menuItem.price * this.quantity
  }



}
