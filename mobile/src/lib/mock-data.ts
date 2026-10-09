import { customerProducts } from '../../../lib/mock-data';

export { customerProducts };

export type CustomerProduct = (typeof customerProducts)[number];

export const shopCategories = ['All', 'Dairy', 'Staples', 'Bakery', 'Snacks'];

export const pastOrders = [
  { id: '#GB-2481', date: '12 May', items: 14, total: 742, status: 'Delivered' },
  { id: '#GB-2398', date: '8 May', items: 9, total: 486, status: 'Delivered' },
  { id: '#GB-2311', date: '2 May', items: 21, total: 1290, status: 'Delivered' },
];

export const profileRows = ['Saved addresses', 'Payment methods', 'Notifications', 'Order history', 'App settings'];
