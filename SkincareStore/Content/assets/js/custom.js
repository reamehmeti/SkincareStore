// Hide loading overlay and show content when the window has fully loaded
window.addEventListener('load', function () {
    var loadingOverlay = document.getElementById('loading-overlay');
    var content = document.getElementById('content');

    loadingOverlay.style.display = 'none';
    content.style.display = 'block';
});

// Handles cookie consent by showing/hiding the banner based on local storage
$(document).ready(function () {
    if (!localStorage.getItem('cookiesAccepted')) {
        $('#cookieConsent').show();
    }

    $('#acceptCookies').click(function () {
        localStorage.setItem('cookiesAccepted', 'true');
        $('#cookieConsent').hide();
    });
});

// Handles the showing and hiding of the sidebar(hamburger menu)
$("a[id=showHamburgerMenu]").click(function (e) {
    e.preventDefault();

    $("#hamburgerMenu")
        .show()
        .removeClass("slide-left")
        .addClass("slide-right");

    $(".container-fluid").css("pointer-events", "none");
    $("html").css("overflow", "hidden");
});

$("#hideHamburgerMenu").click(function (e) {
    e.preventDefault();

    $("#hamburgerMenu")
        .removeClass("slide-right")
        .addClass("slide-left")
        .one('animationend', function () {
            $(this).hide();
        });

    $(".container-fluid").css("pointer-events", "all");
    $("html").css("overflow", "auto");
});

// Handles the showing and hiding of the brand filter sidebar
$("#showBrandFilterSidebar").click(function (e) {
    e.preventDefault();

    $("#brandFilterSidebar")
        .show()
        .removeClass("slide-down")
        .addClass("slide-up");

    $(".container-fluid").css("pointer-events", "none");
    $("html").css("overflow", "hidden");
});

$("#hideBrandFilterSidebar").click(function (e) {
    e.preventDefault();

    $("#brandFilterSidebar")
        .removeClass("slide-up")
        .addClass("slide-down")
        .one('animationend', function () {
            $(this).hide();
        });

    $(".container-fluid").css("pointer-events", "all");
    $("html").css("overflow", "auto");
});

// Retrieve product elements and update star icons based on product ratings
const products = document.querySelectorAll('#productItem');

products.forEach(product => {
    const rating = parseFloat(product.getAttribute('data-rating'));
    const rating_int = parseInt(rating);
    const stars = product.querySelectorAll('.far.fa-star');

    for (let i = 0; i < rating_int; i++) {
        stars[i].removeAttribute('class');
        stars[i].setAttribute('class', 'fa fa-star');
    }

    if (rating % 1 !== 0) {
        stars[rating_int].removeAttribute('class');
        stars[rating_int].setAttribute('class', 'fa fa-star-half-alt');
    }
});

// Handles favoriting functionality for products
var favoritesBadgeElement = document.querySelector('.badge.badge-favorites');
var favoritesCount = parseInt(favoritesBadgeElement.textContent);

document.querySelectorAll('.favorite-form').forEach(form => {
    form.addEventListener('click', function () {
        var heart = form.querySelector('.fa-heart');
        var isFavorite = heart.classList.contains('fas');

        if (isFavorite) {
            heart.classList.remove('favorite-animation', 'text-primary');
            favoritesCount--;
        } else {
            heart.classList.add('favorite-animation');
            favoritesCount++;
        }

        heart.classList.toggle('far');
        heart.classList.toggle('fas');

        favoritesBadgeElement.textContent = favoritesCount;

        var formData = new FormData(form);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', form.action, true);
        xhr.onerror = function () {
            console.error('Request failed. Status: ' + xhr.status);
            showPopup(false, 'Oops! Something went wrong.', 'There was a problem processing your request. Please try again.', '');
        };
        xhr.send(formData);
    });
});

// Home Page Region Start --> Functions to update brand information on the webpage based on user interactions
var brand_history = document.querySelector('#brandHistory');
var brand_img = brand_history ? brand_history.querySelector('img') : null;
var brand_info = brand_history ? brand_history.querySelector('div') : null;

function callback() {
    brand_img.classList.remove('fade-left-animation');
    brand_info.classList.remove('fade-up-animation');
}

if (brand_img && brand_info) {
    brand_img.addEventListener("animationend", callback, false);
    brand_info.addEventListener("animationend", callback, false);
}

function updateBrandSelection(name) {
    var brands = document.querySelectorAll('#brandNavigation a');

    brand_img.classList.add("fade-left-animation");
    brand_info.classList.add("fade-up-animation");

    brands.forEach(brand => {
        brand.classList.remove("text-muted");
        brand.style.pointerEvents = "all";
        brand.style.fontSize = "16px";

        if (brand.innerHTML === name) {
            brand.classList.add("text-muted");
            brand.style.pointerEvents = "none";
            brand.style.fontSize = "17px";
        }
    });
}

function ShowBeautyOfJoseon() {
    updateBrandSelection("Beauty of Joseon");
    brand_img.src = "/Content/assets/img/beauty-of-joseon.jpg";
    brand_history.querySelector("h5").innerHTML = "Beauty of Joseon";
    brand_history.querySelector("p").innerHTML = "Inspired to create a skincare line blending ancient Korean beauty rituals with modern technology, Beauty of Joseon was established by Sumin Lee. Drawing from the Joseon Dynasty, which ruled Korea from the late 14th to late 19th century, she created skincare products focusing on natural ingredients and gentle formulas.";
}

function ShowInnisfree() {
    updateBrandSelection("Innisfree");
    brand_img.src = "/Content/assets/img/innisfree.jpg";
    brand_history.querySelector("h5").innerHTML = "Innisfree";
    brand_history.querySelector("p").innerHTML = "Innisfree was launched by the largest skincare and cosmetics company in South Korea, Amore Pacific, in 2000 and was marketed as the manufacturer's first eco-friendly brand. The brand name originates from W. B. Yeats' poem, 'The Lake Isle of Innisfree'. Innisfree is South Korea's first all-natural brand, and many of the products' ingredients are sourced from Jeju Island.";
}

function ShowCosrx() {
    updateBrandSelection("Cosrx");
    brand_img.src = "/Content/assets/img/cosrx.jpg";
    brand_history.querySelector("h5").innerHTML = "Cosrx";
    brand_history.querySelector("p").innerHTML = "Cosrx, a Korean cosmetics brand, is often associated with Clean Beauty due to its products being free from potentially harmful substances like dyes and fragrances. Founded in 2013 to meet customer needs, Cosrx prioritizes customer feedback and offers gentle, non-irritating formulations with minimal ingredients. All Cosrx products are made in South Korea and cruelty-free.";
}

function ShowAromatica() {
    updateBrandSelection("Aromatica");
    brand_img.src = "/Content/assets/img/aromatica.jpg";
    brand_history.querySelector("h5").innerHTML = "Aromatica";
    brand_history.querySelector("p").innerHTML = "AROMATICA is a holistic Korean beauty brand harnessing the potency of essential botanical therapy to enhance your true beauty. Their effective, sustainable, cruelty-free, and vegan-friendly products come in eco-friendly packaging to reduce waste. Crafted from natural ingredients, AROMATICA products are beneficial for both the skin and the planet!";
}

function ShowPurito() {
    updateBrandSelection("Purito");
    brand_img.src = "/Content/assets/img/purito.png";
    brand_history.querySelector("h5").innerHTML = "Purito";
    brand_history.querySelector("p").innerHTML = 'Purito is a Korean brand that comes from the combination of the word "purity" which means "purity" and "to" which means "earth". The mission of the brand is the selection of natural and safe ingredients for the skin. In the product formulations, you will not find harmful ingredients and substances. Purito is against animal cruelty and has ecological packaging.';
}

function ShowRoundLab() {
    updateBrandSelection("Round Lab");
    brand_img.src = "/Content/assets/img/round-lab.jpg";
    brand_history.querySelector("h5").innerHTML = "Round Lab";
    brand_history.querySelector("p").innerHTML = "Round Lab's philosophy revolves around harnessing the power of clean and natural ingredients. The brand's products are meticulously formulated to provide your skin with the essentials it craves, without overwhelming it with harsh chemicals. Round Lab's offerings are like a breath of fresh air for your skin, promoting its innate vitality.";
}
// Home Page Region End

// Product List Region Start
$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var brand = urlParams.get('brand');
    var category = urlParams.get('category');
    var sort_by = urlParams.get('sort_by');
    var page = 1;
    if (urlParams.get('page') !== null && urlParams.get('page') !== '' && !isNaN(urlParams.get('page')) && Number.isInteger(Number(urlParams.get('page')))) {
        page = parseInt(urlParams.get('page'));
    }
    var search = urlParams.get('search');

    // Handles filtering based on brand
    if (brand) {
        var brandIds = brand.split(',');
        brandIds.forEach(function (brandId) {
            $('input[id=brand-' + brandId + ']').prop('checked', true);
        });
    }

    $('.brand-checkbox').change(function () {
        var selectedBrands = [];

        $('.brand-checkbox:checked').each(function () {
            var brandValue = $(this).val();
            if (!selectedBrands.includes(brandValue)) {
                selectedBrands.push(brandValue);
            }
        });

        if (!$(this).is(':checked')) {
            var brandValue = $(this).val();
            const index = selectedBrands.indexOf(brandValue);
            if (index > -1) {
                selectedBrands.splice(index, 1);
            }
        }

        var url = '/Products';

        if (category) {
            url += '?category=' + category;
        }

        if (search) {
            url += '?search=' + search;
        }

        if (selectedBrands.length > 0) {
            var brandParam = 'brand=' + selectedBrands.join(',');
            if (url.includes('?')) {
                url += '&' + brandParam;
            } else {
                url += '?' + brandParam;
            }
        }

        if (sort_by) {
            if (url.includes('?')) {
                url += '&sort_by=' + sort_by;
            } else {
                url += '?sort_by=' + sort_by;
            }
        }

        window.location.href = url;
    });

    // Handles sorting
    $('.sort-by').click(function () {
        var url = '/Products';

        if (category) {
            url += '?category=' + category;
        }

        if (search) {
            url += '?search=' + search;
        }

        if (brand) {
            if (url.includes('?')) {
                url += '&brand=' + brand;
            } else {
                url += '?brand=' + brand;
            }
        }

        if (url.includes('?')) {
            url += '&sort_by=' + $(this).attr('id');
        } else {
            url += '?sort_by=' + $(this).attr('id');
        }

        $(this).attr('href', url);
    });

    // Handles pagination
    $('.page-link').click(function () {
        var url = '/Products';

        if (category) {
            url += '?category=' + category;
        }

        if (search) {
            url += '?search=' + search;
        }

        if (brand) {
            if (url.includes('?')) {
                url += '&brand=' + brand;
            } else {
                url += '?brand=' + brand;
            }
        }

        if (sort_by) {
            if (url.includes('?')) {
                url += '&sort_by=' + sort_by;
            } else {
                url += '?sort_by=' + sort_by;
            }
        }

        if ($(this).hasClass('previous')) {
            if (url.includes('?')) {
                url += '&page=' + (page - 1);
            } else {
                url += '?page=' + (page - 1);
            }
        }
        else if ($(this).hasClass('next')) {
            if (url.includes('?')) {
                url += '&page=' + (page + 1);
            } else {
                url += '?page=' + (page + 1);
            }
        }
        else {
            if (url.includes('?')) {
                url += '&page=' + $(this).text();
            } else {
                url += '?page=' + $(this).text();
            }
        }
        $(this).attr('href', url);
    });

    $('.page-links').eq(0).addClass('active').css('pointer-events', 'none');
    $('#previous').addClass('disabled');

    if ($('.page-links').length === 1) {
        $('#next').addClass('disabled');
    }

    if (parseInt(page) > 1) {
        $('.page-links').eq(0).removeClass('active').css('pointer-events', 'all');
        $('#previous').removeClass('disabled');
        $('.page-links').eq(parseInt(page) - 1).addClass('active').css('pointer-events', 'none');

        if (page == $('.page-links').length) {
            $('#next').addClass('disabled');
        }
    }

    const pagination = $('.pagination');
    const numPages = pagination.find('.page-links').length;

    if (numPages > 5) {
        const activePageIndex = pagination.find('.page-links.active').index();
        let startPageIndex, endPageIndex;

        if (activePageIndex <= 2) {
            startPageIndex = 0;
            endPageIndex = Math.min(4, numPages - 1);
        } else if (activePageIndex >= numPages - 3) {
            endPageIndex = numPages - 1;
            startPageIndex = Math.max(0, endPageIndex - 4);
        } else {
            startPageIndex = activePageIndex - 2;
            endPageIndex = activePageIndex + 2;
        }

        pagination.find('.page-links').hide().slice(startPageIndex, endPageIndex + 1).show();

        pagination.find('.page-links').eq(0).show();
        pagination.find('.page-links').eq(numPages - 1).show();

        if (startPageIndex > 1) {
            pagination.find('.page-links').eq(1).after('<li class="page-item disabled"><span class="page-link">...</span></li>');
        }
        if (endPageIndex < numPages - 2) {
            pagination.find('.page-links').eq(endPageIndex).after('<li class="page-item disabled"><span class="page-link">...</span></li>');
        }

        pagination.on('click', '.page-link', function () {
            const currentPage = parseInt($(this).text());

            if (!isNaN(currentPage)) {
                pagination.find('.page-links').eq(currentPage - 1).show();
            }
        });

        pagination.find('.page-links.active').show();
    } else {
        pagination.find('.page-links').show();
    }

    // Script to toggle product view between expanded and compressed states
    function toggleProductView(state) {
        if (state === 'expand') {
            $('.product-items').each(function () {
                $(this).removeClass('col-lg-4 col-md-6 col-12').addClass('col-lg-3 col-md-4 col-6');
            });
            $('#expand').addClass('text-primary').css({ 'font-size': '21px', 'pointer-events': 'none' });
            $('#compress').removeClass('text-primary').css({ 'font-size': '19px', 'pointer-events': 'all' });
        } else {
            $('.product-items').each(function () {
                $(this).removeClass('col-lg-3 col-md-4 col-6').addClass('col-lg-4 col-md-6 col-12');
            });
            $('#compress').addClass('text-primary').css({ 'font-size': '21px', 'pointer-events': 'none' });
            $('#expand').removeClass('text-primary').css({ 'font-size': '19px', 'pointer-events': 'auto' });
        }
    }

    $('#expand').click(function () {
        toggleProductView('expand');
        localStorage.setItem('productViewState', 'expand');
    });

    $('#compress').click(function () {
        toggleProductView('compress');
        localStorage.setItem('productViewState', 'compress');
    });

    var storedState = localStorage.getItem('productViewState');
    if (storedState) {
        toggleProductView(storedState);
    }
    else {
        toggleProductView('expand');
    }
});
// Product List Region End

// Product Details Region Start
$('.carousel-item').eq(0).addClass('active');

if ($('#productItem').data('quantity') == 0) {
    $('.input-quantity').prop('disabled', true);
    $('#addToCart').prop('disabled', true);
    $('#product-carousel').find('img').css('opacity', '0.5');
}

$('#PurchaseQuantity').on('input', function () {
    $(this).val($(this).val().replace(/\D/g, ''));

    if (parseInt($(this).val()) < 0) {
        $(this).val('1');
    }
});

$('#PurchaseQuantity').on('blur', function () {
    if ($(this).val() === '' || parseInt($(this).val()) < 1) {
        $(this).val('1');
    }
});

$('#PurchaseQuantity').on('keypress', function (event) {
    if (event.which === 13) {
        event.preventDefault();
    }
});

var cartBadgeElement = $('.badge.badge-cart');
var cartQuantityTotal = +(cartBadgeElement.text());

$('.add-to-cart').on('click', function () {
    var form = $(this).closest('form');
    var formData = form.serialize();
    $.ajax({
        url: form.attr('action'),
        type: 'POST',
        processData: false,
        data: formData,
        success: function () {
            var purchaseQuantity = +$('#PurchaseQuantity').val() || 1;
            var currentCartQuantity = +form.find('#CartQuantity').val();
            var maxQuantity = +form.closest('#productItem').attr('data-quantity');
            form.find('#CartQuantity').val(Math.min(currentCartQuantity + purchaseQuantity, maxQuantity));

            var bannerType, message;

            if ((currentCartQuantity + purchaseQuantity) > maxQuantity) {
                bannerType = 'warning';
                message = 'The maximum purchase quantity for this product is ' + maxQuantity + '.';
                if (currentCartQuantity !== maxQuantity) {
                    cartQuantityTotal += maxQuantity - currentCartQuantity;
                    cartBadgeElement.text(cartQuantityTotal);
                }
            } else {
                bannerType = 'success';
                message = 'Product has been added to your cart.';
                cartQuantityTotal += purchaseQuantity;
                cartBadgeElement.text(cartQuantityTotal);
            }

            var newBanner = $('<div class="d-flex align-items-center col-10 col-sm-11 col-md-12 ' + bannerType + '-banner"><i class="fas fa-' + (bannerType === 'warning' ? 'exclamation-circle' : 'check-circle') + ' mr-3"></i><p class="m-0">' + message + '</p></div>');
            $('#alertsContainer').append(newBanner);
            newBanner.addClass('fade-in-out-animation');
            newBanner.on('animationend', function () {
                newBanner.remove();
            });
        },
        error: function (xhr) {
            console.error('Request failed. Status: ' + xhr.status);
            showPopup(false, 'Oops! Something went wrong.', 'There was a problem processing your request. Please try again.', '');
        }
    });
});
// Product Details Region End

// Favorites Region Start
var favorites = $('.favorite-items');
var loadMoreContainer = $('#loadMoreContainer');
var loadMoreButton = $('#loadMoreButton');
var loadingIndicator = $('#loadingIndicator');

if (favorites.length === 0) {
    $('#wishlistEmpty').removeClass('d-none');
    $('#favoritesHeaderSection').remove();
}

if (favorites.length === 1) {
    $('.navbar-nav').eq(0).css('height', '285.5px');
}

favorites.slice(6).addClass('d-none');

if (favorites.length <= 6) {
    loadMoreContainer.remove();
    loadingIndicator.remove();
}
adjustFavoritesBorder();

$('.unfavorite-form').each(function () {
    $(this).on('click', function () {
        favoritesCount--;
        $(favoritesBadgeElement).text(favoritesCount);

        $(this).closest('.row').remove();

        if (favorites.length > 0) {
            $('.favorite-items.d-none').first().removeClass('d-none');
        }
        adjustFavoritesBorder();

        if ($('.favorite-items.d-none').length === 0) {
            loadMoreContainer.remove();
            loadingIndicator.remove();
        }

        if ($('.favorite-items').length === 0) {
            $('#wishlistEmpty').removeClass('d-none').addClass('fade-in-animation');
            $('#favoritesHeaderSection').remove();
            $('.navbar-nav').eq(0).animate({ height: '449px' }, 350);
        }

        if ($('.favorite-items').length === 1) {
            $('.navbar-nav').eq(0).animate({ height: '285.5px' }, 350);
        }

        var formData = new FormData($(this)[0]);
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            processData: false,
            data: formData,
            error: function (xhr) {
                console.error('Request failed. Status: ' + xhr.status);
                showPopup(false, 'Oops! Something went wrong.', 'There was a problem processing your request. Please try again.', '');
            }
        });
    });
});

function loadMoreItems() {
    loadMoreButton.hide();
    loadingIndicator.show();

    setTimeout(function () {
        $('.favorite-items.d-none').slice(0, 6).removeClass('d-none');
        loadingIndicator.hide();

        if ($('.favorite-items.d-none').length > 0) {
            loadMoreButton.show();
        }
        else {
            loadMoreContainer.remove();
            loadingIndicator.remove();
        }
        adjustFavoritesBorder();
    }, 500);
}

function adjustFavoritesBorder() {
    $('.favorite-items:not(.d-none)').addClass('border-bottom');
    $('.favorite-items:not(.d-none)').last().removeClass('border-bottom');
}
// Favorites Region End

// Cart Region Start
if ($('tbody tr').length === 0) {
    $('.cart-container').remove();
    $('#shoppingCartEmpty').removeClass('d-none');
}

$('.manage-cart').each(function () {
    $(this).on('click', function () {
        var btn = $(this).find('button');
        var price = parseFloat($(this).closest('tr').find('td:nth-child(3)').text());
        var total = parseFloat($(this).closest('tr').find('td:nth-child(5)').text());
        var inputValue = parseInt($(this).closest('tr').find('span').text());
        var subtotal = parseFloat($('.card-body').find('h6:eq(1)').text());
        var totalQuantity = parseInt($(this).closest('tr').attr('data-quantity'));

        if (btn.hasClass('btn-minus')) {
            $(this).closest('tr').find('td:nth-child(5)').text((total - price).toFixed(2) + '€');
            $(this).closest('tr').find('span').text((index, oldValue) => parseInt(oldValue) - 1);
            cartQuantityTotal -= 1;
            cartBadgeElement.text(cartQuantityTotal);
            $('.card-body').find('h6:eq(1)').text((subtotal - price).toFixed(2) + '€');
            $('.card-footer').find('h6:eq(1)').text((subtotal - price).toFixed(2) + '€');
        }

        if (btn.hasClass('btn-plus')) {
            if (totalQuantity > parseInt(inputValue)) {
                $(this).closest('tr').find('td:nth-child(5)').text((total + price).toFixed(2) + '€');
                $(this).closest('tr').find('span').text((index, oldValue) => parseInt(oldValue) + 1);
                cartQuantityTotal += 1;
                cartBadgeElement.text(cartQuantityTotal);
                $('.card-body').find('h6:eq(1)').text((subtotal + price).toFixed(2) + '€');
                $('.card-footer').find('h6:eq(1)').text((subtotal + price).toFixed(2) + '€');
            }
            else {
                var message = 'The maximum purchase quantity for this product is ' + totalQuantity + '.';
                var newBanner = $('<div class="d-flex align-items-center col-10 col-sm-11 col-md-12 warning-banner"><i class="fas fa-exclamation-circle mr-3"></i><p class="m-0">' + message + '</p></div>');
                $('#alertsContainer').append(newBanner);
                newBanner.addClass('fade-in-out-animation');
                newBanner.on('animationend', function () {
                    newBanner.remove();
                });
            }
        }

        if ($(this).closest('tr').find('span').text() == '0') {
            $(this).closest('tr').remove();
        }

        if (btn.hasClass('btn-remove')) {
            $(this).closest('tr').remove();
            $('.card-body').find('h6:eq(1)').text((subtotal - total).toFixed(2) + '€');
            $('.card-footer').find('h6:eq(1)').text((subtotal - total).toFixed(2) + '€');
            cartQuantityTotal -= inputValue;
            cartBadgeElement.text(cartQuantityTotal);
        }

        if ($('tbody tr').length === 0) {
            $('.cart-container').remove();
            $('#shoppingCartEmpty').removeClass('d-none').addClass('fade-in-animation');
        }

        var formData = new FormData($(this)[0]);
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            processData: false,
            data: formData,
            error: function (xhr) {
                console.error('Request failed. Status: ' + xhr.status);
                showPopup(false, 'Oops! Something went wrong.', 'There was a problem processing your request. Please try again.', '');
            }
        });
    });
});
// Cart Region End

// Checkout Region Start
function toggleVisibility(buttonSelector, contentSelector, expandText, collapseText) {
    $(buttonSelector).on('click', function () {
        var content = $(contentSelector);
        var span = $(this).find('span');
        var icon = $(this).find('i');

        if (content.hasClass('hideable')) {
            content.slideDown('fast', function () {
                content.removeClass('hideable');
            });
            span.text(expandText);
            icon.removeClass('fa-angle-down').addClass('fa-angle-up');
        } else {
            content.slideUp('fast', function () {
                content.addClass('hideable');
            });
            span.text(collapseText);
            icon.removeClass('fa-angle-up').addClass('fa-angle-down');
        }
    });
}

toggleVisibility('#showOrderSummary', '#orderSummary', 'Hide order summary', 'Show order summary');
toggleVisibility('#showOrderTotal', '#orderTotal', 'Hide Items', 'Show Items');

$('.form-group').each(function () {
    var formGroup = $(this);
    var borderColor = formGroup.find('span.field-validation-error').length > 0 ? '1px solid #FFCCCC' : '';
    formGroup.find('.form-control').css('border', borderColor);
});

var phoneNumberInput = $('.form-control[name="PhoneNumber"]');

if (phoneNumberInput.length) {
    phoneNumberInput.on('blur', function () {
        $(this).val($(this).val().replace(/\s+/g, ''));
    });

    phoneNumberInput.on('keydown', function (event) {
        if (event.key === 'Enter') {
            $(this).val($(this).val().replace(/\s+/g, ''));
        }
    });
}

$('#placeOrder').on('click', function (event) {
    $(this).prop('disabled', true);
    var form = $('#checkoutForm');
    var formData = new FormData(form[0]);

    $.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.success) {
                showPopup(true, 'Your order has been received!', 'Thanks for your purchase! A confirmation email will be sent shortly.', '/Home/Index');
            }
            else if (response.modified) {
                showPopup(false, 'Sorry, some cart items have been purchased!', 'Please take a moment to review your cart before proceeding.', '/Products/Cart');
            }
            else {
                form.submit();
            }
        },
        error: function (xhr) {
            console.error('Request failed. Status: ' + xhr.status);
            showPopup(false, 'Oops! Something went wrong.', 'There was a problem processing your request. Please try again.', '');
            $('#placeOrder').prop('disabled', false);
        }
    });
});
// Checkout Region End

// Search Region Start
$(document).ready(function () {
    var typingTimer;
    var doneTypingInterval = 500;
    var cache = {};

    let isMouseOverResults = false;

    $('#searchResults').on('mouseenter', function () {
        isMouseOverResults = true;
    }).on('mouseleave', function () {
        isMouseOverResults = false;
    });

    $('#searchInput').on('focus', function () {
        $("#searchResults").show();
        $("#overlay").show();
    });

    $('#searchInput').on('blur', function () {
        if (!isMouseOverResults) {
            $('#searchResults').hide();
            $("#overlay").hide();
        }
    });

    $('#searchInput').on('input', function () {
        clearTimeout(typingTimer);

        typingTimer = setTimeout(function () {
            performSearch();
        }, doneTypingInterval);
    });

    $('#searchInput').on('keydown', function (e) {
        if (e.which === 13) {
            e.preventDefault();

            var inputValue = $('#searchInput').val().trim();
            if (inputValue.length > 2) {
                window.location.href = '/Products?search=' + inputValue;
            }
        }
    });

    $('#searchButton').click(function (e) {
        e.preventDefault();

        var inputValue = $('#searchInput').val().trim();
        if (inputValue.length > 2) {
            window.location.href = '/Products?search=' + inputValue;
        }
    });

    function performSearch() {
        var inputValue = $('#searchInput').val().trim();

        if (inputValue.length > 2) {
            if (cache[inputValue]) {
                $('#searchResults').html(cache[inputValue]);
            } else {
                $.ajax({
                    url: '/Products/Search',
                    type: 'GET',
                    data: { search: inputValue },
                    success: function (data) {
                        $('#searchResults').html(data);
                        cache[inputValue] = data;
                    },
                    error: function (xhr) {
                        console.error('Request failed. Status: ' + xhr.status);
                    }
                });
            }
        }
        else {
            $('#searchResults').empty();
        }
    }
});
// Search Region End

// Contact Region Start
$('#sendMessage').on('click', function (event) {
    var form = $('#contactUsForm');
    var formData = new FormData(form[0]);

    $.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.success) {
                showPopup(true, 'Your message has been received!', 'Thank you for reaching out! We will get back to you shortly.', '/Home/Contact');
            }
            else {
                form.submit();
            }
        },
        error: function (xhr) {
            console.error('Request failed. Status: ' + xhr.status);
            showPopup(false, 'Oops! Something went wrong.', 'There was a problem processing your request. Please try again.', '');
        }
    });
});
// Contact Region End

// Function to create and show the popup
function showPopup(isSuccess, topMessage, bottomMessage, redirectUrl) {
    const $overlay = $('<div>', { id: 'popupOverlay' })
        .css({
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '1000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: '0',
            transition: 'opacity 0.5s ease'
        });

    const $popupContent = $('<div>')
        .css({
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            padding: '20px',
            textAlign: 'center',
            maxWidth: '500px',
            width: '90%',
            position: 'relative',
            transform: 'scale(0.9)',
            transition: 'transform 0.3s ease, opacity 0.5s ease'
        });

    const $closeButton = $('<span>', { text: '×' })
        .css({
            position: 'absolute',
            top: '10px',
            right: '15px',
            color: '#333',
            fontSize: '24px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'color 0.3s ease'
        })
        .on('click', function () {
            $overlay.css('opacity', '0');
            $popupContent.css('transform', 'scale(0.9)');
            setTimeout(() => {
                $overlay.remove();
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                }
            }, 300);
        });

    const $icon = $('<div>')
        .text(isSuccess ? '✔' : '!')
        .css({
            borderRadius: '50%',
            backgroundColor: isSuccess ? '#80E0A8' : '#F77F7F',
            color: '#fff',
            width: '60px',
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '36px',
            fontWeight: 'bold',
            margin: '0 auto'
        });

    const $topMessageElem = $('<p>', { text: topMessage })
        .css({
            fontSize: '18px',
            color: '#333',
            margin: '20px 0 10px'
        });

    const $bottomMessageElem = $('<p>', { text: bottomMessage })
        .css({
            fontSize: '16px',
            color: '#666',
            margin: '10px 0 0'
        });

    $popupContent.append($closeButton, $icon, $topMessageElem, $bottomMessageElem);
    $overlay.append($popupContent);
    $('body').append($overlay);

    setTimeout(() => {
        $overlay.css('opacity', '1');
        $popupContent.css('transform', 'scale(1)');
    }, 10);
}