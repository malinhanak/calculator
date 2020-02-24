import { add } from './add';

it('should add to numbers', () => {
  // Arrange
  const total = 0;
  const num = 5;

  // Act
  const result = add(total, num);

  // Assert
  expect(result).toBe(5);
});
