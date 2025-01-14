import bcryptjs from 'bcryptjs';
import { Brand } from '../interfaces/brand.interface';
import { Measure } from '@prisma/client';


interface SeedProduct {
  description: string;
  codigoean13: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  brandId: string;
  categoryId: string;
  descriptionMeasure: string;
  measure: Measure;
}
interface SeedBrand{
  name: string;
  state: 'activo' | 'inactivo';
}

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: 'admin'|'user'
}



type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';

interface SeedData {
  users: SeedUser[];
  categories: string[];
  //products: SeedProduct[];
  brands: SeedBrand[];
}




export const initialData: SeedData = {
brands: [
  {
    name: 'Coca Cola', 
    state: 'activo'
  },
  {
    name: 'Nestle',
    state: 'activo'
  },
  {
    name: 'Puma',
    state: 'activo'
  },
  {
    name: 'Reebok',
    state: 'activo'
  },
  {
    name: 'Converse',
    state: 'activo'
  },
  {
    name: 'Skechers',
    state: 'inactivo'
  },
  {
    name: 'Vans',
    state: 'activo'
  }

  
],
  users: [
    {
      email: 'favio@google.com',
      name: 'Favio Carbajal',
      password: bcryptjs.hashSync('123456'),
      role: 'admin'
    },
    {
      email: 'wuilmer@google.com',
      name: 'Wuilmer Carbajal',
      password: bcryptjs.hashSync('123456'),
      role: 'admin'
    },
    {
      email: 'Maria@google.com',
      name: 'Maria Flores',
      password: bcryptjs.hashSync('123456'),
      role: 'user'
    },


  ],


  categories: [
    'Abarrotes',
    'Bebidas', 
    'Cuidado Personal',
    'Higiene',
    'Licores',
    'Todos',
  ],
  /* products: [
    {
      "title": "Bebida FRUGOS Fresh Citrus Naranja Botella 1.5L",

      images: [
        'https://res.cloudinary.com/dcdnrrshw/image/upload/v1736814245/products/yizpltlb8mn665len5gl.webp',
        'https://res.cloudinary.com/dcdnrrshw/image/upload/v1736814837/products/lxx99ggojgkv4hlytk85.webp'
      ],
      "description": "Bebida FRUGOS Fresh Citrus Naranja Botella 1.5L",
      "inStock": 10,
      "price": 2.5,
      "sizes": [],
      "slug": "bebida-frugos-fresh-citrus-naranja-botella-1.5l",
      "tags": [ 'frugos', 'naranja' ],
      "gender": "unisex",
      "categoryId": "0cccdef4-cd61-4723-b34d-dfb83f5b3066",
      "brandId": "9f5807b6-c66f-4e81-95a7-a911ada9e30d",
      "descriptionMeasure": "1.5",
      "measure": "litro",
      "codigoean13": "1234567891234",
      type: 'shirts'
    }
  ] */
};