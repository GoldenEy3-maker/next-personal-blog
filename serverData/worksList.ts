import {WorksList} from "../typescript/interfaces";

import WorkImage1 from '../public/images/works1.jpg'
import WorkImage2 from '../public/images/works2.jpg'

export const worksList: WorksList[] = [
  {
    id: 1,
    image: WorkImage1,
    title: 'altermono.com',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.',
    tags: ['дизайн', 'создание сайта', 'SMM'],
    href: '#'
  },
  {
    id: 2,
    image: WorkImage2,
    title: 'codedoco.com',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. ',
    tags: ['дизайн', 'создание сайта', 'SMM'],
    href: '#'
  }
]