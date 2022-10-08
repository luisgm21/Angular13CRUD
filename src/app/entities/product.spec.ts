import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product("hola","verdira","fresco",200,"ES un comentario", new Date(Date.now()))).toBeTruthy();
  });
});
