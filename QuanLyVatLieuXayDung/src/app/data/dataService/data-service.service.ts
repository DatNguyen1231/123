import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class DataServiceService {
  //true mới dùng đc rowter
  isLoggedIn: boolean = false;

  //lấy tên đằng nhập và id từ api gán vào đây sau khi bấm login
  IDnameLogin:number=-1;
  nameLogin:string='';
  passWordLogin:string='';
  constructor() { }
  //datahome
  public datahome = {
    TaiKhoanId:0,
    SanPhamID: 0,
    SoLuong: 0,
    ThanhTien:0
    
    
  };
  //data Giỏ hàng
 public dataGioHang:any;
 check:boolean=false;
 isAllSelected:boolean[]=[false];
 soLuongDuyet=0;
 //data kho 
 IDKho:number=-1;
 public dataKho:any;

 //khởi tạo lại tất cả khi log out
 reset(): void {
  this.isLoggedIn = false;
  this.IDnameLogin = -1;
  this.passWordLogin='';
  this.nameLogin = '';
  this.datahome = {
    TaiKhoanId: 0,
    SanPhamID: 0,
    SoLuong: 0,
    ThanhTien: 0
  };
  this.dataGioHang = null;
  this.check = false;
  this.isAllSelected = [false];
  this.IDKho = -1;
  this.dataKho = null;
  
}
 
}
