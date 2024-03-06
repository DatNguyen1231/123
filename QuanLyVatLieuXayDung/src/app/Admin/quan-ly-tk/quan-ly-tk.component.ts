import { Component } from '@angular/core';
import { DataServiceService } from 'src/app/data/dataService/data-service.service';
import { ServerHttpService } from 'src/app/data/server-http.service/server-http.service';

@Component({
  selector: 'app-quan-ly-tk',
  templateUrl: './quan-ly-tk.component.html',
  styleUrls: ['./quan-ly-tk.component.css']
})
export class QuanLyTKComponent {

  dataThongTin:any;
  dataTK:any;
  data:any;
  constructor (public sv:DataServiceService,private http: ServerHttpService) { }
 
  ngOnInit(): void {
  
    this.getUser()
    this.getThongTinTK()
    this.dataThongTin.push(this.dataTK) 

  }
 

  getUser(){
    this.http.getUser().subscribe((data) => {
      this.dataTK = data;   
      
    });
   
  }


  getThongTinTK(){
      this.http.getALLThongTinKhachHang().subscribe(
        (response) => {
          console.log('get gio hang:', response);
          this.dataThongTin= response;
  
         console.log(response)
          // Lấy danh sách ảnh từ server và gán vào biến dataGioHang để hiển thị trong template
        },
        (error) => {
          console.log('Get images error:', error);
        }
      );
  }

  xoaTK(index:number){
    //console.log(this.dataUser[index].TenDangNhap) 
     if(this.dataThongTin[index].TenDangNhap==="admin")
     alert("không thể xóa tài khoản admin");
     else{
       this.http.xoaUser(this.dataThongTin[index].LoginID).subscribe((data)=>{
         console.log("xóa thành công")
         this.getUser();
         this.getThongTinTK();
        }
       );
     }
    
   }
}
