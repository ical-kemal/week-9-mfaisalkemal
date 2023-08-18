export class User {
  constructor(public id: number, public name: string, public adress: string) {}
}

export class Transactions {
  constructor(public id: number, public user_id: string, public type: string, public amount: number) {}
}
