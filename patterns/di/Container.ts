export class Container {
    private dependencies: Map<string, any> = new Map()
  
    register(key: string, value: any): void {
      this.dependencies.set(key, value)
    }
  
    resolve<T>(key: string): T {
      if (!this.dependencies.has(key)) {
        throw new Error('Dependency not found: ' + key)
      }
      return this.dependencies.get(key) as T
    }
  }
  