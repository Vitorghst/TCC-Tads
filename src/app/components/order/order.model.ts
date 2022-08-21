class Order {
    constructor(
      public cep: string,
      public logradouro: string,
      public bairro: string,
      public localidade: string,
      public number: number,
      public optionalAddress: string,
      public paymentOption: string,
      public orderItems: OrderItem[] = []
    ){}
  }

  
  class OrderItem {
    constructor(public quantity: number, public menuId: string, public observacao: string, public adicionais: any){}
  }
  
  export {Order, OrderItem}
  