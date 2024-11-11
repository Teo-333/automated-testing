import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Calculator } from '../../src/Calculator';

describe('Calculator Class', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should add numbers correctly using sum()', () => {
    expect(calculator.sum(1, 2, 3)).toBe(6);
    expect(calculator.sum(-1, -2, -3)).toBe(-6);
    expect(calculator.sum()).toBe(0);
  });

  it('should subtract numbers correctly using subduct()', () => {
    expect(calculator.subduct(5, 3)).toBe(2);
    expect(calculator.subduct(3, 5)).toBe(-2);
  });

  it('should multiply numbers correctly using multiply()', () => {
    expect(calculator.multiply(2, 3, 4)).toBe(24);
    expect(calculator.multiply(-2, 3)).toBe(-6);
    expect(calculator.multiply()).toBe(1);
  });

  it('should divide numbers correctly using divide()', () => {
    expect(calculator.divide(10, 2)).toBe(5);
    expect(calculator.divide(-10, 2)).toBe(-5);
  });

  it('should throw an error when dividing by zero in divide()', () => {
    expect(() => calculator.divide(10, 0)).toThrow('Cannot divide by zero');
  });

  it('should sum numbers from a file using sumFromFile()', async () => {
    const fs = await import('fs/promises');
    const readFileMock = vi.spyOn(fs, 'readFile').mockResolvedValue('1 2 3 4 5');

    const result = await calculator.sumFromFile('numbers.txt');
    expect(result).toBe(15);

    readFileMock.mockRestore();
  });

  it('should write result to a file using writeToFile()', async () => {
    const fs = await import('fs/promises');
    const writeFileMock = vi.spyOn(fs, 'writeFile').mockResolvedValue();

    await Calculator.writeToFile('result.txt', 42);

    expect(writeFileMock).toHaveBeenCalledWith('result.txt', 'result: 42');

    writeFileMock.mockRestore();
  });
});
