using SkincareStore.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SkincareStore.Controllers
{
    [OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
    public class ProductsController : BaseController
    {
        public ActionResult Index(string category, string brand, string sort_by, string page, string search)
        {
            ViewBag.Brands = services.GetAllBrands(category, search);
            ViewBag.Products = services.GetAllProducts(GetUserIdentifier(), category, brand, sort_by, page, search);
            return View();
        }

        public ActionResult Details(int id)
        {
            Product obj = new Product();
            ViewBag.Pictures = services.GetAllProductPictures(id);

            foreach (DataRow dr in services.GetProductById(id, GetUserIdentifier()).Rows)
            {
                obj.ProductID = id;
                obj.Name = dr["Name"].ToString();
                obj.Category = int.Parse(dr["Category"].ToString());
                obj.Brand = int.Parse(dr["Brand"].ToString());
                obj.Description = dr["Description"].ToString();
                obj.Price = decimal.Parse(dr["Price"].ToString());
                obj.Rating = decimal.Parse(dr["Rating"].ToString());
                obj.Quantity = int.Parse(dr["Quantity"].ToString());
                obj.BrandName = dr["BrandName"].ToString();
                obj.Favorited = bool.Parse(dr["Favorited"].ToString());
                obj.CartQuantity = int.Parse(dr["CartQuantity"].ToString());
            }

            ViewBag.SimilarProducts = services.GetSimilarProducts(id, GetUserIdentifier());

            if (services.GetProductById(id, GetUserIdentifier()).Rows.Count == 0)
            {
                return RedirectToAction("Error", "Home");
            }

            return View(obj);
        }

        public ActionResult Favorite(string sort_by)
        {
            ViewBag.FavoriteProducts = services.GetFavoritesByUser(GetUserIdentifier(), sort_by);
            return View();
        }

        [HttpPost]
        public ActionResult Favorite(int product)
        {
            services.Favorite(GetUserIdentifier(), product);
            return RedirectToAction("Favorite");
        }

        public ActionResult Cart()
        {
            LoadShoppingCartData();
            return View();
        }

        [HttpPost]
        public ActionResult Cart(Product obj = null, int id = 0, int quantity = 1)
        {
            if (obj.ProductID == 0)
            {
                services.AddToCart(GetUserIdentifier(), id, quantity);
                return RedirectToAction("Cart");
            }
            else
            {
                services.AddToCart(GetUserIdentifier(), obj.ProductID, obj.PurchaseQuantity);
                return RedirectToAction("Cart");
            }
        }

        public ActionResult Checkout()
        {
            LoadShoppingCartData();
            return View();
        }

        [HttpPost]
        public ActionResult Checkout(Address address)
        {
            LoadShoppingCartData();
            Random rnd = new Random();
            int orderNumber = rnd.Next(100000, 1000000);
            if (ModelState.IsValid)
            {
                if (address.Total != (decimal)services.GetCartSummary(GetUserIdentifier()).Rows[0]["Total"])
                {
                    return Json(new
                    {
                        modified = true
                    });
                }
                else
                {
                    services.SendEmail(address.Email, $"Order #{orderNumber} confirmed", CreateOrderConfirmationEmail(services.GetCartEmailFormat(GetUserIdentifier()), address, orderNumber));
                    services.PlaceOrder(GetUserIdentifier());
                }
                return Json(new
                {
                    success = true
                });
            }
            return View();
        }

        public ActionResult Search(string search)
        {
            return View("_SearchResultsPartial", services.GetSearchResults(search));
        }
    }
}