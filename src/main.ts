import { Calculator } from './Calculator';

async function main() {
  const calculator = new Calculator();

  console.log('Sum:', calculator.sum(1, 2, 3));
  console.log('Subduct:', calculator.subduct(10, 5));
  console.log('Multiply:', calculator.multiply(2, 3, 4));
  console.log('Divide:', calculator.divide(20, 4));

  const sumFromFile = await calculator.sumFromFile('numbers.txt');
  console.log('Sum from file:', sumFromFile);

  await Calculator.writeToFile('output.txt', sumFromFile);
  console.log('Result written to output.txt');
}

main();
