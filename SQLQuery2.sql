-- Tạo bảng NguoiDung


CREATE TABLE Login (
	 ID INT PRIMARY KEY IDENTITY(1,1),
    TenDangNhap NVARCHAR(50)  NOT NULL,
    MatKhau NVARCHAR(50) NOT NULL,
    LoaiTaiKhoan NVARCHAR(50) NOT NULL
);

-- Tạo bảng HangHoa
CREATE TABLE HangHoa (
	ID INT PRIMARY KEY IDENTITY(1,1),
    TenHang NVARCHAR(50)  NOT NULL,
    SoLuongHH INT NOT NULL,
    DonGia MONEY NOT NULL,
	GiaGoc MONEY NOT NULL,
	GiamGia int NOT NULL,
	ThanhTien MONEY NOT NULL,
	DaBan INT DEFAULT 0,
	Anh NVARCHAR(MAX)
);



-- Thay "TenCot" bằng tên cột mới và "NVARCHAR(50)" bằng kiểu dữ liệu của cột


-- Tạo bảng GioHang
-- Tạo bảng GioHang
CREATE TABLE GioHang (
    ID INT PRIMARY KEY IDENTITY(1,1),
    TaiKhoanID int NOT NULL,
    SanPhamID int NOT NULL,
    SoLuong INT NOT NULL,
	ThanhTien MONEY NOT NULL,
    CONSTRAINT FK_GioHang_Login FOREIGN KEY (TaiKhoanID) REFERENCES Login (ID) ON DELETE CASCADE,
    CONSTRAINT FK_GioHang_HangHoa FOREIGN KEY (SanPhamID) REFERENCES HangHoa (ID)  ON DELETE CASCADE,
);

-- Tạo bảng ThongKe
CREATE TABLE ThongKe (
    ID INT PRIMARY KEY IDENTITY(1,1),
    TaiKhoanID int NOT NULL,
    SanPhamID int NOT NULL,
    NgayBan DATE NOT NULL,
    SoLuongBan INT NOT NULL,
    CONSTRAINT FK_ThongKe_NguoiDung FOREIGN KEY (TaiKhoanID) REFERENCES Login (ID) ON DELETE CASCADE,
    CONSTRAINT FK_ThongKe_HangHoa FOREIGN KEY (SanPhamID) REFERENCES HangHoa (ID) ON DELETE CASCADE
); 

CREATE TABLE GioHangDaBan (
    ID INT PRIMARY KEY IDENTITY(1,1),
	GioHangID int NOT NULL,
	NgayMua DATE NOT NULL,
	
    
    CONSTRAINT FK_GioHangDaBan_GioHang FOREIGN KEY (GioHangID) REFERENCES GioHang (ID)  ON DELETE CASCADE,
);

CREATE TABLE ThongTinKhachHang (
    ID INT PRIMARY KEY IDENTITY(1,1),
	LoginID int NOT NULL,
	TenHang NVARCHAR(50)  NOT NULL,
	Email  NVARCHAR(50)  NOT NULL,
	SDT  NVARCHAR(50)  NOT NULL,
	GioiTinh  NVARCHAR(50)  NOT NULL,
	NgaySinh DATE NOT NULL,
	
    
    CONSTRAINT FK_ThongTinKhachHang_Login FOREIGN KEY (LoginID) REFERENCES Login (ID)  ON DELETE CASCADE,
);
INSERT INTO Login (TenDangNhap, MatKhau, LoaiTaiKhoan)
VALUES ('user1', 'password1', 'admin'),
       ('user2', 'password2', 'user'),
       ('user3', 'password3', 'user');


INSERT INTO HangHoa (TenHang, SoLuongHH, DonGia, GiaGoc, GiamGia, ThanhTien, DaBan, Anh)
VALUES ('Sản phẩm 1', 10, 100000, 90000, 10, 900000, 5, 'image1.jpg'),
       ('Sản phẩm 2', 5, 50000, 40000, 20, 100000, 2, 'image2.jpg'),
       ('Sản phẩm 3', 8, 200000, 180000, 10, 1600000, 3, 'image3.jpg');

INSERT INTO GioHang (TaiKhoanID, SanPhamID, SoLuong, ThanhTien)
VALUES (1, 1, 2, 200000),
       (2, 2, 1, 50000),
       (3, 3, 3, 600000);

INSERT INTO ThongKe (TaiKhoanID, SanPhamID, NgayBan, SoLuongBan)
VALUES (1, 1, '2023-06-01', 2),
       (2, 2, '2023-06-02', 1),
       (3, 3, '2023-06-03', 3);

INSERT INTO GioHangDaBan (GioHangID, NgayMua)
VALUES (1, '2023-06-01'),
       (2, '2023-06-02'),
       (3, '2023-06-03');




SELECT TK.ID, HH.TenHang, ND.TenDangNhap, TK.NgayBan, TK.SoLuongBan
FROM ThongKe TK
JOIN HangHoa HH ON TK.SanPhamID =  HH.ID
JOIN Login ND ON TK.TaiKhoanID = ND.ID

SELECT GH.ID,  HH.TenHang, GH.TaiKhoanID ,  GH.SanPhamID  ,LG.TenDangNhap , HH.TenHang , GH.SoLuong ,HH.Anh, HH.DonGia, GH.ThanhTien FROM GioHang GH
JOIN HangHoa HH ON GH.SanPhamID = HH.ID
JOIN Login LG ON GH.TaiKhoanID =LG.ID


select *
from GioHang gh
JOIN HangHoa HH ON GH.SanPhamID = HH.ID
JOIN Login ND ON GH.TaiKhoanID =ND.ID


select GHDB.IDDB, GHDB.GioHangID , GHDB.NgayMua,GH.SoLuong,GH.ThanhTien,HH.Anh,HH.TenHang,HH.DonGia,HH.GiamGia ,LG.ID
from GioHangDaBan GHDB
JOIN GioHang GH ON GHDB.GioHangID=GH.ID
JOIN HangHoa HH ON GH.SanPhamID = HH.ID
JOIN Login LG ON GH.TaiKhoanID =LG.ID where LG.ID=32


SELECT GH.ID,   GH.TaiKhoanID ,  GH.SanPhamID  ,LG.TenDangNhap, GH.SoLuong ,HH.TenHang , HH.Anh, HH.DonGia,HH.GiamGia,HH.SoLuongHH, GH.ThanhTien 
                FROM GioHang GH 
                JOIN HangHoa HH ON GH.SanPhamID = HH.ID 
                JOIN Login LG ON GH.TaiKhoanID =LG.ID Where GH.TaiKhoanID=31 AND GH.TrangThaiMua = 1


select TTKH.LoginID, TTKH.Ten, TTKH.Email, TTKH.SDT, TTKH.GioiTinh, TTKH.NgaySinh, LG.MatKhau,LG.TenDangNhap
from ThongTinKhachHang TTKH

JOIN Login LG ON TTKH.LoginID =LG.ID where LG.ID=18


INSERT INTO ThongTinKhachHang (LoginID, Ten, Email, SDT, GioiTinh, NgaySinh) VALUES (18, N'Tên Khách Hàng', N'example@example.com', N'0123456789', N'Nam', null);


UPDATE GioHang SET SoLuong=2, ThanhTien=4,TrangThaiMua=2 where ID=264

 select *  from ThongTinKhachHang TTKH JOIN Login LG ON TTKH.LoginID =LG.ID ;
               