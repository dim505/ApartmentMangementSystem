using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AMSBackEnd.Model;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;


//ReceiptController is responsible for all action methods related to the receipt page 

namespace AMSBackEnd.Controllers
{
    [Authorize]
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
        public IActionResult GetReceipts()
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception e)
            {
                LoginUserIdentifier = "";

            }
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            List<ReceiptModel> Receipts = new List<ReceiptModel>();
            using (IDbConnection db = new SqlConnection(connStr))
            {
                Receipts = db.Query<ReceiptModel>("select *,'' " +
                    "as [ImageUrl] from Receipts " +
                    "inner join Images on Images.Guid = " +
                    "Receipts.ImageGuid where Receipts.Auth0ID = @LoginUserIdentifier",
                    new { LoginUserIdentifier = new DbString { Value = LoginUserIdentifier, IsFixedLength = false, IsAnsi = true } }).ToList();
            }
            return Ok(Receipts);
        }

        //this action method is responsible for deleting the requested receipt 
        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult RemoveItem(int id)
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception e)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];

            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"delete from Images
                             where Guid in (select ImageGuid from Receipts
                             where id = @ID)";
                var result = db.Execute(SqlStr, new
                {
                    ID = id
                });
                SqlStr = @"delete from Receipts
                            where id = @ID and Auth0ID = @LoginUserIdentifier";
                result = db.Execute(SqlStr, new
                {
                    ID = id,
                    LoginUserIdentifier = LoginUserIdentifier
                });
            }
            return Ok();
        }

        //this action method is responsible for updating the requested receipt record information from the Update Receipt Modal
        [HttpPost]
        [Route("UpdateReceipt")]
        public IActionResult UpdateReceipt([FromBody] JObject data)
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception e)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            UpdateReceipt updatereceipt = data["receipt"].ToObject<UpdateReceipt>();



            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"Update receipts
                                set Date = @Date,
                                    Store = @Store,
                                    Tax = @Tax,
                                    TotalAmount = @TotalAmount
                                 where id = @ID and Auth0ID = @LoginUserIdentifier";

                var result = db.Execute(SqlStr, new
                {
                    Date = updatereceipt.date,
                    Store = updatereceipt.store,
                    Tax = updatereceipt.tax,
                    TotalAmount = updatereceipt.totalAmount,
                    ID = updatereceipt.id,
                    LoginUserIdentifier = LoginUserIdentifier

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

            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception e)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            byte[] fileBytes;
            using (var memoryStream = new MemoryStream())
            {
                await body.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }

            var filename = body.FileName;
            var contentType = body.ContentType;


            using (IDbConnection db = new SqlConnection(connStr))
            {
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
        public async Task<IActionResult> AddImage([FromRoute]String id, [FromForm]IFormFile body)
        {

            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception e)
            {
                LoginUserIdentifier = "";

            }

            var connStr = _config["ConnectionStrings:DefaultConnection"];
            byte[] fileBytes;
            using (var memoryStream = new MemoryStream())
            {
                await body.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }


            var filename = body.FileName;
            var contentType = body.ContentType;


            using (IDbConnection db = new SqlConnection(connStr))
            {
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
        public IActionResult AddReceipt([FromBody]JObject data)
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception e)
            {
                LoginUserIdentifier = "";


            }
            var connStr = _config["ConnectionStrings:DefaultConnection"];
            ReceiptModel receiptModel = data["receipt"].ToObject<ReceiptModel>();

            using (IDbConnection db = new SqlConnection(connStr))
            {
                var SqlStr = @"insert into Receipts(Date,Store,Tax,TotalAmount,ImageGuid,Auth0ID) values 
                            (@Date,@Store,@Tax,@TotalAmount,@ImageGuid,@LoginUserIdentifier )";
                var result = db.Execute(SqlStr, new
                {

                    Date = receiptModel.Date,
                    Store = receiptModel.Store,
                    Tax = receiptModel.Tax,
                    TotalAmount = receiptModel.TotalAmount,
                    ImageGuid = receiptModel.ImageGuid,
                    LoginUserIdentifier = LoginUserIdentifier
                }


                    );

            }
            return Ok();

        }


    };


}
