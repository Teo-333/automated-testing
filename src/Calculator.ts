export class Calculator {
    sum(...args: number[]): number {
      return args.reduce((acc, val) => acc + val, 0);
    }
  
    subduct(n1: number, n2: number): number {
      return n1 - n2;
    }
  
    multiply(...args: number[]): number {
      return args.reduce((acc, val) => acc * val, 1);
    }
  
    divide(n1: number, n2: number): number {
      if (n2 === 0) throw new Error('Cannot divide by zero');
      return n1 / n2;
    }
  
    async sumFromFile(filePath: string): Promise<number> {
      const fs = await import('fs/promises');
      const data = await fs.readFile(filePath, 'utf-8');
      const numbers = data
        .split(/\s+/)
        .map(Number)
        .filter(num => !isNaN(num));
      return this.sum(...numbers);
    }
  
    static async writeToFile(filePath: string, data: any): Promise<void> {
      const fs = await import('fs/promises');
      await fs.writeFile(filePath, 'result: ' + data);
    }
  }
  