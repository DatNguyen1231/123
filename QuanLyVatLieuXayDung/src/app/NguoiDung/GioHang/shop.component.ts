import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ServerHttpService } from '../../data/server-http.service/server-http.service';
import { DataServiceService } from '../../data/dataService/data-service.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  nameLogin=this.sv.nameLogin;
  
  
  dataGioHang: any;
 // layDataGioHang={SoLuong:0,ThanhTien:0}
  idDelete: number=-1;
  currentDate: string='';

  constructor (private datePipe: DatePipe,public sv:DataServiceService,private serverHttpService: ServerHttpService) { }
 
  ngOnInit(): void {
  this. getGioHang();
  
   
  }



  checkALL(){
    //khở tạo cho biến isAllSelected
    for (let i = 0; i < this.dataGioHang.length; i++) {
      
      this.sv.isAllSelected[i] = false;
      
    }
  //check all hoặc bỏ check
    if(this.sv.check)
    for (let i = 0; i < this.dataGioHang.length; i++) {
      
      this.sv.isAllSelected[i] = true;

    }
    else  for (let i = 0; i < this.dataGioHang.length; i++) {
      
      this.sv.isAllSelected[i] = false;

    }

   
  }
  //tính tổng số tiền đc check
  getTongTien(){
    let tong=0;
   
    for (let i = 0; i < this.dataGioHang.length; i++) {
      
      if(this.sv.isAllSelected!==null &&this.sv.isAllSelected[i] ) tong+= this.dataGioHang[i].ThanhTien;

    }
   return tong;
  }
  //lấy data giỏ hàng từ api
  getGioHang() {
    let trangThai=1;//trang thai mua hang =1 là đang ở trong giỏ
    this.serverHttpService.getGioHang(this.sv.IDnameLogin,trangThai).subscribe(
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
  //nút thêm hoặc giảm
  btnAdd(index:number ,i:number){
 console.log(this.dataGioHang[index].SoLuong+=i)   ;
    
    let giamgia=this.dataGioHang[index].DonGia*this.dataGioHang[index].GiamGia/100;
   console.log(this.dataGioHang[index].ThanhTien=this.dataGioHang[index].SoLuong *(this.dataGioHang[index].DonGia-giamgia ));


   let trangThai=1;//trang thai gio hang 1 nằm trong giỏ hàng người dùng,2,3,4 
    if( this.dataGioHang[index].SoLuong>0){
     
      this.suaGioHang(index,trangThai);
      
    }
    else {this.xoaGioHang(this.dataGioHang[index].ID)}
      
  }
 
 //xóa giỏ hàng
  xoaGioHang(index: number) {
    this.serverHttpService.xoaGioHang(index).subscribe((data) => {
      console.log(data);
     //Sau khi xóa thành công, gọi lại hàm để cập nhật danh sách ảnh từ server
     this.getGioHang();
  console.log(this. getTongTien())  
    });
  
  }
 
  checkSoLuong:boolean=false;
  suaGioHang(index:number,trangthai:number){
    this.checkSoLuong=false;
    if(this.dataGioHang[index].SoLuong<=0 )
    {
      this.dataGioHang[index].SoLuong=1;
    }
    else if(this.dataGioHang[index].SoLuong>this.dataGioHang[index].SoLuongHH){
      alert("Rất tiết số lượng đã đạt đến giới hạn");
      this.getGioHang();
    }
    else{
      let giamgia=this.dataGioHang[index].DonGia*this.dataGioHang[index].GiamGia/100;
      console.log(this.dataGioHang[index].ThanhTien=this.dataGioHang[index].SoLuong *(this.dataGioHang[index].DonGia-giamgia ));
      this.serverHttpService.updatGioHang1(this.dataGioHang[index],this.dataGioHang[index].ID,trangthai).subscribe(
        (respon) => {
          console.log("thành công")
          this.getGioHang();
          this. getTongTien()
        },
        (error) => {
          console.log('Upload error:');
        }
      );
    } 
   
  }

  themGioHangDaMua(data:any,ID:number){
    this.serverHttpService.themGioHangDaMua(data,ID).subscribe(
      (response) => {
     //   alert('Upload success:'+ response);
        console.log('Upload success:');
        
        //this.getKho(); // Sau khi upload thành công, gọi lại hàm để cập nhật danh sách ảnh từ server
       // alert('Thêm Thành công:');
      },
      (error) => {
        console.log('Upload error:');
        alert('Upload error1:');
        console.log(this.sv.datahome)
      }
    );
  }

  data={NgayMua:''}
  //btn mua 
  mua(){
   for(let i=0 ;i< this.dataGioHang.length; i++ ){

    if(this.sv. isAllSelected[i]){
     
      this.data.NgayMua = new Date().toISOString().slice(0, 10);
      this.themGioHangDaMua(this.data,this.dataGioHang[i].ID)
      console.log(this.data.NgayMua);

      this.suaGioHang(i,2);
    }
   
   }
   

  //  for(let i=0 ;i< this.dataGioHang.length; i++ ){

  //   if(this.sv. isAllSelected[i]){
     
  //     this.xoaGioHang(this.dataGioHang[i].ID)
  //     console.log(this.data,this.dataGioHang[i].ID);
  //   }
   
  //  }
    // Sử dụng toán tử ?? để xác định giá trị mặc định là chuỗi rỗng ('') nếu giá trị trả về là null
    
  }
}
  