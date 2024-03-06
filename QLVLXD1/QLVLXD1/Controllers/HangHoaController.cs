using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using QLVLXD1.Model;
using System.Data;

namespace QLVLXD1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HangHoaController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;




        public HangHoaController(IConfiguration configuration, IWebHostEnvironment env)
        {

            _configuration = configuration;
            _env = env;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = "select * from HangHoa";
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
        [HttpGet("{Ten}")]
        public JsonResult Get1(string Ten)
        {
            string query = " SELECT * FROM HangHoa WHERE TenHang LIKE '%' +N'" + Ten + "' + '%';";
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

        [HttpPost]
        public JsonResult Post(HangHoa a)
        {
            string query = "INSERT into HangHoa" +
                " VALUES (N'" + a.tenHang + "','" + a.soLuongHH + "','" + a.donGia + "','"+a.giaGoc+"','"+ a.giamGia+"'  ,'" + a.ThanhTien + "','" + a.daBan + "','" + a.anh + "')";
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
            return new JsonResult("thêm mới thành công");
        }



        [HttpDelete("{ID}")]
        public IActionResult Delete(string ID)
        {
            try
            {
                string query = "DELETE FROM HangHoa WHERE ID = @ID";
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

        [HttpPut("{ID}")]
        public JsonResult put(HangHoa a,string ID)
        {
            string query = "UPDATE HangHoa SET " +
                "TenHang='" + a.tenHang + "'," +
                "SoLuongHH ='" + a.soLuongHH + "'," +
                "DonGia = '" + a.donGia + "'," +
                "GiaGoc='"+a.giaGoc+"',"+
                "GiamGia='"+a.giamGia+"' ,"+
                "ThanhTien='" + a.ThanhTien + "', " +
                "DaBan='"+a.daBan+"' ," +
                "Anh='" + a.anh + "'" +
                " WHERE ID = '"+ ID+"';";
        
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
