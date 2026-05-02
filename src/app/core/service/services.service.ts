import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class ServicesService {
  route = {
    hotels: ['hotels', 'hotels/all','hotels/trash'],
    departements: ['services', 'services/all','services/trash'],
    typeRooms: ['room-types', 'room-types/all','room-types/trash'],
    categoriesRooms: ['room-categories', 'room-categories/all','room-categories/trash'],
    roomServices: ['room-services', 'room-services/all','room-services/trash'],
    rooms: ['rooms', 'rooms/all','rooms/trash'],
    bookings: ['bookings', 'bookings/all','bookings/trash'],
    products: ['products', 'products/all','products/trash'],
    vouchers: ['purchase-vouchers', 'purchase-vouchers/all','purchase-vouchers/trash'],
    articles: ['articles', 'articles/all','articles/trash'],
    orders: ['orders', 'orders/all','orders/trash'],
    disbursements: ['disbursements', 'disbursements/all','disbursements/trash'],
    supplyDemands: ['supply-demands', 'supply-demands/all','supply-demands/trash'],
    articleMovements : ['article-movements', 'article-movements/all','article-movements/trash'],
    productMovements : ['product-movements', 'product-movements/all','product-movements/trash'],
    roles: ['roles', 'roles/all','roles/trash'],
    users: ['users', 'users/all','users/trash'],
    tasks: ['tasks', 'tasks/all','tasks/trash'],
    events: ['events', 'events/all','events/trash'],
    feedbacks: ['feedbacks', 'feedbacks/all','feedbacks/trash'],
    cashIns: ['cash-ins', 'cash-ins/all','cash-ins/trash'],
    expenseTypes: ['expense-types', 'expense-types/all','expense-types/trash'],
    statistics: ['statistic-overview', 'statistic-finance', 'statistic-booking'], 
    paymentsMomo: ['makewebpayment', 'mtn-payments'],
    payments: ['makewebpayment', 'makemobpayment'],
 



    
    packages: ['packages', 'packages/all'],
    optionlevels: ['optionlevels', 'optionlevelsall'],
    streams: ['streams', 'streamsall'],
    classrooms: ['classes', 'classesall'], 
    filieres: ['filieres', 'filieresall'],
    matters: ['matters', 'mattersall'],
    assessments: ['assessments', 'assessmentsall','assessmentsduplicate','assessmenttypes-bulk'],
    ratings: ['ratings', 'ratingsall','ratings/bulk-delete'],
    coefficients: ['coefficients', 'coefficientsall'],
    mattergroups: ['mattergroups', 'mattergroupsall'],
    typeevaluations: ['typeevaluations', 'typeevaluationsall'],
    trimestres: ['trimestres', 'trimestresall'],
    sequences: ['assessmenttypes', 'assessmenttypesall'],
    assessmenttypes: ['assessmenttypes', 'assessmenttypesall',],
    pensions: ['pensions', 'pensionsall'],
    tranches: ['tranches', 'tranchesall'],
    bourses: ['bourses', 'boursesall'],
    bonuses: ['bonuses', 'bonusesall', 'bonuses/trash', 'bonuses/restore', 'bonuses/delete'],
    typeinvoices: ['typeinvoices', 'typeinvoicesall'],
    customers: ['customers', 'customersall'],
    invoices: ['invoices', 'invoicesall'],
    typerequetes: ['typerequetes', 'typerequetesall'],
    fees: ['fees', 'feesall'],
    schoolsupplies: ['schoolsupplies', 'schoolsuppliesall'],
    questionnaires : ['questionnaires', 'questionnairesall'],
    projets: ['projects', 'projectsall'],
    presenceteachers: ['presenceteachers', 'presenceteachersall'],
    absences: ['absences', 'absencesall'],
    progressions: ['progressions', 'progressionsall'],
    modules: ['modules', 'modulesall'],
    requests: ['requetes', 'requetesall'],
    responses: ['responses', 'responsesall'],
    chapters: ['chapters', 'chaptersall'],
    lessons: ['lessons', 'lessonsall'],
    topics: ['topics', 'topicsall'],
    transferts: ['transferts', 'transfertsall'],
    sanctions: ['sanctions', 'sanctionsall'],
    schools: ['schools', 'schoolsall'],
    permissions: ['permissions', 'permissions/all'],
    sections: ['sections', 'sectionsall'],
    courses: ['courses', 'coursesall', 'courses-bulk', 'coursesduplicate'],
    homeworks: ['homeworks', 'homeworksall'],
    homeworksdones: ['homeworkdones', 'homeworkdonesall'],
    pensionUsers: ['pensionUsers', 'pensionUsersall', 'pensionusersstorepdf'],
    feeusers: ['feeusers', 'feeusersall', 'feeusersstorepdf'],
    userspassword: ['userspassword'], 
    getstatus: ['getstatuspayment', 'getstatuspaymentmob'],
    getrecu: ['pensionuserspdf', 'feeuserspdf'],
    statsOM: ['omstat'],
    retraitsOM: ['withdrawals'],
    pensionUsersinsolvable: ['pensionUsersinsolvable', 'pensionUsersSolvable'],
    feeUsersinsolvable: ['feeusers-insolvables' , 'feeusers-solvables'],
    withdrawalsconfirm: ['withdrawalsconfirm'],
    generateQR: ['generate-qr-code'],
    teacherobservations: ['teacherobservations', 'teacherobservationsall'],
    notifications: ['notifications'],
    statistiques: ['financedetail', 'statsinvoices', 'statsinvoicespartype', 'statspermonth'],
    listsPDF: [
      'documents/list-students', 'documents/list-parents',
      'documents/list-pensions-users', 'documents/list-fees-users',
      'users/generer-certificat-scolarite', 'users/carte-scolaire',
      'documents/list-teachers', 'documents/list-users-assessments',
      'documents/list-users-assessments-by-matter',
      'documents/list-users-assessments-by-matter-group',
      'documents/pv-primaire-trimestre-sequentiel', 'documents/pv-secondaire',
      'documents/pv-primaire-trimestre','documents/pv-secondaire-trimestre',
    ],
    pensionUsersArchive: ['/pensionUsers/archive-restore', 'pensionUsersallarchives'],
    feeUsersArchive: ['/feeusers/archive-restore', 'feeusersallarchives'],
    bulletinMaternelle: ['generer-bulletin-maternelle-sequence', 'generer-bulletin-maternelle-trimestre'],
    bulletinpPrimaireFinale : ['generer-bulletin-maternelle-primaire'],
    bulletinpPrimaire: ['generer-bulletin-primaire-sequence', 'generer-bulletin-primaire-trimestre', 'generer-bulletin-primaire-trimestre-new'],
    bulletinSecondaire: ['generer-bulletin-secondaire-sequence', 'generer-bulletin-secondaire-trimestre'],
    bulletinSecondaire2: ['generer-bulletin-secondaire'],
    pv: ['documents/pv-primaire-trimestre-sequentiel'],
    statMoyenne: ['afficher-notes-maternelle-primaire'],
    exams: ['exams', 'responses', 'mark-exam-online/get-student-responses', 'mark-exam-online/set-student-notes'],
    sms: ['sms', 'sms/all','sms/balance'],
    notefrais: ['note-frais', 'note-fraisall', 'note-frais/download', 'note-frais/trash', 'note-frais/restore'],
    permissions_users: ['permissions-users', 'permissions-usersall', 'permissions-users/trash', 'permissions-users/restore', 'permissions-users/delete'],
    holidays: ['holidays', 'holidayssall', 'holidays/trash', 'holidays/restore', 'holidays/delete'],
    contracts: ['contracts', 'contractsall', 'contracts/trash', 'contracts/restore', 'contracts/delete'],
    salaries_deductions: ['salaries-deductions', 'salaries-deductionsall', 'salaries-deductions/trash', 'salaries-deductions/restore', 'salaries-deductions/delete'],
    salary_advances: ['salary-advances', 'salary-advancesall', 'salary-advances/trash', 'salary-advances/restore', 'salary-advances/delete'],
    reponse_student: ['documents/list-student-answers-on-assessment'],
    warnings: ['warnings', 'warningsall', 'warnings/trash', 'warnings/restore', 'warnings/delete'],
    summaries: ['lessons-summaries', 'lessons-summariesall', 'lessons-summaries/trash', 'lessons-summaries/restore', 'lessons-summaries/delete'],
    summariesPDF: ['lessons-summaries/download'],
    clients: ['clients', 'clientsall', 'clients/trash', 'clients/restore'],
  }

  

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private authService : AuthService
  ) {}
  /** CRUD METHODS */
  
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  paylaodbasic = {
    idSchool : this.authService.currentUserValue.idSchool,
    idSection : this.authService.currentUserValue.idSection,
  }

  ShowNotificationSuccess() {
    this.showNotification(
      'snackbar-success',
      'Registration successfully..!!',
      'bottom',
      'center'
    );
  }

  ShowNotificationEchec(data: any) {
    this.showNotification(
      'snackbar-danger',
       data, 'bottom','center'
    );
  }

  showNotificationConnexion() {
    this.showNotification(
      "snackbar-danger",
      "Mauvaise connexion / Bad connexion | Acutalise !!!\n Actualisé si ca continue ",
      "top",
      "center"
    );
  }

  showCustomPosition() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registration successfully..!!',
      showConfirmButton: false,
      timer: 500,
    });
  }

  showCustomPositions(data : String) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: data,
      showConfirmButton: false,
      timer: 500,
    });
  }

  showCustomPositionEchec(data : String) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: data,
      showConfirmButton: false,
      timer: 7000,
    });
  }


  getSms(route : string) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/${route}`
    );
  }

  addObjets(route : string, data: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/${route}`, data);
  }
  

  getObjetss(route : string, paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/${route}`, paylaod);
  }

  getObj(route : string ,id: number) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/${route}/${id}`
    );
  }

  updateObjets(route : string ,id: number, paylaod: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/${route}/${id}`,
      paylaod
    );
  }

  updateObjetsMulti(route : string, data: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/${route}`, data);
  }

  deleteObjets(route : string ,id: any) {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/${route}/${id}`);
  }

  deleteObjetsMulti(route : string ,data: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/${route}`, data);
  }

  getStatus(route : string ,id: number) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/${route}/${id}`
    );
  }

  getrecu(route : string ,id: number) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/${route}/${id}`
    );
  }

  deleteAll(route : string , paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/${route}`, paylaod);
  }

  findObjets(route : string, id: number) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/${route}/${id}`);
  }

  archiverObjets(route : string, data: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/${route}`, data);
  }


  getCoursess(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/coursesall`, paylaod);
  }

  getCycles(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/cyclesall`, paylaod);
  }


  getStudentss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/users`, paylaod);
  }

  getBulletinss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/bulletin`, paylaod);
  }

  getBulletinsMaternelles(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/bulletinmaternelle`, paylaod);
  }
  getBulletinsSecondaireAnglo(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/bulletinsecondaire`, paylaod);
  }

  getBulletinsSecondaireFranco(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/bulletinsecondairefrancophone`, paylaod); 
  }

  getBulletinsSecondaireG(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/generer-bulletin-secondaire-sequence`, paylaod);
  }

  getBulletinsPrimaaire(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/generer-bulletin-primaire-sequence`, paylaod); 
  }

  getBulletinsMaternelle(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/generer-bulletin-maternelle-sequence`, paylaod); 
  }

  getBulletinsSecondaireFranco2(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/bulletinsecondairefrancophone2`, paylaod); 
  }


  getFinancess(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/financedetail`, paylaod);
  }

  getTrimestress(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/trimestresall`, paylaod);
  }

  getStatistique(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/statistic-overview`, paylaod);
  }

  getStatistiqueParent(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/dashboardparent`, paylaod);
  }

  getStatistiqueTeacher(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/dashboardteacher`, paylaod);
  }

  addUser(data: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/register`, data);
  }

  presenceTeachers(data: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/presenceteachers`, data);
  }

  addphoto(data: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/upload-photo`, data);
  }

  getOptionanys(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/optionlevelsall`, paylaod);
  }

  getMatterss(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/mattersall`, paylaod);
  }

  getTranchess(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/tranchesall`, paylaod);
  }
  
  getInsolventss(transactions: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/pensionUsersinsolvable`, transactions);
  }

  getUserss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/users`, paylaod);
  }
  getanys(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/pensionsall`, paylaod);
  }

  getBalancePension(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/balancePension`, paylaod);
  }

  getBalancePension2(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/balancePensionWithBourse`, paylaod);
  }

  getRoless(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/roles/all`, paylaod);
  }

  getFeess(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/feesall`, paylaod);
  }

  AddFeeUserss(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/feeusers`, paylaod);
  }

  balanceFeeUserss(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/balancefee`, paylaod);
  }

  getCoefficientss(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/coefficientsall`, paylaod);
  }

  getAssessmentss(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/assessmentsall`, paylaod);
  }

  getRestaurantss(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/assessmenttypesall`, paylaod);
  }

  addAbsence(data: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/absences`, data);
  }

  getAllSchoolss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/schoolsall`, paylaod);
  }

  getCategoryEvaluationss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/categoryevaluationsall`, paylaod);
  }
  getSequencess(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/sequencesall`, paylaod);
  }
  getMattersAssessmentss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/matterevaluationsall`, paylaod);
  }

  getTypeEvaluationss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/typeevaluationsall`, paylaod);
  }

  getEvaluationss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/evaluationsall`, paylaod);
  }


  getAllSectionss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/sectionsall`, paylaod);
  }

  findUser(id: Number) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/users/${id}`);
  }

  getTeacherss(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/users`, paylaod);
  }

  
  getProgressionss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/progressionsall`, paylaod);
  }

  getPartss(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/modulesall`, paylaod);
  }

  getChapterss(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/chaptersall`, paylaod);
  }

  getLessonss(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/lessonsall`, paylaod);
  }

  getSections(paylaod : any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/topicsall`, paylaod);
  }


  findlicence(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrlKey}/find-licence`, paylaod);
  }

  addProgressions(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/progressions`, paylaod);
  }

  findProgressions(id: Number) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/progressions/${id}`);
  }

  findChapters(id: Number) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/chapters/${id}`);
  }

  addParts(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/modules`, paylaod);
  }

  addChapters(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/chapters`, paylaod);
  }

  addLessons(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/lessons`, paylaod);
  }

  addSections(paylaod: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/topics`, paylaod);
  }

  archive(id: number, paylaod: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/usersar/${id}`, paylaod);
  }

  updateProgressions(id: number, paylaod: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/progressions/${id}`, paylaod);
  }

  updateParts(id: number, paylaod: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/modules/${id}`, paylaod);
  }

  updateChapters(id: number, paylaod: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/chapters/${id}`, paylaod);
  }

  updateLessons(id: number, paylaod: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/lessons/${id}`, paylaod);
  }

  updateSections(id: number, paylaod: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/topics/${id}`, paylaod);
  }

  updateAssessments(id: number, paylaod: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/assessments/${id}`, paylaod);
  }

  updateUsers(id: number, paylaod: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/users/${id}`, paylaod);
  }

  updateany(id: number, paylaod: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/classes/${id}`, paylaod);
  }

  updateCycles(id: number, paylaod: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/cycles/${id}`, paylaod);
  }

  deleteProgressions(id: number) {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/progressions/${id}`);
  }

  deleteParts(id: number) {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/modules/${id}`);
  }

  deleteChapters(id: number) {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/chapters/${id}`);
  }

  deleteLessons(id: number) {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/lessons/${id}`);
  }

  deleteSections(id: number) {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/topics/${id}`);
  }
}
