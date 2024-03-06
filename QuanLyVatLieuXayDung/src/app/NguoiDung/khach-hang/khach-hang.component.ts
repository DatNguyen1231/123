import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data/dataService/data-service.service';
import { ServerHttpService } from 'src/app/data/server-http.service/server-http.service';


interface Customer {
  ThayDoi:boolean;
  loginID: string;
  ten: string;
  gmail: string;
  sdt: string;
  gioiTinh: string;
  ngaySinh: string;
  matKhau: string;
}
@Component({
  selector: 'app-khach-hang',
  templateUrl: './khach-hang.component.html',
  styleUrls: ['./khach-hang.component.css']
})
export class KhachHangComponent implements OnInit{
  _thayDoi:boolean=true;
  pass:string='hihihihih';
  tyPe=false;
  _getThongTinKhachHang:any;


 
  data={
    LoginID:this.sv.IDnameLogin,
    Ten: "",
    Email: "",
    SDT: "",
    GioiTinh: "Nam",
    NgaySinh: "",
    DiaChi:"",
    MatKhau: this.sv.passWordLogin,
    TenDangNhap: this.sv.nameLogin
  }
  data1:any;
  
  
  constructor(private sv:DataServiceService, private http: ServerHttpService) { }

  ngOnInit() {
   
    this.getThongTin();
    
    
   
  }
 
  GanThongTin(){
    if (this.data1 && this.data1.length > 0) {
      
      this.data = {...this.data1[0]};
    }
  
  }
  thayDoiThongTin(){
    if (this.data1 && this.data1.length > 0) {
      
      this.suaThongTin();
     // console.log("thành công")
    }
    else{
      this.themThongTin()
    }
  }
  suaMk(){
  
    console.log(this.data.MatKhau)
    this.http.suaUser(this.sv.IDnameLogin,this.data.MatKhau).subscribe(
      (response) => {
       
        console.log(response);
      
      },
      (error) => {
        console.log('Get images error:', error);
      }
    );
  }
  suaThongTin(){
    this.http.suaThongTinKhachHang(this.data,this.sv.IDnameLogin).subscribe(
      (response) => {
       
        console.log(response);
      
      },
      (error) => {
        console.log('Get images error:', error);
      }
    );
  }
  getThongTin() {
   
   

    this.http.getThongTinKhachHang(this.sv.IDnameLogin).subscribe(

      (response) => {
       
        this.data1=response
        this.GanThongTin();
        console.log(response);
       // this.data={ ...response}
      
        //console.log("thông tin khách hàng",this.data);
        // Lấy danh sách ảnh từ server và gán vào biến dataFromSV để hiển thị trong template
      },
      (error) => {
        console.log('Get images error:', error);
      }
    );
  }
  
  themThongTin(){
    
  
    this.http.themThongTinKhachHang1(this.data).subscribe(
      (response) => {
          console.log("thêm thông tin thành công")
      },
      (error) => {
        console.log('Upload success:');
        
      }
    );
  }
  
  
  hien(){
    this.tyPe=!this.tyPe;
  
  }
  thayDoi(){
   this._thayDoi=false;
   
  }
  luuThayDoi(){
    this._thayDoi=true;
    this.thayDoiThongTin();
    this.suaMk();
  
  }
  
}
