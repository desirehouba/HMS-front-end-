
export class Roles {
  id: number;
  name: string;
  permissions: any;
  permission_ids: any;
  description: number;
  type : string;
  idSchool : string;
  idSection: string;
  constructor(roles: Roles) {
    {
      this.id = roles.id || this.getRandomID();
      this.permissions = roles.permissions;
      this.idSection = roles.idSection || '';
      this.description = roles.description ;
      this.name = roles.name || '';
      this.type = roles.type || '';
      this.idSchool = roles.idSchool ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
