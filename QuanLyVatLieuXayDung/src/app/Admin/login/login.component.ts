import { Component, OnInit } from '@angular/core';
import{AppComponent} from 'src/app/app.component'
import { ServerHttpService } from 'src/app/data/server-http.service/server-http.service'
import { Router } from '@angular/router';
import { DataServiceService } from '../../data/dataService/data-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:string='';
  passWord:string='';
  confirmpassWord:string='';
  idLogin=0;

  Mess:string='';

  dataUser:any;
  isDataLoaded: boolean = false;

  loai=false;

  data1 = {
    
    tenDangNhap:'',
    matKhau:'',
    LoaiTaiKhoan:''
    
   };

ngOnInit() {
  this.getUser();
}
  constructor(
    private sv:DataServiceService,
    private http:ServerHttpService,
    private app:AppComponent,
    private router: Router )
  { 
    
  }
  
  getUser(){
    this.http.getUser().subscribe((data) => {
      this.dataUser = data;
      console.log(this.dataUser)

      
      this.isDataLoaded = true;
    });
   
  }

  loGin(){
    this.router.navigate(['/home'])
    this.sv.isLoggedIn=true;
    this.app.Login = true;
    this.app.loaiTK="user"
  }
//  loGin() {
//   if (this.isDataLoaded) {
//     this.Mess='Chưa load dữ liệu từ server';
//     console.log("Chưa load dữ liệu từ server");
//     return;
//   }
  
//   if (this.dataUser) {
//     this.Mess="Không có dữ liệu;để đăng nhập";
//     console.log("Không có dữ liệu để đăng nhập");
//     return;
//   }
//   const foundUser = this.dataUser.find((user: any) =>   user.TenDangNhap.trim() === this.userName && user.MatKhau.trim() === this.passWord) ;
//   if (foundUser) {
//     this.sv.isLoggedIn=true;//cho phép truy cập các routor

//     //up lên service
//     this.sv.IDnameLogin=foundUser.ID;
//     this.sv.nameLogin=foundUser.TenDangNhap;
//     this.sv.passWordLogin=foundUser.MatKhau;
//     this.app.Login = true;
//     this.app.loaiTK=foundUser.LoaiTaiKhoan;
//     if(foundUser.LoaiTaiKhoan==="user")this.router.navigate(['/home']);
    
//     if(foundUser.LoaiTaiKhoan==="admin")this.router.navigate(['/DuyetDon']);
    
//     //lấy thông tin người dùng 
   
//   } else {
//     this.Mess="Tên đăng nhập hoặc mật khẩu không đúng";
//     console.log("Tên đăng nhập hoặc mật khẩu không đúng");
//   }
// }

  sai(){
    this.Mess='';
  }


  

 
  Dangki(){
   this.loai=!this.loai
     
  }

  //thêm tài khoản 
  themTK(data:any){
    this.http.addUser(data).subscribe(
      (response) => {
        this.getUser()
        console.log(this.dataUser)
        
      //  console.log('Upload success:');
        alert('Tạo tài khoản thành công');
        this.clean();
      },
      (error) => {
       // console.log('Upload success:');
        
      }
    );

  
  }
  //thêm vào bảng thong tin khách hàng

  xoaTK(index:number){
   //console.log(this.dataUser[index].TenDangNhap) 
    if(this.dataUser[index].TenDangNhap==="admin")
    alert("không thể xóa tài khoản admin");
    else{
      this.http.xoaUser(this.dataUser[index].ID).subscribe((data)=>{
        console.log("xóa thành công")
        this.getUser();
       }
      );
    }
   
  }
  themtk(){
     const foundUser = this.dataUser.find((user: any) =>   user.TenDangNhap.trim() === this.userName) ;
     if(foundUser){
      this.Mess="Tài Khoản đã tồn tại ";
     
     }
    else if(this.passWord!==this. confirmpassWord){
        this.Mess='Mật khẩu nhập lại không khớp';
     }
     else {
      this.loai=false;
      this. data1 = {
        tenDangNhap:this.userName,
        matKhau:this.passWord,
        LoaiTaiKhoan:'user',
      };  
      //thỏa điều kiện thêm tài khoản

      this.themTK(this.data1);
     }
    
  }
  clean(){
      this.userName='';
      this.passWord='';
      this.confirmpassWord='';
  }
}
