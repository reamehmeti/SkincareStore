using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SkincareStore.Models
{
    public class Product
    {
        public int ProductID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Category { get; set; }

        [Required]
        public int Brand { get; set; }

        [DataType(DataType.MultilineText)]
        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public decimal Rating { get; set; }

        [Required]
        public int Quantity { get; set; }

        public string BrandName { get; set; }

        public bool Favorited { get; set; }

        public int CartQuantity { get; set; }

        public int PurchaseQuantity { get; set; } = 1;
    }
}