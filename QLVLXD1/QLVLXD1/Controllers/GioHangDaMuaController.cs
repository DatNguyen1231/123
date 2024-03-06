using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using QLVLXD1.Model;
using System.Data;

namespace QLVLXD1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GioHangDaMuaController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;




        public GioHangDaMuaController(IConfiguration configuration, IWebHostEnvironment env)
        {

            _configuration = configuration;
            _env = env;
        }
        [HttpGet()]
        public JsonResult Get3()
        {

            string query = "select LG.TenDangNhap, GHDB.IDDB, GHDB.GioHangID , GHDB.NgayMua,GH.SoLuong,GH.ThanhTien,HH.Anh,HH.TenHang,HH.DonGia,HH.GiamGia ,GH.TrangThaiMua,LG.ID " +
                "from GioHangDaBan GHDB JOIN GioHang GH ON GHDB.GioHangID=GH.ID " +
                "JOIN HangHoa HH ON GH.SanPhamID = HH.ID" +
                " JOIN Login LG ON GH.TaiKhoanID =LG.ID  ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("QLVLXD");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpGet("{IDTaiKhoan}")]
        public JsonResult Get(int IDTaiKhoan)
        {

            string query = "select GHDB.IDDB, GHDB.GioHangID , GHDB.NgayMua,GH.SoLuong,GH.ThanhTien,HH.Anh,HH.TenHang,HH.DonGia,HH.GiamGia ,GH.TrangThaiMua,LG.ID " +
                "from GioHangDaBan GHDB JOIN GioHang GH ON GHDB.GioHangID=GH.ID " +
                "JOIN HangHoa HH ON GH.SanPhamID = HH.ID" +
                " JOIN Login LG ON GH.TaiKhoanID =LG.ID where LG.ID='" + IDTaiKhoan+"' ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("QLVLXD");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpGet("{IDTaiKhoan}/{TenHang}/{TrangThaiMua}")]
        public JsonResult Get1(int IDTaiKhoan,string TenHang,int TrangThaiMua)
        {

            string query = "select GHDB.IDDB, GHDB.GioHangID , GHDB.NgayMua,GH.SoLuong,GH.ThanhTien,HH.Anh,HH.TenHang,HH.DonGia,HH.GiamGia ,GH.TrangThaiMua,LG.ID " +
                "from GioHangDaBan GHDB " +
                "JOIN GioHang GH ON GHDB.GioHangID=GH.ID " +
                "JOIN HangHoa HH ON GH.SanPhamID = HH.ID " +
                "JOIN Login LG ON GH.TaiKhoanID =LG.ID " +
                "where LG.ID='" + IDTaiKhoan+"' AND( HH.TenHang LIKE '%" +  TenHang+ "%' or GH.TrangThaiMua='"+TrangThaiMua+"') ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("QLVLXD");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost("{GioHangID}")]
        public IActionResult Post(GioHangDaBan a,int GioHangID )
        {
            string query = "INSERT INTO GioHangDaBan (GioHangID,NgayMua) " +
                           "VALUES (@GioHangID, @NgayMua)";

            string sqlDataSource = _configuration.GetConnectionString("QLVLXD");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@GioHangID", GioHangID);
                    myCommand.Parameters.AddWithValue("@NgayMua", a.NgayMua);
               

                    myCommand.ExecuteNonQuery();
                }

                myCon.Close();
            }

            return new JsonResult("Thêm mới thành công");
        }
    }
}
