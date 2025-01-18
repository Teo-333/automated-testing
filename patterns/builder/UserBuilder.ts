export class UserBuilder {
    private username: string = ''
    private password: string = ''
  
    withUsername(name: string): UserBuilder {
      this.username = name
      return this
    }
  
    withPassword(pass: string): UserBuilder {
      this.password = pass
      return this
    }
  
    build(): { username: string; password: string } {
      return {
        username: this.username,
        password: this.password
      }
    }
  }
  