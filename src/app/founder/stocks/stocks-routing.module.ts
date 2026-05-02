import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArticleComponent } from './all-articles/add-article/add-article.component';
import { AllArticlesComponent } from './all-articles/all-articles.component'; 
import { AllArticleMovementsComponent } from './all-articleMovements/all-articleMovements.component';
import { AddVouchersComponent } from './all-vouchers/add-voucher/add-voucher.component';
import { AllVouchersComponent } from './all-vouchers/all-vouchers.component';
import { AllSupplyDemandsComponent } from './all-supplyDemands/all-supplyDemands.component';
import { AddSupplyDemandComponent } from './all-supplyDemands/add-supplyDemand/add-supplyDemand.component';
import { AllProductMovementsComponent } from './all-productMovements/all-productMovements.component';
import { AddProductMovementComponent } from './all-productMovements/add-productMovement/add-productMovement.component';

const routes: Routes = [
  {
    path: 'all-articles',
    component: AllArticlesComponent,
  },
  {
    path: 'all-articles/add-article',
    component: AddArticleComponent,
  }, 
  {
    path: 'all-articleMovements',
    component: AllArticleMovementsComponent,
  },
  {
    path: 'all-productMovements',
    component: AllProductMovementsComponent,
  }, 
  {
    path: 'all-productMovements/add-productMovement',
    component: AddProductMovementComponent,
  }, 
  {
    path: 'all-vouchers',
    component: AllVouchersComponent,
  },
  {
    path: 'all-vouchers/add-voucher',
    component: AddVouchersComponent,
  },
  
  {
    path: 'all-supplyDemands',
    component: AllSupplyDemandsComponent,
  },
  {
    path: 'all-supplyDemands/add-supplyDemand',
    component: AddSupplyDemandComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocksRoutingModule {}
