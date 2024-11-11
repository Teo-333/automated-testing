import { Calculator } from './Calculator';

//for manual testing or displaying
async function main() {
  const calculator = new Calculator();

  console.log('Sum:', calculator.sum(1, 2, 3));

  console.log('Subduct:', calculator.subduct(10, 5));

  console.log('Multiply:', calculator.multiply(2, 3, 4));

  console.log('Divide:', calculator.divide(20, 4));

  try {
    const sumFromFile = await calculator.sumFromFile('numbers.txt');
    console.log('Sum from file:', sumFromFile);
  } catch (error) {
    console.error('Error reading from file:', error);
  }

  try {
    await Calculator.writeToFile('output.txt', 42);
    console.log('Result written to output.txt');
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

main();
