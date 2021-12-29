import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const columnOne = screen.getByText(/Mileage/i);
  const columnTwo = screen.getByText(/Condition/i);
  const columnThree = screen.getByText(/User Name/i);
  console.log(columnOne)
  expect(columnOne).toBeInTheDocument();
  expect(columnTwo).toBeInTheDocument();
  expect(columnThree).toBeInTheDocument();
});
