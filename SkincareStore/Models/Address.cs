using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SkincareStore.Models
{
    public class Address
    {
        [Required(ErrorMessage = "*")]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "*")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "(Invalid email address)")]
        [Display(Name = "E-mail")]
        public string Email { get; set; }

        [Required(ErrorMessage = "*")]
        [RegularExpression(@"^(\+3\d{2}4\d\d{3}\d{3}|3\d{2}4\d\d{3}\d{3}|04\d\d{3}\d{3}|4\d\d{3}\d{3})$", ErrorMessage = "(Invalid phone number)")]
        [Display(Name = "Phone Number")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "Address")]
        public string AddressLine1 { get; set; }

        [Display(Name = "Apartment, suite, etc.")]
        public string AddressLine2 { get; set; }

        public string Country
        {
            get { return "Kosovo"; }
        }

        [Required(ErrorMessage = "*")]
        public string City { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "Postal Code")]
        [RegularExpression(@"^[1-9]\d{4}$", ErrorMessage = " (Invalid postcode for Kosovo)")]
        public string PostalCode { get; set; }

        public decimal Total { get; set; }
    }
}