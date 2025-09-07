import { plainToClass } from 'class-transformer';
import { Product } from '../services/product/product.types';
export const loadProducts = (): Product[] => {
  return plainToClass(Product, [
    {
      id: 545,
      name: 'Arctocat Shirt',
      slug: 'arctocat_shirt',
      price: 40,
      salePrice: 0,
      discountInPercent: 0,
      description:
        "A 15-hour matte finish your skin will feel good about! Clarins' long-wearing compact foundation evens out skin tone and minimizes the look of imperfections in seconds, delivering a shine-free, matte finish and hours of comfortable wear. Ultra-fine texture resists heat, humidity and perspiration for flawless coverage that lasts throughout the day.",
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/1.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/1.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/2.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/3.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/4.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 546,
      name: 'I [octocat] Code 2.0 Shirt',
      slug: 'i_octocat_code',
      unit: '1 pc(s)',
      price: 40,
      salePrice: 0,
      discountInPercent: 0,
      description:
        "A 15-hour matte finish your skin will feel good about! Clarins' long-wearing compact foundation evens out skin tone and minimizes the look of imperfections in seconds, delivering a shine-free, matte finish and hours of comfortable wear. Ultra-fine texture resists heat, humidity and perspiration for flawless coverage that lasts throughout the day.",
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/2.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/2.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/3.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/4.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/5.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 547,
      name: 'Pur Foundation',
      slug: 'pur',
      unit: '1 pc(s)',
      price: 60,
      salePrice: 0,
      discountInPercent: 0,
      description:
        "A 15-hour matte finish your skin will feel good about! Clarins' long-wearing compact foundation evens out skin tone and minimizes the look of imperfections in seconds, delivering a shine-free, matte finish and hours of comfortable wear. Ultra-fine texture resists heat, humidity and perspiration for flawless coverage that lasts throughout the day.",
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/3.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/3.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/4.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/5.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/6.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 548,
      name: 'GitHub Username Shirt',
      slug: 'gitHub_username_shirt',
      unit: '1 pc(s)',
      price: 12,
      salePrice: 6,
      discountInPercent: 50,
      description:
        'Reach pout perfection with the Matte Me Up Liquid Lip Paint and Liner. Its non-drying, ultra-long wearing formula is easy to apply and will leave lips with a gorgeously bold finish. Each kit comes with a matte liquid Lip Paint and Lip Liner. ',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/4.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/4.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/5.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/6.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/7.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 549,
      name: 'Atom Shirt',
      slug: 'atom_shirt',
      unit: '1 pc(s)',
      price: 40,
      salePrice: 20,
      discountInPercent: 50,
      description:
        'Reach pout perfection with the Matte Me Up Liquid Lip Paint and Liner. Its non-drying, ultra-long wearing formula is easy to apply and will leave lips with a gorgeously bold finish. Each kit comes with a matte liquid Lip Paint and Lip Liner. ',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/5.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/5.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/6.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/7.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/8.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 550,
      name: 'Atom 2.0 Shirt',
      slug: 'atom_2.0_shirt',
      unit: '1 pc(s)',
      price: 40,
      salePrice: 32,
      discountInPercent: 20,
      description:
        'Reach pout perfection with the Matte Me Up Liquid Lip Paint and Liner. Its non-drying, ultra-long wearing formula is easy to apply and will leave lips with a gorgeously bold finish. Each kit comes with a matte liquid Lip Paint and Lip Liner. ',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/6.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/6.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/7.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/8.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/9.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 551,
      name: 'Octocat One-Piece',
      slug: 'octocat_one_piece',
      unit: '1 pc(s)',
      price: 40,
      salePrice: 0,
      discountInPercent: 0,
      description:
        'Reach pout perfection with the Matte Me Up Liquid Lip Paint and Liner. Its non-drying, ultra-long wearing formula is easy to apply and will leave lips with a gorgeously bold finish. Each kit comes with a matte liquid Lip Paint and Lip Liner. ',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/7.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/7.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/8.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/9.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/10.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 552,
      name: 'Kids Octocat Raglan Tee',
      slug: 'kids_octocat_raglan_tee',
      unit: '1 pc(s)',
      price: 35,
      salePrice: 0,
      discountInPercent: 0,
      description:
        'Reach pout perfection with the Matte Me Up Liquid Lip Paint and Liner. Its non-drying, ultra-long wearing formula is easy to apply and will leave lips with a gorgeously bold finish. Each kit comes with a matte liquid Lip Paint and Lip Liner. ',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/8.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/8.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/9.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/10.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/11.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 553,
      name: 'GitHub Drip Tee',
      slug: 'gitHub_drip_tee',
      unit: '1 pc(s)',
      price: 50,
      salePrice: 0,
      discountInPercent: 0,
      description:
        'Reach pout perfection with the Matte Me Up Liquid Lip Paint and Liner. Its non-drying, ultra-long wearing formula is easy to apply and will leave lips with a gorgeously bold finish. Each kit comes with a matte liquid Lip Paint and Lip Liner. ',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/9.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/9.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/10.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/11.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/12.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 554,
      name: 'Questocat Tee',
      slug: 'questocat_tee',
      unit: '1 pc(s)',
      price: 50,
      salePrice: 0,
      discountInPercent: 0,
      description:
        'Reach pout perfection with the Matte Me Up Liquid Lip Paint and Liner. Its non-drying, ultra-long wearing formula is easy to apply and will leave lips with a gorgeously bold finish. Each kit comes with a matte liquid Lip Paint and Lip Liner. ',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/10.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/10.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/11.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/12.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/13.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 555,
      name: 'Pride T-Shirt',
      slug: 'pride_t_shirt',
      unit: '1 pc(s)',
      price: 20,
      salePrice: 15,
      discountInPercent: 25,
      description:
        'M·A·C Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/11.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/11.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/12.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/13.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/14.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 556,
      name: 'Invertocat 3.0 Shirt',
      slug: 'invertocat_3.0_shirt',
      unit: '1 pc(s)',
      price: 20,
      salePrice: 15,
      discountInPercent: 25,
      description:
        'M·A·C Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/12.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/12.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/13.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/14.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/15.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 557,
      name: 'Trans Pride T-Shirt',
      slug: 'trans_pride_t_shirt',
      unit: '1 pc(s)',
      price: 20,
      salePrice: 15,
      discountInPercent: 25,
      description:
        'M·A·C Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/13.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/13.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/14.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/15.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/16.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 558,
      name: "Kid's Raglan Pride Shirt",
      slug: 'kid_raglan_pride_shirt',
      unit: '1 pc(s)',
      price: 20,
      salePrice: 15,
      discountInPercent: 25,
      description:
        'M·A·C Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/14.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/14.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/15.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/16.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/17.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 559,
      name: 'Pride Baby Onesie',
      slug: 'pride_baby_onesie',
      unit: '1 pc(s)',
      price: 25,
      salePrice: 0,
      discountInPercent: 0,
      description:
        'M·A·C Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/15.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/15.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/16.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/17.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/18.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 560,
      name: 'De Los Muertos Shirt',
      slug: 'de_los_muertos_shirt',
      unit: '1 pc(s)',
      price: 20,
      salePrice: 0,
      discountInPercent: 0,
      description:
        'M·A·C Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/16.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/16.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/17.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/18.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/19.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 561,
      name: 'Tarteist Glossy Gloss',
      slug: 'tarteist-glossy',
      unit: '1 pc(s)',
      price: 20,
      salePrice: 0,
      discountInPercent: 0,
      description:
        'M·A·C Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/17.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/17.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/18.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/19.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/20.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 562,
      name: 'Grim Repo Shirt',
      slug: 'grim_repo_shirt',
      unit: '1 pc(s)',
      price: 25,
      salePrice: 0,
      discountInPercent: 0,
      description:
        'M·A·C Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/18.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/18.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/19.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/20.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/21.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },

    {
      id: 563,
      name: "Talking Monas - Kid's Raglan",
      slug: 'talking_monas_kid_s_raglan',
      unit: '1 pc(s)',
      price: 20,
      salePrice: 16,
      discountInPercent: 20,
      description:
        'M·A·C Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/19.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/19.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/20.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/21.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/1.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 564,
      name: 'Talking Monas - Onesie',
      slug: 'talking_monas_onesie',
      unit: '1 pc(s)',
      price: 20,
      salePrice: 16,
      discountInPercent: 20,
      description:
        'M·A·C Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/20.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/20.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/21.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/1.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/2.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
    {
      id: 565,
      name: 'Talking Monas Pocket T-Shirt',
      slug: 'talking_monas_pocket_t_shirt',
      unit: '1 pc(s)',
      price: 20,
      salePrice: 0,
      discountInPercent: 0,
      description:
        'M·A·C Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
      type: 'makeup',
      thumbnail: {
        src: 'https://s3.amazonaws.com/redqteam.com/inst/shop/21.jpg',
        width: 480,
        height: 480,
      },
      gallery: [
        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/21.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/1.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/2.jpg',
          width: 480,
          height: 480,
        },

        {
          url: 'https://s3.amazonaws.com/redqteam.com/inst/shop/3.jpg',
          width: 480,
          height: 480,
        },
      ],
      features: [
        '12oz stoneware mug',
        'Matte outside - glossy color inside',
        'Hand wash recommended',
      ],
      colors: [
        {
          label: 'Black',
          id: 'black',
          code: '#000',
        },
        {
          label: 'Red',
          id: 'red',
          code: '#f00',
        },
        {
          label: 'Blue',
          id: 'blue',
          code: '#00f',
        },
      ],
    },
  ]);
};
