using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using AMSBackEnd.Model;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace AMSBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        private readonly IConfiguration _config;

        public ReceiptController(IConfiguration config)
        {
            _config = config;
        }


        [HttpGet]

        public IActionResult GetReceipts() {
            var connStr = _config["ConnectionStrings:DefaultConnection"];

            List<ReceiptModel> Receipts = new List<ReceiptModel>();
            using (IDbConnection db = new SqlConnection(connStr))
            {

                Receipts = db.Query<ReceiptModel>("Select * From Receipts").ToList();
            }


            return Ok(Receipts);



        }

        [HttpPost]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Post([FromRoute]Guid id, [FromForm]IFormFile body)
        {
            byte[] fileBytes;
            using (var memoryStream = new MemoryStream())
            {
                await body.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }

            var filename = body.FileName;
            var contentType = body.ContentType;

            SaveFileToDatabase(id, fileBytes, filename, contentType);

            return Ok();
        }




        [HttpPost]
        public void InsertReceipt([FromBody] JObject data) {
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            ReceiptModel receiptModel = data["Postdata"].ToObject<ReceiptModel>();
            using (IDbConnection db = new SqlConnection(connStr)) {
                var SqlStr = @"insert into Receipts(Date,Store,Tax,TotalAmount,Image) values (@Date,@Store,@Tax,@TotalAmount,@Image)";
                var result = db.Execute(SqlStr, receiptModel);
            
            }
        }



    }
}