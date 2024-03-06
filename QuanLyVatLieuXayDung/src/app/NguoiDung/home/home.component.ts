import { Component } from '@angular/core';
import { DataServiceService } from '../../data/dataService/data-service.service';
import { ServerHttpService } from '../../data/server-http.service/server-http.service';
import { MatDialog } from '@angular/material/dialog';
import { MessNoiComponent } from './mess-noi/mess-noi.component';
import {  MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent {

  getDataKho:any
  key:string='';
 
  
  constructor(private dialog: MatDialog,private sv:DataServiceService, private serverHttpService: ServerHttpService) { }
  nameLogin=this.sv.nameLogin;
  ngOnInit() {
    this.getKho(); // Gọi hàm để lấy dữ liệu ảnh từ server khi component được khởi tạo
    this.getGioHang()
  }
  getDataGioHang:any;
  
  getGioHang() {
    let trangThai=1;//trang thai mua hang =1 là đang ở trong giỏ
   
    this.serverHttpService.getGioHang(this.sv.IDnameLogin,trangThai).subscribe(
      (response) => {
       

        this.getDataGioHang=response;
        this.sv.dataGioHang=response;
        // Lấy danh sách ảnh từ server và gán vào biến dataFromSV để hiển thị trong template
      },
      (error) => {
        console.log('Get images error:', error);
      }
    );
  }
  getKho() {
    this.serverHttpService.getKho().subscribe(
      (response) => {
        console.log('Get kho success:', response);
       
        this.getDataKho= response;
        
        // lấy dữ liệu lên service
        this.sv.dataKho=response;
        // Lấy danh sách ảnh từ server và gán vào biến dataFromSV để hiển thị trong template
      },
      (error) => {
        console.log('Get  images error:', error);
      }
    );

  }
  searchByTenHang() {
    
    this.serverHttpService.timKho(this.key).subscribe(
      (response) => {
        console.log( response);
       
        this.getDataKho=response;
        // Lấy danh sách ảnh từ server và gán vào biến dataFromSV để hiển thị trong template
      },
      (error) => {
        console.log('Get images error:', error);
      }
    );
  }
  cancelSearch(){
   this.getKho;
  }
  stars: boolean[] = [false, false, false, false, false]; // Mảng trạng thái của các ngôi sao

  toggleStar(index: number) {
    
    if (this.stars[index]) {
      this.stars.fill(false, 0,5); 
    } // Đặt toàn bộ các ngôi sao từ vị trí thứ index trở đi là false
   
      this.stars.fill(true, 0, index + 1); // Đặt toàn bộ các ngôi sao từ vị trí thứ 0 đến vị trí thứ index là true
    
  }

  data = {
    TaiKhoanId:0,
    SanPhamID: 0,
    SoLuong: 0,
    ThanhTien:0,
    
  };
  

    themGioHang(index:number){

        this.getGioHang();
        

        this.data.TaiKhoanId=this.sv.IDnameLogin;
        this.data.SanPhamID = this.getDataKho[index].ID;
      
        

       // this.sv.dataGioHang=this.getDataGioHang
        this.sv.datahome={...this.data}
        //gửi id về service
        this.sv.IDKho=index;
        this.openModal();
    
        // const foundUser = this.getDataGioHang.find((user: any) =>   user.SanPhamID === this.data.SanPhamID  ) ;
       
        // if(foundUser){
        //  console.log("đã có trong giỏ hàng");
        // }
        // else {
        //   // console.log("khong có gì");

        //   /// không có trong giỏ hàng thì thêm vào
        //   this.serverHttpService.themGioHang(this.data).subscribe(
        //     (response) => {
        //    //   alert('Upload success:'+ response);
        //       console.log('Upload success:');
              
        //       //this.getKho(); // Sau khi upload thành công, gọi lại hàm để cập nhật danh sách ảnh từ server
        //       alert('Thêm Thành công:');
        //       this.getGioHang();
        //     },
        //     (error) => {
        //       console.log('Upload error:');
        //       alert('Upload error:');
        //     }
        //   );
         
        //   //this.getKho();
        // }
    }

    //mở cửa sổ nối số lượng
   openModal() {
    const dialogRef: MatDialogRef<MessNoiComponent> = this.dialog.open(MessNoiComponent);

    dialogRef.afterClosed().subscribe(() => {
      this. getGioHang();
     
    });
  }

  them(i:number){
   
    //tao 1 bien check xem san pham co trong gio hang chua
     let checkGioHang=false ;
 
     for (const num of this.getDataGioHang) {
      
       if(this.getDataKho.ID===num.SanPhamID) checkGioHang=true ;
     }
     
     if(checkGioHang){

      let IDGioHang=-1;

      //lấy id trong giỏ hàng
      for(let i1=0;i1<this.getDataGioHang.length;i1++  ){
        if(this.sv.IDnameLogin===this.getDataGioHang[i1].TaiKhoanID&&this.getDataKho[i].ID===this.getDataGioHang[i1].SanPhamID)
        IDGioHang=i
      }
       if(1>this.getDataKho[i].SoLuongHH){
         alert("Rất tiết số lượng đã đến giới hạn");
       }else{
          //cap nhat so luong trong gio hang
        
       this.thanhTien= (this.getDataKho[i].DonGia-(this.getDataKho[i].DonGia*this.getDataKho[i].GiamGia/100))
       this.getDataGioHang[i].ThanhTien=this.thanhTien
       //gọi hàm udat giỏ hàng dể udat
       this.serverHttpService.updatGioHang1(this.getDataGioHang[IDGioHang],this.getDataGioHang[IDGioHang].ID,1).subscribe(
         (response) => {
        //   alert('Upload success:'+ response);
           console.log('Upload success:');
           
           //this.getKho(); // Sau khi upload thành công, gọi lại hàm để cập nhật danh sách ảnh từ server
           alert('Thêm Thành công:');
          
         },
         (error) => {
           console.log('Upload error:');
           alert('Upload error:');
         }
       );
       }
       
     }
    else if(1>this.getDataKho[i].SoLuongHH){
     alert("Rất tiếc số lượng đã đến giới hạng");
    }
     else {
      
       let trangThai=1;//trang thái 1 là trong giỏ hàng, 2 admin chấp nhận mua , 3  admin hủy
       /// không có trong giỏ hàng thì thêm vào
       this.muaNgay(i,trangThai);
     }
         
   }
   tim(){

    this.serverHttpService.getKho().subscribe(
      (response) => {
        console.log('Get kho success:', response);
       
        this.getDataKho= response.filter((item:any) => item.GiamGia>0);;
        
        // lấy dữ liệu lên service
        this.sv.dataKho=response;
        // Lấy danh sách ảnh từ server và gán vào biến dataFromSV để hiển thị trong template
      },
      (error) => {
        console.log('Get  images error:', error);
      }
    );
      
   }
   tim1(){

    this.serverHttpService.getKho().subscribe(
      (response) => {
        console.log('Get kho success:', response);
       
        this.getDataKho= response.sort((a: any, b: any) => a.DaBan - b.DaBan);
        
        // lấy dữ liệu lên service
        this.sv.dataKho=response;
        // Lấy danh sách ảnh từ server và gán vào biến dataFromSV để hiển thị trong template
      },
      (error) => {
        console.log('Get  images error:', error);
      }
    );
      
   }
   tim2(){

    this.serverHttpService.getKho().subscribe(
      (response) => {
        console.log('Get kho success:', response);
       
        this.getDataKho= response.sort((a: any, b: any) => b.DaBan - a.DaBan);
        // lấy dữ liệu lên service
        this.sv.dataKho=response;
        // Lấy danh sách ảnh từ server và gán vào biến dataFromSV để hiển thị trong template
      },
      (error) => {
        console.log('Get  images error:', error);
      }
    );
      
   }
   thanhTien=0;
   muaNgay(i:number,trangThai:number){
     
    
    this.data.TaiKhoanId=this.sv.IDnameLogin;
    this.data.SanPhamID = this.getDataKho[i].ID;
     this.data.SoLuong=1;
     this.thanhTien= (this.getDataKho[i].DonGia-(this.getDataKho[i].DonGia*this.getDataKho[i].GiamGia/100))
     this.data.ThanhTien=this.thanhTien;
     
     this.serverHttpService.themGioHang(this.data,trangThai).subscribe(
       (response) => {
      //   alert('Upload success:'+ response);
         console.log('Upload success:');
         
         //this.getKho(); // Sau khi upload thành công, gọi lại hàm để cập nhật danh sách ảnh từ server
         alert('Thêm Thành công:');
         
       },
       (error) => {
         console.log('Upload error:');
         alert('Upload error1:');
         console.log(this.sv.datahome)
       }
     );
   }
  
}
