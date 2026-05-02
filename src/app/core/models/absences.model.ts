import { Courses } from "./courses.model";
import { Students } from "./students.model";
import { Teachers } from "./teachers.model";

export class Absences {
  id: number;
  type: string;
  course : Courses;
  student: Students;
  date: string;
  is_justified: boolean;
  teacher: Teachers;
  idSection: number;
  idSchool: number;
  
  constructor(absences: Absences) {
    {
      this.id = absences.id || this.getRandomID();
      this.type = absences.type ;
      this.date = absences.date ;
      this.course = absences.course;
      this.is_justified = absences.is_justified ;
      this.student = absences.student || '';
      this.teacher = absences.teacher || '';
      this.idSchool = absences.idSchool ;
      this.idSection = absences.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
