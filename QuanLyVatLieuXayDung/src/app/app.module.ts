import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Admin/login/login.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { KhoComponent } from './Admin/kho/kho.component';
import { MatMenuModule } from '@angular/material/menu';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShopComponent } from './NguoiDung/GioHang/shop.component';
import { HomeComponent } from './NguoiDung/home/home.component';
import { MessNoiComponent } from './NguoiDung/home/mess-noi/mess-noi.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { GioHangDaBanComponent } from './NguoiDung/gio-hang-da-ban/gio-hang-da-ban.component';
import { KhachHangComponent } from './NguoiDung/khach-hang/khach-hang.component';
import { DatePipe } from '@angular/common';
import { DuyetDonHangComponent } from './Admin/duyet-don-hang/duyet-don-hang.component';
import { ThongKeComponent } from './Admin/thong-ke/thong-ke.component';
import { QuanLyTKComponent } from './Admin/quan-ly-tk/quan-ly-tk.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KhoComponent,

    ShopComponent,
    HomeComponent,
    MessNoiComponent,
    GioHangDaBanComponent,
    KhachHangComponent,
    DuyetDonHangComponent,
    ThongKeComponent,
    QuanLyTKComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSliderModule,
    MatInputModule, 
    MatBadgeModule, 
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatMenuModule ,
    MatSnackBarModule,
    MatDialogModule, // Thêm dòng này
    MatButtonToggleModule,
    
   

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
