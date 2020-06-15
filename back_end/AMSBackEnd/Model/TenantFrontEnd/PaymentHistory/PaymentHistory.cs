using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Modal
{	//controller payment, endpoint GetPaymentHistory - used to get the tenants payment history
    public class PaymentHistory
    {
        public string TenGuid { get; set; }
        public string DatePaid { get; set; }
        public string ShortDate { get; set; }
        public string FirstOfMonth { get; set; }
        public string LastDateOfMonth { get; set; }
        public string AmountPaid { get; set; }



    }
}
