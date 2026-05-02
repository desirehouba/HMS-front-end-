

export class Retraits {
  id: number;
  idUser: number;
  status: string;
  mode_retrait : string;
  rib: string;
  montant_retrait_brut: number;
  montant_retrait_net: number;
  numero_retrait : number;
  frais_bancaire : number;
  idSection: number;
  school: any;
  date : string;
  constructor(retraits: Retraits) {
    {
      this.id = retraits.id || this.getRandomID();
      this.idUser = retraits.idUser ;
      this.status = retraits.status || '';
      this.mode_retrait = retraits.mode_retrait || '';
      this.montant_retrait_net = retraits.montant_retrait_net ;
      this.frais_bancaire = retraits.frais_bancaire;
      this.numero_retrait = retraits.numero_retrait ;
      this.montant_retrait_brut = retraits.montant_retrait_brut;
      this.rib = retraits.rib || '';
      this.school = retraits.school;
      this.idSection = retraits.idSection ;
      this.date = retraits.date || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
