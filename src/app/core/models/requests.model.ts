
export class Requests {
  id: number;
  reponse: string;
  typeRequete: any;
  statut: string;
  user: any;
  parent: any;
  description: string;
  idSection: number;
  idSchool: number;
  
  constructor(requests: Requests) {
    {
      this.id = requests.id || this.getRandomID();
      this.user = requests.user;
      this.typeRequete = requests.typeRequete;
      this.reponse = requests.reponse;
      this.statut = requests.statut;
      this.description = requests.description || '' ;
      this.idSchool = requests.idSchool ;
      this.idSection = requests.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
