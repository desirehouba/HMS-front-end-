import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AddProductsComponent } from './all-products/add-product/add-product.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AddOrderComponent } from './all-orders/add-order/add-order.component'; 
import { AllProductMovementsComponent } from './all-productMovements/all-productMovements.component';
import { AddProductMovementComponent } from './all-productMovements/add-productMovement/add-productMovement.component';

const routes: Routes = [ 
  {
    path: 'all-products',
    component: AllProductsComponent,
  },
  {
    path: 'all-products/add-product',
    component: AddProductsComponent,
  },
  {
    path: 'all-orders',
    component: AllOrdersComponent,
  },
  {
    path: 'all-orders/add-order',
    component: AddOrderComponent,
  }, 
  {
    path: 'all-productMovements',
    component: AllProductMovementsComponent,
  }, 
  {
    path: 'all-productMovements/add-productMovement',
    component: AddProductMovementComponent,
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarsRoutingModule {}
