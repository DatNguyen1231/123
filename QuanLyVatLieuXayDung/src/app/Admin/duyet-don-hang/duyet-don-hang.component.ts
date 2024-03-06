import { Component } from '@angular/core';
import { DataServiceService } from 'src/app/data/dataService/data-service.service';
import { ServerHttpService } from 'src/app/data/server-http.service/server-http.service';

@Component({
  selector: 'app-duyet-don-hang',
  templateUrl: './duyet-don-hang.component.html',
  styleUrls: ['./duyet-don-hang.component.css']
})
export class DuyetDonHangComponent {

  dataGioHang:any;
  dataKho:any;
  //lấy id từ kh
  constructor (public sv:DataServiceService,private serverHttpService: ServerHttpService) {
    this.getGioHang()
    this.getKho();
   }
  getGioHang() {
    let trangThai=2;//trang thai mua hang =1 là đang ở trong giỏ //2 là đang nằm trong giỏ hàng duyệt của admin
    this.serverHttpService.getAllGioHang(trangThai).subscribe(
      (response) => {
        console.log('get gio hang:', response);
        this.dataGioHang= response;
        this.sv.soLuongDuyet=this.dataGioHang.length;
       console.log(response)
        // Lấy danh sách ảnh từ server và gán vào biến dataGioHang để hiển thị trong template
      },
      (error) => {
        console.log('Get images error:', error);
      }
    );
  }
  getKho(){
    this.serverHttpService.getKho().subscribe(
      (response) => {
        console.log('get gio hang:', response);
        this.dataKho= response;

      // console.log(response)
        // Lấy danh sách ảnh từ server và gán vào biến dataGioHang để hiển thị trong template
      },
      (error) => {
        console.log('Get images error:', error);
      }
    );
  }
  suaKho(i:number,soLuong:number) {
  // this.getKho();
    let idKho=this.dataGioHang[i].SanPhamID
    let id=-1;
    for(let i=0; i<this.dataKho.length;i++){
      
      if(this.dataKho[i].ID===idKho){
        id=i;
        console.log(id);
      }
    }
   this.dataKho[id].SoLuongHH-=soLuong;
   this.dataKho[id].DaBan+=soLuong;
   console.log("data kho là:",  this.dataKho)

    // console.log("id la",this.sv.dataKho[this.idKho].ID);

      this.serverHttpService.suaKho(this.dataKho[id],idKho).subscribe(
        (response) => {
          console.log('Upload success:', response);
        //  alert('put success.');
        this.getGioHang();
        },
        (error) => {
          console.log('Upload error:', error);
          alert('Upload error.');
        }
      );
      
    
    // Cập nhật ảnh lên server dựa trên index đã lưu và đồng thời cập nhật lại danh sách ảnh từ server
  }
  suaGioHang(index:number,trangthai:number){
    
    if(this.dataGioHang[index].SoLuong<=0 )
    {
      this.dataGioHang[index].SoLuong=1;
    }
    else if(this.dataGioHang[index].SoLuong>this.dataGioHang[index].SoLuongHH&&trangthai===3){
      alert("Rất tiết số lượng đã đạt đến giới hạn");
      this.getGioHang();
    }
    else{
      let giamgia=this.dataGioHang[index].DonGia*this.dataGioHang[index].GiamGia/100;
      this.dataGioHang[index].ThanhTien=this.dataGioHang[index].SoLuong *(this.dataGioHang[index].DonGia-giamgia );
      this.serverHttpService.updatGioHang1(this.dataGioHang[index],this.dataGioHang[index].ID,trangthai).subscribe(
        (respon) => {
          console.log("thành công")
          
          
        },
        (error) => {
          console.log('Upload error:');
        }
      );
     
        this. suaKho(index,this.dataGioHang[index].SoLuong)
        this.getGioHang();
        
    } 
  
   
  }
}
