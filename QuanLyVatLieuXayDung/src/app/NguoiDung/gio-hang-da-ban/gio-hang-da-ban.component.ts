import { Component } from '@angular/core';
import { DataServiceService } from '../../data/dataService/data-service.service';
import { ServerHttpService } from '../../data/server-http.service/server-http.service';

@Component({
  selector: 'app-gio-hang-da-ban',
  templateUrl: './gio-hang-da-ban.component.html',
  styleUrls: ['./gio-hang-da-ban.component.css']
})
export class GioHangDaBanComponent {

  nameLogin=this.sv.nameLogin;
  
  
    dataGioHangDaMua: any;
  dataGioHang={SoLuong:0,ThanhTien:0}
  idDelete: number=-1;
 

  constructor(public sv:DataServiceService,private serverHttpService: ServerHttpService) { }
 
  ngOnInit(): void {
  this. getGioHangDaMua();
   
  }




  //tính tổng số tiền đc check

  //lấy data giỏ hàng từ api
  getGioHangDaMua() {
    this.serverHttpService.getGioHangDaMua(this.sv.IDnameLogin).subscribe(
      (response) => {
        console.log('get gio hang:', response);
        this.dataGioHangDaMua= response;

       console.log(response)
        // Lấy danh sách ảnh từ server và gán vào biến   dataGioHangDaMuaDaMuaDaMua để hiển thị trong template
      },
      (error) => {
        console.log('Get images error:', error);
      }
    );
  }
  //nút thêm hoặc giảm

 
 //xóa giỏ hàng
  xoaGioHang(index: number) {
    this.serverHttpService.xoaGioHang(index).subscribe((data) => {
      console.log(data);
     //Sau khi xóa thành công, gọi lại hàm để cập nhật danh sách ảnh từ server
     this.getGioHangDaMua();
    });
  
  }
 
 
  timHang:string='';
  timGioHangDaMua() {
    this.serverHttpService.getGioHangDaMua(this.sv.IDnameLogin).subscribe(
      (result) => {
        this.dataGioHangDaMua = result.filter((item:any) => item.TenHang.includes( this.timHang));
      
      },
      (error) => {
        console.log(error);
      }
    );
  }
  timGioHangDaMua1(trangThai:number) {
    this.serverHttpService.getGioHangDaMua(this.sv.IDnameLogin).subscribe(
      (result) => {
        this.dataGioHangDaMua = result.filter((item:any) => item.TrangThaiMua===trangThai);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  huyTim(){
    this. getGioHangDaMua();
  }
  
}
