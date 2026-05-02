
export class Tasks {
  id: number;
  name: string;
  description : string;
  due_date: string;
  status: string;
  priority: string;
  users: any;
  responsible: any;
  duree_mise: any;
  estimation: any;
  time_spent:any
  idProject: any;
  observation: any;
  idSection: number;
  idSchool: number;
  
  constructor(tasks: Tasks) {
    {
      this.id = tasks.id || this.getRandomID();
      this.name = tasks.name ;
      this.description = tasks.description ;
      this.priority = tasks.priority ;
      this.due_date = tasks.due_date || '';
      this.status = tasks.status || '';
      this.users = tasks.users;
      this.idSchool = tasks.idSchool ;
      this.idSection = tasks.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
