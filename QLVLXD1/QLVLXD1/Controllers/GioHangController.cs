using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using QLVLXD1.Model;
using System.Data;

namespace QLVLXD1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GioHangController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;




        public GioHangController(IConfiguration configuration, IWebHostEnvironment env)
        {

            _configuration = configuration;
            _env = env;
        }
        [HttpGet("{TrangThaiMua}")]
        public JsonResult Get1( int TrangThaiMua)
        {
            string query = "SELECT GH.ID,   GH.TaiKhoanID ,  GH.SanPhamID  ,LG.TenDangNhap, GH.SoLuong ,HH.TenHang , HH.Anh, HH.DonGia,HH.GiamGia,HH.SoLuongHH, GH.ThanhTien " +
                "FROM GioHang GH " +
                "JOIN HangHoa HH ON GH.SanPhamID = HH.ID " +
                "JOIN Login LG ON GH.TaiKhoanID =LG.ID Where GH.TrangThaiMua = '" + TrangThaiMua + "' ";

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

        [HttpGet("{IDTen}/{TrangThaiMua}")]
        public JsonResult Get(string IDTen,int TrangThaiMua)
        {
            string query = "SELECT GH.ID,   GH.TaiKhoanID ,  GH.SanPhamID  ,LG.TenDangNhap, GH.SoLuong ,HH.TenHang , HH.Anh, HH.DonGia,HH.GiamGia,HH.SoLuongHH, GH.ThanhTien " +
                "FROM GioHang GH " +
                "JOIN HangHoa HH ON GH.SanPhamID = HH.ID " +
                "JOIN Login LG ON GH.TaiKhoanID =LG.ID Where GH.TaiKhoanID='" + IDTen + "' AND GH.TrangThaiMua = '" + TrangThaiMua+"' ";

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

       
        [HttpPost("{TrangThaiMua}")]
        public IActionResult Post(int TrangThaiMua,GioHang a)
        {
            string query = "INSERT INTO GioHang (TaiKhoanID, SanPhamID, SoLuong, ThanhTien,TrangThaiMua) " +
                           "VALUES (@TaiKhoanID, @SanPhamID, @SoLuong, @ThanhTien,@TrangThaiMua)";

            string sqlDataSource = _configuration.GetConnectionString("QLVLXD");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@TaiKhoanID", a.TaiKhoanID);
                    myCommand.Parameters.AddWithValue("@SanPhamID", a.SanPhamID);
                    myCommand.Parameters.AddWithValue("@SoLuong", a.soLuong);    
                    myCommand.Parameters.AddWithValue("@ThanhTien", a.thanhTien);
                    myCommand.Parameters.AddWithValue("@TrangThaiMua",TrangThaiMua);



                    myCommand.ExecuteNonQuery();
                }

                myCon.Close();
            }

            return new JsonResult("Thêm mới thành công");
        }
        [HttpDelete("{ID}")]
        public IActionResult Delete(string ID)
        {
            try
            {
                string query = "DELETE FROM GioHang WHERE ID = @ID";
                string sqlDataSource = _configuration.GetConnectionString("QLVLXD");

                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();

                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@ID", ID);
                        myCommand.ExecuteNonQuery();
                    }

                    myCon.Close();
                }

                return new JsonResult("Xóa thành công");
            }
            catch (Exception ex)
            {
                return BadRequest($"Đã xảy ra lỗi: {ex.Message}");
            }
        }


        [HttpPut("{ID}/{TrangThaiMua}")]
        public JsonResult put(GioHang a, int ID, int TrangThaiMua)
        {

            string query = "UPDATE GioHang SET SoLuong='" + a.soLuong+ "', ThanhTien='" +a.thanhTien + "',TrangThaiMua='" + TrangThaiMua + "'" +
                           " where ID='"+ID+"'";

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
            return new JsonResult("Sửa thành công");
        }
    }
    
 }

