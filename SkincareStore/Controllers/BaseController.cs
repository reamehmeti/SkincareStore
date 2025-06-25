using SkincareStore.Models;
using SkincareStore.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace SkincareStore.Controllers
{
    public class BaseController : Controller
    {
        public ProductServices services = new ProductServices();

        public string GetUserIdentifier()
        {
            HttpCookie cookie = Request.Cookies["UserIdentifier"];

            string identifier = null;

            if (cookie != null)
            {
                identifier = cookie.Value;
            }
            else
            {
                identifier = Guid.NewGuid().ToString();
                cookie = new HttpCookie("UserIdentifier", identifier);
                cookie.Expires = DateTime.Now.AddDays(365);
                Response.Cookies.Add(cookie);
            }

            return identifier;
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            ViewBag.Favorites = services.GetFavoritesByUser(GetUserIdentifier()).Rows.Count;
            ViewBag.CartQuantityTotal = services.GetCartSummary(GetUserIdentifier()).Rows[0]["Quantity"];
            base.OnActionExecuting(filterContext);
        }

        public void LoadShoppingCartData()
        {
            ViewBag.ShoppingCart = services.GetShoppingCart(GetUserIdentifier());
            ViewBag.CartSummary = services.GetCartSummary(GetUserIdentifier()).Rows[0]["Total"];
        }

        public string CreateOrderConfirmationEmail(DataTable table, Address address, int orderNumber)
        {
            var htmlBuilder = new StringBuilder();

            // Start HTML
            htmlBuilder.Append("<html><body style='max-width:600px; font-family:Arial, sans-serif'>");
            htmlBuilder.Append("<div style='height:auto'>");

            // Header
            htmlBuilder.Append("<div style='background-color:#F4A7B9; height:80px; display:flex'>");
            htmlBuilder.Append("<h3 style='color:white; margin:auto'>Thank you for your order!</h3>");
            htmlBuilder.Append("</div>");

            // Order details
            htmlBuilder.Append($"<h4 style='color:#777'>Hi {address.FirstName}, your order has been received and is now being processed. The order details are shown below for your reference:</h4>");
            htmlBuilder.Append($"<h3 style='color:#F4A7B9'>Order #{orderNumber} ({DateTime.Now:MMMM} {DateTime.Now.Day}, {DateTime.Now.Year})</h3>");

            // Address details
            htmlBuilder.Append("<div style='border:2px solid #f7f7f7; border-radius:8px; font-style:italic; padding-left:15px; margin-bottom:20px'>");
            htmlBuilder.Append($"<p style='color:#333'>{address.FirstName} {address.LastName}</p>");
            htmlBuilder.Append($"<p style='color:#333'>{address.Email}</p>");
            htmlBuilder.Append($"<p style='color:#333'>{address.PhoneNumber}</p>");
            htmlBuilder.Append($"<p style='color:#333'>{address.AddressLine1}</p>");
            htmlBuilder.Append($"<p style='color:#333'>{address.AddressLine2}</p>");
            htmlBuilder.Append($"<p style='color:#333'>{address.City}, {address.PostalCode}, {address.Country}</p>");
            htmlBuilder.Append("</div>");

            // DataTable to HTML
            htmlBuilder.Append("<table style='border-collapse:collapse; width:100%; color:#333; border-radius:8px; margin-bottom:30px; overflow:hidden'>");
            htmlBuilder.Append("<thead style='background-color:#f7f7f7'>");
            htmlBuilder.Append("<tr>");
            for (int i = 0; i < table.Columns.Count; i++)
            {
                DataColumn column = table.Columns[i];
                string textAlign = (i == 0) ? "left" : "center";
                htmlBuilder.Append($"<th style='padding:12px 15px; text-align:{textAlign}'>{column.ColumnName}</th>");
            }
            htmlBuilder.Append("</tr>");
            htmlBuilder.Append("</thead>");
            htmlBuilder.Append("<tbody>");
            for (int i = 0; i < table.Rows.Count - 1; i++)
            {
                DataRow row = table.Rows[i];
                htmlBuilder.Append("<tr>");
                int columnIndex = 0;
                foreach (var item in row.ItemArray)
                {
                    string textAlign = (columnIndex == 0) ? "left" : "center";
                    htmlBuilder.Append($"<td style='padding:12px 15px; text-align:{textAlign}'>{item}</td>");
                    columnIndex++;
                }
                htmlBuilder.Append("</tr>");
            }
            htmlBuilder.Append("</tbody>");
            DataRow lastRow = table.Rows[table.Rows.Count - 1];
            string total = lastRow.ItemArray[lastRow.ItemArray.Length - 1].ToString();
            htmlBuilder.Append("<tfoot style='background-color:#f7f7f7; font-weight:bold'>");
            htmlBuilder.Append($"<tr><td colspan='2' style='padding:12px 15px; text-align:left'>Subtotal:</td><td colspan='1' style='padding:12px 15px; text-align:center'>{total}</td></tr>");
            htmlBuilder.Append("<tr><td colspan='2' style='padding:12px 15px; text-align:left'>Shipping:</td><td colspan='1' style='padding:12px 15px; text-align:center'>€0.00</td></tr>");
            htmlBuilder.Append("<tr><td colspan='1' style='padding:12px 15px; text-align:left'>Payment Method:</td><td colspan='2' style='padding:12px 15px; text-align:center'>Cash on Delivery (COD)</td></tr>");
            htmlBuilder.Append($"<tr><td colspan='2' style='padding:12px 15px; text-align:left'>Total:</td><td colspan='1' style='padding:12px 15px; text-align:center'>{total}</td></tr>");
            htmlBuilder.Append("</tfoot>");
            htmlBuilder.Append("</table>");

            // Footer
            htmlBuilder.Append("<hr></hr>");
            htmlBuilder.Append("<p style='color:#777'>If you have any questions, need further clarification, or require additional information, please reply to this email.</p>");

            // Close HTML
            htmlBuilder.Append("</div>");
            htmlBuilder.Append("</body></html>");

            return htmlBuilder.ToString();
        }
    }
}