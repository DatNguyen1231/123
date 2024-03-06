using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using QLVLXD1.Model;
using System.Data;

namespace QLVLXD1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThongTinKhachHangController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;




        public ThongTinKhachHangController(IConfiguration configuration, IWebHostEnvironment env)
        {

            _configuration = configuration;
            _env = env;
        }
        [HttpGet()]
        public JsonResult Get1()
        {

            string query = "select * " +
                "from ThongTinKhachHang TTKH JOIN Login LG ON TTKH.LoginID =LG.ID "  ;
               


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

            string query = "select TTKH.LoginID, TTKH.Ten, TTKH.Email, TTKH.SDT, TTKH.GioiTinh, TTKH.NgaySinh,TTKH.DiaChi, LG.MatKhau,LG.TenDangNhap " +
                "from ThongTinKhachHang TTKH JOIN Login LG ON TTKH.LoginID =LG.ID" +
                " where LG.ID='"+IDTaiKhoan+"'";


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

        //[HttpPost("{IDTaiKhoan}")]
        //public JsonResult Post(int IDTaiKhoan)
        //{
        //    string query = "INSERT INTO ThongTinKhachHang (LoginID, Ten, Email, SDT, GioiTinh, NgaySinh) " +
        //        "VALUES ('"+IDTaiKhoan+ "',N' thiếu ',N' thiếu ',N' thiếu ', N' thiếu ', N' Nam ');";
        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("QLVLXD");
        //    SqlDataReader myReader;
        //    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        //    {
        //        myCon.Open();

        //        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //        {

        //            myReader = myCommand.ExecuteReader();
        //            table.Load(myReader);
        //            myReader.Close();
        //            myCon.Close();
        //        }
        //    }
        //    return new JsonResult("thêm mới thành công");
        //}
        [HttpPut("{LoginID}")]
        public JsonResult put(ThongTinKhachHang a, string LoginID)
        {
            string query = "UPDATE ThongTinKhachHang SET " +
                
                "Ten =N'" + a.ten + "'," +
                "Email = N'" + a.email + "'," +
                "SDT=N'" + a.SDT + "'," +
                "GioiTinh=N'" + a.gioiTinh + "' ," +
                "NgaySinh=N'" + a.ngaySinh + "', " +
                "DiaChi=N'"+a.diaChi+"' "+
                " WHERE LoginID = '" +LoginID + "';";

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

        [HttpPost]
        public JsonResult Post1(ThongTinKhachHang a)
        {
            string query = "INSERT INTO ThongTinKhachHang (LoginID, Ten, Email, SDT, GioiTinh, NgaySinh,DiaChi) " +
                "VALUES (N'" + a.LoginID + "', N'" + a.ten + "',N'" + a.email + "'," +
                       " N'" + a.SDT+ "',N'" + a.gioiTinh + "', N'" + a.ngaySinh + "',N'"+a.diaChi+"');";

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

    }
}
