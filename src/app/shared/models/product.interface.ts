export interface IProduct {
  // id:number;
  // title:string;
  // price:number;
  // description:string;
  // category:string;
  // image:string;
  // rating:IRating;
  // id: number;
  // title: string;
  // price:number;
  // description:string;
  // category: ICategory;
  // images:string[];
  id: number;
  title: string;
  description:string;
  price:number;
  discountPercentage:number,
  rating:number,
  stock:number,
  brand:string,
  category: string;
  thumbnail:string,
  images:string[];

}

export interface IResponseProducts{
  products: IProduct[];
  total:number,
  skip:number,
  limit:30
}
// export interface IRating{
//   rate:number;
//   count:number;
// }
// export interface ICategory{
//   id:number;
//   name:string;
//   image:string;
// }
