import { createItems } from './helper';

test('Create data', () => {
  const data = createItems(5);
  
  expect(data.length).toBeLessThanOrEqual(5);
});
