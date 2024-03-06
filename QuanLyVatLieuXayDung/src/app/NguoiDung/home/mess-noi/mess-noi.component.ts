import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServerHttpService } from 'src/app/data/server-http.service/server-http.service';
import { DataServiceService } from 'src/app/data/dataService/data-service.service';
@Component({
  selector: 'app-mess-noi',
  templateUrl: './mess-noi.component.html',
  styleUrls: ['./mess-noi.component.css']
})
export class MessNoiComponent  {

  isDisabled=true;
  soLuong:number=1;
  thanhTien=0;
  dataGioHang:any;


  constructor(
    private serverHttpService:ServerHttpService,
    private sv:DataServiceService,
    public dialogRef: MatDialogRef<MessNoiComponent>,
    
  ) { }

  ngOnInit() {
   
    this.getGioHang()
  }

  getGioHang() {
    let trangThai=1;//trang thai mua hang =1 là đang ở trong giỏ
    this.serverHttpService.getGioHang(this.sv.IDKho,trangThai).subscribe(
      (response) => {
        console.log('get gio hang:', response);
        this.dataGioHang= response;

       console.log(response)
        // Lấy danh sách ảnh từ server và gán vào biến dataGioHang để hiển thị trong template
      },
      (error) => {
        console.log('Get images error:', error);
      }
    );
  }


  dieuKien(){
    if(this.soLuong>=1&&this.soLuong<=10000){
      this.isDisabled=false;
      this.thanhTien= this.soLuong*(this.sv.dataKho[this.idKho].DonGia-(this.sv.dataKho[this.idKho].DonGia*this.sv.dataKho[this.idKho].GiamGia/100))
      return true
    }
   
    else 
     {
      this.isDisabled=true;
      this.thanhTien=0; return false
     }
    
  }


  off(){
    this.dialogRef.close();
  }

  close(): void {
   this. them()
    this.dialogRef.close();
  }

  dataKho=this.sv.dataKho;
  idKho:number=this.sv.IDKho;
  
  //thêm vào giỏ hàng
  them(){
   
   //tao 1 bien check xem san pham co trong gio hang chua
    let checkGioHang=false ;

    for (const num of this.sv.dataGioHang) {
      console.log(num.SanPhamID);
      if(num.SanPhamID===this.sv.datahome.SanPhamID) checkGioHang=true ;
    }
    
    if(checkGioHang){
      this.getGioHang();
      let IDGioHang=-1;

      //lấy id trong giỏ hàng
      for(let i=0;i<this.dataGioHang.length;i++  ){
        if(this.sv.IDnameLogin===this.dataGioHang[i].TaiKhoanID&&this.dataKho[this.idKho].ID===this.dataGioHang[i].SanPhamID)
        IDGioHang=i
      }
        let soLuongTang =this.dataGioHang[IDGioHang].SoLuong+=this.soLuong;
      // nếu số lượng trong giỏ hàng lớn hơn số lượng trong Kho thì thông báo
      if(soLuongTang>this.dataKho[this.idKho].SoLuongHH){
        alert("Rất tiết số lượng đã đến giới hạn");
      }else{
         //cap nhat so luong trong gio hang
      
      this.thanhTien= soLuongTang*(this.dataKho[this.idKho].DonGia-(this.dataKho[this.idKho].DonGia*this.dataKho[this.idKho].GiamGia/100))
      this.dataGioHang[IDGioHang].ThanhTien=this.thanhTien
      //gọi hàm udat giỏ hàng dể udat
      this.serverHttpService.updatGioHang1(this.dataGioHang[IDGioHang],this.dataGioHang[IDGioHang].ID,1).subscribe(
        (response) => {
       //   alert('Upload success:'+ response);
          console.log('Upload success:');
          
          //this.getKho(); // Sau khi upload thành công, gọi lại hàm để cập nhật danh sách ảnh từ server
          alert('Thêm Thành công:');
          this.off()
        },
        (error) => {
          console.log('Upload error:');
          alert('Upload error:');
        }
      );
      }
      
    }
   else if(this.soLuong>this.dataKho[this.idKho].SoLuongHH){
    alert("Rất tiếc số lượng đã đến giới hạng");
   }
    else {
     
      let trangThai=1;//trang thái 1 là trong giỏ hàng, 2 admin chấp nhận mua , 3  admin hủy
      /// không có trong giỏ hàng thì thêm vào
      this.themGioHang(trangThai);
    }
        
  }
  themGioHang(trangThai:number){
    this.sv.datahome.SoLuong=this.soLuong;//lấy số lượngSoLuongHH
    
    this.thanhTien= this.soLuong*(this.sv.dataKho[this.idKho].DonGia-(this.sv.dataKho[this.idKho].DonGia*this.sv.dataKho[this.idKho].GiamGia/100))
    this.sv.datahome.ThanhTien=this.thanhTien;
    this.serverHttpService.themGioHang(this.sv.datahome,trangThai).subscribe(
      (response) => {
     //   alert('Upload success:'+ response);
        console.log('Upload success:');
        
        //this.getKho(); // Sau khi upload thành công, gọi lại hàm để cập nhật danh sách ảnh từ server
        alert('Thêm Thành công:');
        this.off()
      },
      (error) => {
        console.log('Upload error:');
        alert('Upload error1:');
        console.log(this.sv.datahome)
      }
    );
  }
}
