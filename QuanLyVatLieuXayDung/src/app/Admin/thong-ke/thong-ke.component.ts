import { Component } from '@angular/core';
import { DataServiceService } from 'src/app/data/dataService/data-service.service';
import { ServerHttpService } from 'src/app/data/server-http.service/server-http.service';

@Component({
  selector: 'app-thong-ke',
  templateUrl: './thong-ke.component.html',
  styleUrls: ['./thong-ke.component.css']
})
export class ThongKeComponent {

  constructor (public sv:DataServiceService,private http: ServerHttpService) { }

  
  dataGioHangDaMua:any



  ngOnInit(): void {

    this.getGioHangDaMua(3)
    this.tinhTong();
  }
  tong=0;
  tinhTong(){
    let tong=0;
    for(let a of this.dataGioHangDaMua){
      if(a.TrangThaiMua===3)
      tong+=a.ThanhTien;
    }
   this.tong=tong
  }
 
  getGioHangDaMua(trangThai:number){
    this.http.getALLGioHangDaMua().subscribe((data) => {
      this.dataGioHangDaMua = data.filter((item:any) => item.TrangThaiMua===trangThai);
      console.log("data thong ke :",data)
      this.tinhTong();
    });
  
  }
}
