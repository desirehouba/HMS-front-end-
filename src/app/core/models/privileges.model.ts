
export class Privileges {
  id: number;
  name: string;
  description: string;
  ressource: string;
  constructor(privileges: Privileges) {
    {
      this.id = privileges.id || this.getRandomID();
      this.name = privileges.name || '';
      this.description = privileges.description || '';
      this.ressource = privileges.ressource || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
