using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using QLVLXD1.Model;
using System.Data;

using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace QLVLXD1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase

    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;




        public LoginController(IConfiguration configuration, IWebHostEnvironment env)
        {
            
            _configuration = configuration;
            _env = env;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = "select * from Login";
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
        public JsonResult Post(Logins a)
        {
            string query = "INSERT into Login VALUES (' " + a.TenDangNhap + "','" + a.MatKhau + "','" + a.LoaiTaiKhoan + "')";
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
        public JsonResult Delete(string ID)
        {
            
            string query = "DELETE FROM Login WHERE ID = @ID";
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
        [HttpPut("{ID}/{MatKhau}")]
        public JsonResult put(string ID,string MatKhau)
        {
            string query = "UPDATE Login SET " +
              
                "MatKhau='" + MatKhau + "' " +
              
                " WHERE ID = '" + ID + "';";

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
