using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSBackEnd.Model.TenantFrontEnd
{	//used by endpoint  Payment/GetPaymentHistoryInfoCard  gets the payment history summary for the payment history info card
    public class PaymentHistInfoCard
    {

       public string ShortDate { get; set; }
        public string AmountPaid { get; set; }



    }
}
