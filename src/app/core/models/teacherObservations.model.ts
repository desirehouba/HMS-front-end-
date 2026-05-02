 

export class TeacherObservations {
  id: number;
  description: string;
  course : any;
  idStudent: any;
  classe: any;
  idAssessment: number;
  idTeacher: any;
  created_at: any;
  idSection: number;
  idSchool: number;
  
  constructor(teacherObservations: TeacherObservations) {
    {
      this.id = teacherObservations.id || this.getRandomID();
      this.description = teacherObservations.description ;
      this.classe = teacherObservations.classe ;
      this.course = teacherObservations.course;
      this.created_at = teacherObservations.created_at ;
      this.idStudent = teacherObservations.idStudent;
      this.idAssessment = teacherObservations.idAssessment;
      this.idTeacher = teacherObservations.idTeacher;
      this.idSchool = teacherObservations.idSchool ;
      this.idSection = teacherObservations.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
