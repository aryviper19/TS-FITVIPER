import bcrypt from 'bcryptjs'
import { User } from "./models/userModel";
import { Product } from "./models/productModel";

export const sampleProducts: Product[]= [
    {
         //_id: '1',
      name: 'Push-Up Bar',
      slug: 'push-up-bar',
      category: 'Fitness-equipment',
      image: '/images/push-up-bar-black-green.jpg',
      price: 12.99,
      countInStock: 9,
      brand: 'FitViper',
      rating: 5,
      numReviews: 13,
      description: 'Perfect equipment for building muscles at home.',
    },
    {
      //_id: '2',
      name: 'Pull-Up Bar',
      slug: 'pull-up-bar',
      image: '/images/pull-up-bar.png',
      category: 'Fitness-equipment',
      price: 24.99,
      countInStock: 9,
      brand: 'FitViper',
      rating: 4.5,
      numReviews: 9,
      description: 'Perfect equipment for building muscles at home. 3 in 1!',
    },
    {
      //_id: '3',
      name: 'Forearm Trainer',
      slug: 'forearm-trainer',
      category: 'Fitness-equipment',
      image: "/images/Hand-Exerciser.jpg",
      price: 9.99,
      countInStock: 9,
      brand: 'FitViper',
      rating: 4.5,
      numReviews: 11,
      description: 'Perfect equipment for getting veiny forearms.',
    },
    {
      //_id: '4',
      name: 'Push-Up Board',
      slug: 'push-up-board',
      category: 'Fitness-equipment',
      image: '/images/Push-up-board.jpg',
      price: 18.99,
      countInStock: 0,
      brand: 'FitViper',
      rating: 4,
      numReviews: 7,
      description: 'Perfect equipment for building muscles at home.',
    }
 
]

export const sampleUsers: User[] = [
  {
    firstName: 'Joe',
    lastName: 'Hart',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    firstName: 'John',
    lastName: 'Cena',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
  {
    firstName: 'Aryan',
    lastName: 'Bisen',
    email: 'aryanbisen24@gmail.com',
    password: bcrypt.hashSync('FitViper'),
    isAdmin: true,
  },
]