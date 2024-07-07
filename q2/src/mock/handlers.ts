import { http, HttpResponse, passthrough } from 'msw';
import { faker } from '@faker-js/faker';
import { Customer } from '../domain/customer';
import { Product } from '../domain/product';


const generateRandomCustomer = (): Customer => {
  return {
    id: Math.floor(Math.random() * 9999),
    name: faker.person.fullName(),
    country: {
      name: faker.location.country(),
      code: faker.location.countryCode(),
    },
    company: faker.company.name(),
    date: faker.date.recent(),
    status: faker.helpers.arrayElement(['unqualified', 'proposal', 'qualified', 'new', 'renewal']),
    verified: faker.datatype.boolean(),
    activity: faker.number.int(100),
    representative: {
      name: faker.person.fullName(),
      image: faker.image.avatar(),
    },
    balance: faker.number.int({
      min: 10000,
      max: 99999,
    }),
  };
};

const generateRandomProduct = (): Product => {
  return {
    id: Math.floor(Math.random() * 9999),
    code: faker.string.alphanumeric(10),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    price: faker.number.int({ min: 10, max: 999 }),
    category: faker.helpers.arrayElement(['Accessories', 'Fitness', 'Clothing', 'Electronics', 'Fitness']),
    quantity: faker.number.int({ min: 1, max: 100 }),
    inventoryStatus: faker.helpers.arrayElement(['OUTOFSTOCK', 'LOWSTOCK', 'INSTOCK']),
    rating: faker.number.int({ min: 1, max: 5 }),
  };
};

type Options = {
  page: number;
  perPage: number;
}

const generateResponse = <T>(generator: () => T, count: number, total: number, options: Options): HttpResponse => {
  if (options.page * options.perPage > total) {
    return HttpResponse.json({
      data: [],
      meta: {
        total,
      },
    });
  }
  const data = faker.helpers.multiple(generator, {
    count,
  });
  return HttpResponse.json({
    data,
    meta: {
      total,
    },
  });
};

const extractOptions = (url: URL): Options => {
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const perPage = parseInt(url.searchParams.get('perPage') || '10', 10);
  return { page, perPage };
};

export const handlers = [
  http.get('/api/v1/customer', ({ request }) => {
    const url = new URL(request.url);
    return generateResponse(generateRandomCustomer, 10, 200, extractOptions(url));
  }),
  http.get('/api/v1/product', ({ request }) => {
    const url = new URL(request.url);
    return generateResponse(generateRandomProduct, 10, 30, extractOptions(url));
  }),
  http.get('*', () => passthrough()),
];
