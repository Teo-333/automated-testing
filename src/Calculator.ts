import { readFile, writeFile } from 'fs/promises';

export class Calculator {
  sum(...args: number[]): number {
    return args.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  subduct(n1: number, n2: number): number {
    return n1 - n2;
  }

  multiply(...args: number[]): number {
    return args.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
  }

  divide(n1: number, n2: number): number {
    if (n2 === 0) throw new Error('Cannot divide by zero');
    return n1 / n2;
  }

  async sumFromFile(filePath: string): Promise<number> {
    const data = await readFile(filePath, 'utf-8');
    const numbers = data
      .split(/\s+/)
      .map(Number)
      .filter(num => !isNaN(num));
    return this.sum(...numbers);
  }

  static async writeToFile(filePath: string, data: any): Promise<void> {
    const content = 'result: ' + data;
    await writeFile(filePath, content);
  }
}
