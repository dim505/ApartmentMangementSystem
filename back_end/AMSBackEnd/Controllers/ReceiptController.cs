using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
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

		//this gets all the receipts from the database
        public IActionResult GetReceipts() {
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<ReceiptModel> Receipts = new List<ReceiptModel>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                Receipts = db.Query<ReceiptModel>("select *,'' as [ImageUrl] from Receipts inner join Images on Images.Guid = Receipts.ImageGuid").ToList();
            }
                return Ok(Receipts);
        }

		//this action method is responsible for deleting the requested receipt 
        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult RemoveItem( int id) { 
            var connStr = _config["ConnectionStrings:DefaultConnection"];

            using (IDbConnection db = new SqlConnection(connStr)) {
                var SqlStr = @"delete from Images
                             where Guid in (select ImageGuid from Receipts
                             where id = @ID)";
                var result = db.Execute(SqlStr, new
                {
                    ID = id
                });
                 SqlStr = @"delete from Receipts
                            where id = @ID";
                 result = db.Execute(SqlStr, new
                {
                    ID = id
                });
            }
            return Ok();
           }

		//this action method is responsible for updating the requested receipt record information from the Update Receipt Modal
        [HttpPost]
        [Route("UpdateReceipt")]
        public IActionResult UpdateReceipt([FromBody] JObject data) {
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            UpdateReceipt updatereceipt = data["receipt"].ToObject<UpdateReceipt>();



            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"Update receipts
                                set Date = @Date,
                                    Store = @Store,
                                    Tax = @Tax,
                                    TotalAmount = @TotalAmount
                                 where id = @ID";

                var result = db.Execute(SqlStr, new
                {
                    Date = updatereceipt.date,
                    Store = updatereceipt.store,
                    Tax = updatereceipt.tax,
                    TotalAmount = updatereceipt.totalAmount,
                    ID = updatereceipt.id

                }

                    );



            }



            return Ok(updatereceipt);



        }
		
		//this action method is responsible for updating the image if necessary from the Update Receipt Modal 
        [HttpPost]
        [Route("UpdateImage/{id}")]
        public async Task<IActionResult> UpdateImage([FromRoute]String id, [FromForm]IFormFile body)
        {
            
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            byte[] fileBytes;
            using (var memoryStream = new MemoryStream()) {
                await body.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }

            var filename = body.FileName;
            var contentType = body.ContentType;


            using (IDbConnection db = new SqlConnection(connStr)) {
                var SqlStr = @"Update images
	                                set image = @Image,
		                            filename = @FileName,
		                            contentType = @Contenttype
                               where Guid = @ID";
                var result = db.Execute(SqlStr, new
                {
                    ID = id,
                    Image = fileBytes,
                    FileName = filename,
                    Contenttype = contentType
                }


                    );
            
            
            };
            


                return Ok();
        }



	    //when a user adds a receipt, this action method is responsible for adding the image to the database
        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> AddImage([FromRoute]String id, [FromForm]IFormFile body) {

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            byte[] fileBytes;
            using (var memoryStream = new MemoryStream()) {
                await body.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }


            var filename = body.FileName;
            var contentType = body.ContentType;


            using (IDbConnection db = new SqlConnection(connStr)) {
                var SqlStr = @"insert into images values (@ID, @Image,@FileName, @Contenttype)";
                var result = db.Execute(SqlStr, new
                {
                    ID = id,
                    Image = fileBytes,
                    FileName = filename,
                    Contenttype = contentType

                });

            
            }

                
                return Ok();

        }
         

		//when a user adds a receipt, this action method is responsible adding the text portion of the receipt to the database 
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddReceipt([FromBody]JObject data) {
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            ReceiptModel receiptModel = data["receipt"].ToObject<ReceiptModel>();

            using (IDbConnection db = new SqlConnection(connStr)) {
                var SqlStr = @"insert into Receipts(Date,Store,Tax,TotalAmount,ImageGuid) values (@Date,@Store,@Tax,@TotalAmount,@ImageGuid)";
                var result = db.Execute(SqlStr, new {

                    Date = receiptModel.Date,
                    Store = receiptModel.Store,
                    Tax = receiptModel.Tax,
                    TotalAmount = receiptModel.TotalAmount,
                    ImageGuid = receiptModel.ImageGuid
                }


                    );
            
            }
            return Ok();

        }
        
        
    };

    
}
 