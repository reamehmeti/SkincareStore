using SkincareStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SkincareStore.Controllers
{
    [OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            ViewBag.NewProducts = services.GetNewProducts(GetUserIdentifier());
            ViewBag.TopRatedProducts = services.GetTopRatedProducts(GetUserIdentifier());
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Contact(Contact contact)
        {
            if (ModelState.IsValid)
            {
                return Json(new
                {
                    success = true
                });
            }
            return View();
        }

        public ActionResult Error()
        {
            return View();
        }
    }
}