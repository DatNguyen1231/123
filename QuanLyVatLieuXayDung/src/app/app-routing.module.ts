import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Admin/login/login.component';
import { KhoComponent } from './Admin/kho/kho.component';

import { ShopComponent } from './NguoiDung/GioHang/shop.component';
import { HomeComponent } from './NguoiDung/home/home.component';
import {AuthGuard } from './auth.guard';
import { GioHangDaBanComponent } from './NguoiDung/gio-hang-da-ban/gio-hang-da-ban.component';
import { KhachHangComponent } from './NguoiDung/khach-hang/khach-hang.component';
import { DuyetDonHangComponent } from './Admin/duyet-don-hang/duyet-don-hang.component';
import { ThongKeComponent } from './Admin/thong-ke/thong-ke.component';
import { QuanLyTKComponent } from './Admin/quan-ly-tk/quan-ly-tk.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  
  { path: 'kho', component: KhoComponent,canActivate: [AuthGuard]},
  { path: 'GioHangDaBan', component: GioHangDaBanComponent,canActivate: [AuthGuard]},
  { path: 'KhachHang', component: KhachHangComponent,canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'Shop', component:ShopComponent,canActivate: [AuthGuard]},
  { path: 'DuyetDon', component:DuyetDonHangComponent,canActivate: [AuthGuard]},
  { path: 'ThongKe', component:ThongKeComponent,canActivate: [AuthGuard]},
  { path: 'QuanLyTK', component:QuanLyTKComponent,canActivate: [AuthGuard]},
  { path: '**', component: KhoComponent,canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard], // Thêm AuthGuard vào providers
  exports: [RouterModule]
})

export class AppRoutingModule { }
