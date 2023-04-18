export async function onRequest({ context, env, request  }) {
  try {
    console.log("I'm alive")
    console.log("There's a request.")
    console.log("I want to get to the bottom of this. ")

    
		let input = await request.formData();
    // console.log(input)
    let keyword = input.get("keyword")
    console.log("keyword is: " + keyword)
       
    //learn how to patch pages to kv
    // const allKeys = await env.marketplace.get("available:T01C79S2HKP:U01JP332EP7:1616534585127")
    const allKeys = (await env.marketplace.list({"prefix": "available:"})).keys
    let availables = JSON.parse(await env.marketplace.get("availables"))




    async function search(keyword) {
      var foundKeys = 0
      var i = 0
      var searchResults = []
      for (i = 0; i < availables.length; i++) {
        //console.log(i)
        const values = availables[i].value
        //console.log("values: " + values)
        if (values && values.toLowerCase().includes(keyword.toLowerCase())) {
          foundKeys = foundKeys + 1
          console.log("matching values: " + values)
          //split the key so we know the seller team and userID
          const item_owner_user_id = availables[i].key.split(":")[4]
          const itemPlatform = availables[i].key.split(":")[2]
          const price = values.split("for $")[1]
          const timestamp = availables[i].key.split(":")[5]
          const date = new Date(timestamp);
          const year = date.getFullYear();
          const month = ("0" + (date.getMonth() + 1)).slice(-2);
          const day = ("0" + date.getDate()).slice(-2);
          const formattedDate = `${year}${month}${day}`;
          //allKeys[i] is something like: "available:discord:T151XMC12:U1VALTVUY:1610241853179"
          //split 0 is available
          //split1 is discord
          //split 2 is team, split 3 is user
          //use sections[1] + sections[2] down instead of team_id and user_id below
          let object = {
            "title" : values,
            "owner" : item_owner_user_id,
            "price" : price,
            "platform" : itemPlatform,
            "time" : formattedDate
          }
          searchResults.push(object)
          // searchResults = searchResults +`${searchResults} \n ${values} from <@${item_owner_user_id}>`
          // console.log(searchResults)
        } 
      }
      console.log(searchResults)
      if (searchResults.length == 0) {
        console.log("nothing found")
        return new Response("Nothing found")
      }
      return searchResults
    }

    console.log("---i guess ill see this before the rest")
    console.time("search keyword function starts")
    let searcheResults = await search(keyword)
    console.timeEnd("search ended")
    console.log(searcheResults)
    console.log(JSON.stringify(searcheResults))

    let cards = [`<div class="item">
    <div class="ribbon-diagonal">
        <div class="ribbon-diagonal__inner">
            <span>Sold</span>
        </div>
    </div>
    <div class="ribbon-featured">Featured</div>
    <!--end ribbon-->
    <div class="wrapper">
        <div class="image">
            <h3>
                <a href="#" class="tag category">Home & Decor</a>
                <a href="single-listing-1.html" class="title">Furniture for sale</a>
                <span class="tag">Offer</span>
            </h3>
            <a href="single-listing-1.html" class="image-wrapper background-image">
                <img src="assets/img/image-01.jpg" alt="">
            </a>
        </div>
        <!--end image-->
        <h4 class="location">
            <a href="#">Manhattan, NY</a>
        </h4>
        <div class="price">$80</div>
        <div class="meta">
            <figure>
                <i class="fa fa-calendar-o"></i>02.05.2017
            </figure>
            <figure>
                <a href="#">
                    <i class="fa fa-user"></i>Jane Doe
                </a>
            </figure>
        </div>
        <!--end meta-->
        <div class="description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis</p>
        </div>
        <!--end description-->
        <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
    </div>
</div>
<!--end item-->`]

    searcheResults.forEach((item) => {
        console.log(item.title)
        console.log(item.owner)
        cards.push(`<div class="item">
                  <div class="wrapper">
                      <div class="image">
                          <h3>
                              <a href="#" class="tag category">For Sale</a>
                              <a href="single-listing-1.html" class="title">${item.title}</a>
                              <span class="tag">Ad</span>
                          </h3>
                          <a href="single-listing-1.html" class="image-wrapper background-image">
                              <img src="assets/img/image-03.jpg" alt="">
                          </a>
                      </div>
                      <!--end image-->
                      <h4 class="location">
                          <a href="#">${item.platform}</a>
                      </h4>
                      <div class="price">${item.price}</div>
                      <div class="meta">
                          <figure>
                              <i class="fa fa-calendar-o"></i>${item.time}
                          </figure>
                          <figure>
                              <a href="#">
                                  <i class="fa fa-user"></i>${item.user}
                              </a>
                          </figure>
                      </div>
                      <!--end meta-->
                      <div class="description">
                          <p>Nam eget ullamcorper massa. Morbi fringilla lectus nec lorem tristique gravida</p>
                      </div>
                      <!--end description-->
                      <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                  </div>
              </div>
              <!--end item-->`)
    });


    let html = `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="author" content="ThemeStarz">
    
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Varela+Round" rel="stylesheet">
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.css" type="text/css">
        <link rel="stylesheet" href="/assets/fonts/font-awesome.css" type="text/css">
        <link rel="stylesheet" href="/assets/css/selectize.css" type="text/css">
        <link rel="stylesheet" href="/assets/css/style.css">
        <link rel="stylesheet" href="/assets/css/user.css">
    
      <title>Craigs - Easy Buy & Sell Listing HTML Template</title>
    
    </head>
    <body>
    <div class="page home-page">
        <!--*********************************************************************************************************-->
        <!--************ HERO ***************************************************************************************-->
        <!--*********************************************************************************************************-->
        <header class="hero">
            <div class="hero-wrapper">
                <!--============ Secondary Navigation ===============================================================-->
                <div class="secondary-navigation">
                    <div class="container">
                        <ul class="left">
                            <li>
                                <span>
                                    <i class="fa fa-phone"></i> +1 260 7865526
                                </span>
                            </li>
                        </ul>
                        <!--end left-->
                        <ul class="right">
                            <li>
                                <a href="#">
                                    <i class="fa fa-heart"></i>My Ads
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa fa-sign-in"></i>Sign In
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa fa-pencil-square-o"></i>Register
                                </a>
                            </li>
                        </ul>
                        <!--end right-->
                    </div>
                    <!--end container-->
                </div>
                <!--============ End Secondary Navigation ===========================================================-->
                <!--============ Main Navigation ====================================================================-->
                <div class="main-navigation">
                    <div class="container">
                        <nav class="navbar navbar-expand-lg navbar-light justify-content-between">
                            <a class="navbar-brand" href="index.html">
                                <img src="assets/img/marketplacelogo.png" alt="">
                            </a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar"
                                aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbar">
                                <!--Main navigation list-->
                                <ul class="navbar-nav">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="#">Home</a>
                                    </li>
                                    <li class="nav-item has-child">
                                        <a class="nav-link" href="support">Support</a>
                                        <!--1st level -->
                                        <ul class="child">
                                            <li class="nav-item">
                                                <a href="privacy-policy" class="nav-link">Privacy Policy</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="terms-and-conditions" class="nav-link">Terms &
                                                    Conditions</a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="contact">Contact</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="https://slack.com/oauth/v2/authorize?client_id=39065726036.1542208008273&scope=commands,incoming-webhook&user_scope="
                                            class="btn btn-primary text-caps btn-rounded btn-framed">Add to Slack</a>
                                    </li>
                                </ul>
                                <!--Main navigation list-->
                            </div>
                            <!--end navbar-collapse-->
                        </nav>
                        <!--end navbar-->
                    </div>
                    <!--end container-->
                </div>
                <!--============ End Main Navigation ================================================================-->
                <!--============ Page Title =========================================================================-->
                <div class="page-title">
                    <div class="container">
                        <h1 class="opacity-60 center">
                            <a href="#">Buy</a>, <a href="#">Sell</a> or <a href="#">Find</a>
                            What You need
                        </h1>
                    </div>
                    <!--end container-->
                </div>
                <!--============ End Page Title =====================================================================-->
                <!--============ Hero Form ==========================================================================-->
                <form class="hero-form form" method="POST" action="" id="searchForm"">
                    <input type="hidden" name="csrf_token" value="{{ __CF_PAGES_CSRF_TOKEN__ }}">
                    <div class="container">
                        <!--Main Form-->
                        <div class="main-search-form">
                            <div class="form-row">
                                <div class="col-md-9 col-sm-9">
                                    <div class="form-group">
                                        <label for="what" class="col-form-label">What Are You Looking For?</label>
                                        <input name="keyword" type="text" class="form-control" id="what" placeholder="Enter Anything">
                                    </div>
                                    <!--end form-group-->
                                </div>
                                <!--end col-md-3-->
                                <div class="col-md-3 col-sm-3">
                                    <button type="submit" class="btn btn-primary width-100">Search</button>
                                </div>
                                <!--end col-md-3-->
                            </div>
                            <!--end form-row-->
                        </div>
                        <!--end main-search-form-->

                    </div>
                    <!--end container-->
                    <div class="container">
                        <script type="application/ld+json">
                            {
                              "@context": "https://schema.org/",
                              "@type": "Service",
                              "name": "Marketplace for Slack",
                              "areaServed": "Slack",
                              "description": "Marketplace lets Slack users to list items for sale, and browse through available items."
                            }
                         </script>
                        <p>
                        <p class="center hthree">
                            Marketplace is an easy yet powerful <span class="underline" data-toggle="tooltip"
                                data-placement="top" title="An app for Slack that extends the capabilities of Slack">app for Slack</span>
                            that lets Slack users to buy and sell items within the same company. <br>You can search for
                            goods listed for sale by your coworkers, or let your teammates know what you have up for sale.
                        </p>
                        </p>
                    </div>
                </form>
                <script>
                    const form = document.getElementById("searchForm");
                    const keywordInput = document.getElementById("what");
                
                    form.addEventListener("submit", (event) => {
                        event.preventDefault();
                        let clean = DOMPurify.sanitize(keywordInput.value);
                        const keywordValue = clean.trim().replaceAll(" ", "-");
                        if (keywordValue) {
                            form.action = "/for-sale/" + keywordValue;
                            form.submit();
                        }
                    });
                </script>
                <!--============ End Hero Form ======================================================================-->
                <div class="background">
                    <div class="background-image original-size"
                        style="background-image: url('assets/img/hero-background-icons.jpg');">
                        <img src="assets/img/hero-background-icons.jpg" alt="">
                    </div>
                    <!--end background-image-->
                </div>
                <!--end background-->
            </div>
            <!--end hero-wrapper-->
        </header>
        <!--end hero-->

        <!--*********************************************************************************************************-->
        <!--************ CONTENT ************************************************************************************-->
        <!--*********************************************************************************************************-->
        <section class="content">
            <section class="block">
                <div class="container">
                    <!--============ Section Title===================================================================-->
                    <div class="section-title clearfix">
                        <div class="float-left float-xs-none">
                            <label class="mr-3 align-text-bottom">Sort by: </label>
                            <select name="sorting" id="sorting" class="small width-200px" data-placeholder="Default Sorting" >
                                <option value="">Default Sorting</option>
                                <option value="1">Newest First</option>
                                <option value="2">Oldest First</option>
                                <option value="3">Lowest Price First</option>
                                <option value="4">Highest Price First</option>
                            </select>

                        </div>
                        <div class="float-right d-xs-none thumbnail-toggle">
                            <a href="#" class="change-class" data-change-from-class="list" data-change-to-class="grid" data-parent-class="items">
                                <i class="fa fa-th"></i>
                            </a>
                            <a href="#" class="change-class active" data-change-from-class="grid" data-change-to-class="list" data-parent-class="items">
                                <i class="fa fa-th-list"></i>
                            </a>
                        </div>
                    </div>
                    <!--============ Items ==========================================================================-->
                    <div class="items list grid-xl-4-items grid-lg-3-items grid-md-2-items">
                    ${cards.join("")}
                        

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Education</a>
                                        <a href="single-listing-1.html" class="title">Creative Course</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-02.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Nashville, TN</a>
                                </h4>
                                <div class="price">$125</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>28.04.2017
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Peter Browner
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Proin at tortor eros. Phasellus porta nec elit non lacinia. Nam bibendum erat at leo faucibus vehicula. Ut laoreet porttitor risus, eget suscipit tellus tincidunt sit amet. </p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Start Date</figure>
                                            <aside>25.06.2017 09:00</aside>
                                        </li>
                                        <li>
                                            <figure>Length</figure>
                                            <aside>2 months</aside>
                                        </li>
                                        <li>
                                            <figure>Bedrooms</figure>
                                            <aside>3</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Adventure</a>
                                        <a href="single-listing-1.html" class="title">Into The Wild</a>
                                        <span class="tag">Ad</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-03.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Seattle, WA</a>
                                </h4>
                                <div class="price">$1,560</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>21.04.2017
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Peak Agency
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Nam eget ullamcorper massa. Morbi fringilla lectus nec lorem tristique gravida</p>
                                </div>
                                <!--end description-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Real Estate</a>
                                        <a href="single-listing-1.html" class="title">Luxury Apartment</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-04.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Greeley, CO</a>
                                </h4>
                                <div class="price">$75,000</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>13.03.2017
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Hills Estate
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis</p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Area</figure>
                                            <aside>368m<sup>2</sup></aside>
                                        </li>
                                        <li>
                                            <figure>Bathrooms</figure>
                                            <aside>2</aside>
                                        </li>
                                        <li>
                                            <figure>Bedrooms</figure>
                                            <aside>3</aside>
                                        </li>
                                        <li>
                                            <figure>Garage</figure>
                                            <aside>1</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Architecture</a>
                                        <a href="single-listing-1.html" class="title">We'll Redesign Your Apartment</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-05.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Greeley, CO</a>
                                </h4>
                                <div class="price">
                                    <span class="appendix">From</span>
                                    $200
                                </div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>13.03.2017
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>XL Designers
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis</p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Area</figure>
                                            <aside>368m<sup>2</sup></aside>
                                        </li>
                                        <li>
                                            <figure>Bathrooms</figure>
                                            <aside>2</aside>
                                        </li>
                                        <li>
                                            <figure>Bedrooms</figure>
                                            <aside>3</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="ribbon-featured">Featured</div>
                            <!--end ribbon-->
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Jobs</a>
                                        <a href="single-listing-1.html" class="title">Seeking for a Job</a>
                                        <span class="tag">Demand</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-06.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Delavan, IL</a>
                                </h4>
                                <div class="price">$1,200</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>10.03.2017
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Aurelio Thomas
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis</p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Degree</figure>
                                            <aside>Bachelor’s</aside>
                                        </li>
                                        <li>
                                            <figure>Category</figure>
                                            <aside>Art & Design</aside>
                                        </li>
                                        <li>
                                            <figure>Experience</figure>
                                            <aside>5 years</aside>
                                        </li>
                                        <li>
                                            <figure>Language</figure>
                                            <aside>English, German</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Pets & Animals</a>
                                        <a href="single-listing-1.html" class="title">Baby Cats</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-07.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Detroit, MI</a>
                                </h4>
                                <div class="price">
                                    <span class="appendix">From</span>
                                    $80
                                </div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>23.02.2017
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Detroit Pet Center
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Pellentesque ullamcorper justo quis bibendum
                                        consequat. Integer id euismod lacus, facilisis faucibus urna.
                                    </p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Age</figure>
                                            <aside>2 weeks</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Mobiles</a>
                                        <a href="single-listing-1.html" class="title">Used Smartphone</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-08.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">West Roxbury, MA</a>
                                </h4>
                                <div class="price">$300</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>28.02.2017
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Gloria A. Crawford
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Vestibulum congue at justo semper dignissim. Pellentesque ullamcorper justo quis bibendum
                                        consequat. Integer id euismod lacus, facilisis faucibus urna.
                                    </p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Status</figure>
                                            <aside>Used</aside>
                                        </li>
                                        <li>
                                            <figure>Brand</figure>
                                            <aside>Samsung</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Cars</a>
                                        <a href="single-listing-1.html" class="title">Offroad Car</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-09.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Nehalem, OR</a>
                                </h4>
                                <div class="price">$30,000</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>14.01.2017
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Leonardo
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Nam eget imperdiet massa. Cras dolor nulla, tristique eu nisl ut, venenatis volutpat massa.
                                        Integer imperdiet finibus ipsum vitae scelerisque.
                                    </p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Brand</figure>
                                            <aside>Jeep</aside>
                                        </li>
                                        <li>
                                            <figure>Engine</figure>
                                            <aside>Diesel</aside>
                                        </li>
                                        <li>
                                            <figure>Mileage</figure>
                                            <aside>28,630</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <a href="submit.html" class="item call-to-action">
                            <div class="wrapper">
                                <div class="title">
                                    <i class="fa fa-plus-square-o"></i>
                                    Submit Your Ad
                                </div>
                            </div>
                        </a>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Clothing</a>
                                        <a href="single-listing-1.html" class="title">High Boots</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-10.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Raleigh, NC</a>
                                </h4>
                                <div class="price">$67</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>05.01.2017
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Bobby
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Nam pulvinar mollis tortor, eu lobortis mauris luctus non. Integer lobortis sapien enim,
                                        ut imperdiet leo faucibus id. Fusce tincidunt nunc elit, at varius erat rutrum vitae.
                                    </p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Status</figure>
                                            <aside>Used</aside>
                                        </li>
                                        <li>
                                            <figure>Material</figure>
                                            <aside>Genuine Leather</aside>
                                        </li>
                                        <li>
                                            <figure>Size</figure>
                                            <aside>10</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Books & Magazines</a>
                                        <a href="single-listing-1.html" class="title">Will Buy "Behind the Sea" Book</a>
                                        <span class="tag">Demand</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-11.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Long Beach, CA</a>
                                </h4>
                                <div class="price">$30</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>02.01.2017
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Patty McAlexander
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Mauris nisi ligula, pulvinar eu commodo eu, semper id quam. In vitae purus bibendum,
                                        mattis ex nec, eleifend diam. Cras at vehicula metus. Sed elementum lectus ut aliquet vehicula.
                                    </p>
                                </div>
                                <!--end description-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Cameras</a>
                                        <a href="single-listing-1.html" class="title">Retro Camera</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-12.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Bethany, WV</a>
                                </h4>
                                <div class="price">$120</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>20.12.2016
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Paula Nelson
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>In vitae purus bibendum, mattis ex nec, eleifend diam. Cras at vehicula metus.
                                        Sed elementum lectus ut aliquet vehicula.
                                    </p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Brand</figure>
                                            <aside>Nikon</aside>
                                        </li>
                                        <li>
                                            <figure>Model</figure>
                                            <aside>F 35mm SLR </aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Food</a>
                                        <a href="single-listing-1.html" class="title">Fresh Bio Vegetables</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-13.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Grand Rapids, MI</a>
                                </h4>
                                <div class="price">
                                    <span class="appendix">From</span>
                                    $120
                                </div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>20.12.2016
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Paula Nelson
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>In vitae purus bibendum, mattis ex nec, eleifend diam. Cras at vehicula metus.
                                        Sed elementum lectus ut aliquet vehicula.
                                    </p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Brand</figure>
                                            <aside>Nikon</aside>
                                        </li>
                                        <li>
                                            <figure>Model</figure>
                                            <aside>F 35mm SLR </aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Restaurants</a>
                                        <a href="single-listing-1.html" class="title">XL Baron Burger</a>
                                        <span class="tag">Ad</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-14.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Burbank, CA</a>
                                </h4>
                                <div class="price">$120</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>18.12.2016
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Burger Barons
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Vestibulum sodales turpis eget venenatis iaculis. Nam pulvinar mollis tortor, eu
                                        lobortis mauris luctus non. Integer lobortis sapien enim, ut imperdiet leo faucibus id.
                                    </p>
                                </div>
                                <!--end description-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="ribbon-featured">Featured</div>
                            <!--end ribbon-->
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Photo & Camera</a>
                                        <a href="single-listing-1.html" class="title">Professional Photo Shooting</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-15.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Cambridge, MA</a>
                                </h4>
                                <div class="price">
                                    <span class="appendix">From</span>
                                    $350
                                </div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>12.11.2016
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Kate's Photo
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Morbi lectus massa, consequat blandit eleifend et, venenatis ut orci.
                                        Vestibulum finibus metus at lacus egestas pulvinar.
                                    </p>
                                </div>
                                <!--end description-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Sport</a>
                                        <a href="single-listing-1.html" class="title">Urban Bike</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-16.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Freeport, TX</a>
                                </h4>
                                <div class="price">$140</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>06.11.2016
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Laura
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Morbi egestas elit et orci interdum, ac tincidunt diam feugiat. Aliquam erat volutpat.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Brand</figure>
                                            <aside>Trek</aside>
                                        </li>
                                        <li>
                                            <figure>Size</figure>
                                            <aside>Large</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Real Estate</a>
                                        <a href="single-listing-1.html" class="title">Luxury Villa</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-17.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">St Joe, IN </a>
                                </h4>
                                <div class="price">$360,000</div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>17.10.2016
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Homeland Estate
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>nteger imperdiet finibus ipsum vitae scelerisque. Vestibulum sodales turpis eget venenatis iaculis.
                                        Nam pulvinar mollis tortor, eu lobortis mauris luctus non. Integer lobortis sapien enim
                                    </p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Area</figure>
                                            <aside>5,620m<sup>2</sup></aside>
                                        </li>
                                        <li>
                                            <figure>Size</figure>
                                            <aside>Large</aside>
                                        </li>
                                        <li>
                                            <figure>Bedrooms</figure>
                                            <aside>4</aside>
                                        </li>
                                        <li>
                                            <figure>Bathrooms</figure>
                                            <aside>3</aside>
                                        </li>
                                        <li>
                                            <figure>Garages</figure>
                                            <aside>4</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Cars</a>
                                        <a href="single-listing-1.html" class="title">Car Wheels</a>
                                        <span class="tag">Offer</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-18.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Bryan, TX</a>
                                </h4>
                                <div class="price">
                                    <span class="appendix">From</span>
                                    $140
                                </div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>12.10.2016
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>George R. Mund
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Duis tempor velit vel lectus viverra, et finibus justo semper. Morbi egestas elit et
                                        orci interdum, ac tincidunt diam feugiat. Aliquam erat volutpat. Lorem ipsum dolor
                                        sit amet, consectetur adipiscing elit
                                    </p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Size</figure>
                                            <aside>From 17"</aside>
                                        </li>
                                        <li>
                                            <figure>Material</figure>
                                            <aside>Alloy</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                        <div class="item">
                            <div class="wrapper">
                                <div class="image">
                                    <h3>
                                        <a href="#" class="tag category">Computer</a>
                                        <a href="single-listing-1.html" class="title">Will Buy MacBook Pro</a>
                                        <span class="tag">Demand</span>
                                    </h3>
                                    <a href="single-listing-1.html" class="image-wrapper background-image">
                                        <img src="assets/img/image-19.jpg" alt="">
                                    </a>
                                </div>
                                <!--end image-->
                                <h4 class="location">
                                    <a href="#">Elmsford, NJ</a>
                                </h4>
                                <div class="price">
                                    <span class="appendix">Max</span>
                                    $2,500
                                </div>
                                <div class="meta">
                                    <figure>
                                        <i class="fa fa-calendar-o"></i>10.10.2016
                                    </figure>
                                    <figure>
                                        <a href="#">
                                            <i class="fa fa-user"></i>Timothy
                                        </a>
                                    </figure>
                                </div>
                                <!--end meta-->
                                <div class="description">
                                    <p>Quisque in tincidunt quam, quis blandit orci. Proin semper leo mi, efficitur lacinia nunc blandit ac.
                                        Vestibulum congue at justo semper dignissim.
                                    </p>
                                </div>
                                <!--end description-->
                                <div class="additional-info">
                                    <ul>
                                        <li>
                                            <figure>Screen Size</figure>
                                            <aside>17"</aside>
                                        </li>
                                    </ul>
                                </div>
                                <!--end addition-info-->
                                <a href="single-listing-1.html" class="detail text-caps underline">Detail</a>
                            </div>
                        </div>
                        <!--end item-->

                    </div>
                    <!--============ End Items ======================================================================-->
                    <div class="page-pagination">
                        <nav aria-label="Pagination">
                            <ul class="pagination">
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">
                                            <i class="fa fa-chevron-left"></i>
                                        </span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li class="page-item active">
                                    <a class="page-link" href="#">1</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">2</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">3</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">
                                            <i class="fa fa-chevron-right"></i>
                                        </span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <!--end page-pagination-->
                </div>
                <!--end container-->
            </section>
            <!--end block-->
        </section>
        <!--end content-->

        <!--*********************************************************************************************************-->
        <!--************ FOOTER *************************************************************************************-->
        <!--*********************************************************************************************************-->
        <footer class="footer">
            <div class="wrapper">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5">
                            <a href="#" class="brand">
                                <img src="assets/img/marketplacelogo.png" alt="">
                            </a>
                            <p>
                                Marketplace is a simple yet powerful Slack Bot that enables Slack users to list their
                                items for sale,
                                and let anyone search for them using keywords.
                            </p>
                        </div>
                        <!--end col-md-5-->
                        <div class="col-md-3">
                            <h2>Navigation</h2>
                            <div class="row">
                                <div class="col-md-12 col-sm-6">
                                    <nav>
                                        <ul class="list-unstyled">
                                            <li>
                                                <a href="#">Home</a>
                                            </li>
                                            <li>
                                                <a href="support">Support</a>
                                            </li>
                                            <li>
                                                <a href="privacy-policy">Privacy Policy</a>
                                            </li>
                                            <li>
                                                <a href="terms-and-conditions">Terms & Conditions</a>
                                            </li>
                                            <li>
                                                <a href="contact">Contact</a>
                                            </li>
                                            <li>
                                                <a
                                                    href="https://slack.com/oauth/v2/authorize?client_id=39065726036.1542208008273&scope=commands,incoming-webhook&user_scope=">Add
                                                    to Slack</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>

                            </div>
                        </div>
                        <!--end col-md-3-->
                        <div class="col-md-4">
                            <h2>Contact</h2>
                            <address>
                                <figure>
                                    Made with fun in Connecticut, with huge help from Melbourne<br>
                                    2020 - Now
                                </figure>
                                <br>
                                <strong>Email:</strong> <a href="mailto:buysell@marketplaceforslack.com">buysell@marketplaceforslack.com</a>
                                <br><br>
                                <a href="contact" class="btn btn-primary text-caps btn-framed">Contact Us</a>
                            </address>
                        </div>
                        <!--end col-md-4-->
                    </div>
                    <!--end row-->
                </div>
                <div class="background">
                    <div class="background-image original-size"
                        style="background-image: url('assets/img/footer-background-icons.jpg');">
                        <img src="assets/img/footer-background-icons.jpg" alt="">
                    </div>
                    <!--end background-image-->
                </div>
                <!--end background-->
            </div>
        </footer>
        <!--end footer-->
    </div>
    <!--end page-->

	<script src="/assets/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="/assets/js/popper.min.js"></script>
	<script type="text/javascript" src="/assets/bootstrap/js/bootstrap.min.js"></script> 
	<script src="/assets/js/selectize.min.js"></script>
	<script src="/assets/js/masonry.pkgd.min.js"></script>
	<script src="/assets/js/icheck.min.js"></script>
	<script src="/assets/js/jquery.validate.min.js"></script>
	<script src="/assets/js/custom.js"></script>
    <script type="text/javascript" src="assets/js/purify.min.js"></script>

</body>
</html>
    
    
    
    `







    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    })
  








    //We have the form data, now we gotta check the kv, see the results and return.


		// Convert FormData to JSON
		// NOTE: Allows multiple values per key
		// let tmp, output = {};
		// for (let [key, value] of input) {
		// 	tmp = output[key];
		// 	if (tmp === undefined) {
		// 		output[key] = value;
		// 	} else {
		// 		output[key] = [].concat(tmp, value);
		// 	}
		// }

		// let pretty = JSON.stringify(output, null, 2);
		// return new Response(pretty, {
		// 	headers: {
		// 		'Content-Type': 'application/json;charset=utf-8'
		// 	}
		// });
	} catch (err) {
		return new Response(err, { status: 400 });
	}
}


// export async function loader({context, params}: LoaderArgs) {
    
//     //get from KV here
//     //const value = env.marketplace.get("available:T151XMC12:U1VALTVUY:1674660188460")
//     const keyword = params.itemId  // it's coming from the file name.
//     const allKeys = (await context.marketplace.list({"prefix": "available:"})).keys
//     console.log(allKeys)
//     if (allKeys.length == 0) { //no listings ever.
//         return new JsonResponse({
//           type: 4,
//           data: {
//             content: `Looks like a fresh install! Use /sell to add the first item.`,
//             flags: 64
//           },
//         });
//       } else {
//         async function search(keyword) {
//             var foundKeys = 0
//             var i = 0
//             var searchResults = ""
//             for (i = 0; i < allKeys.length; i++) {
//                 console.log(i)
//               const values = await context.env.marketplace.get(allKeys[i].name)
//               console.log("values: " + values)
//               if (values && values.toLowerCase().includes(item.toLowerCase())) {
//                 foundKeys = foundKeys + 1
//                 console.log("matching values: " + values)
//                 //split the key so we know the seller team and userID
//                 const item_owner_user_id = allKeys[i].name.split(":")[3]
//                 //allKeys[i] is something like: "available:discord:T151XMC12:U1VALTVUY:1610241853179"
//                 //split 0 is available
//                 //split1 is discord
//                 //split 2 is team, split 3 is user
//                 //use sections[1] + sections[2] down instead of team_id and user_id below
//                 searchResults = `${searchResults} \n ${values} from <@${item_owner_user_id}>`
//                 console.log(searchResults)
//               } 
//             }
//             console.log(searchResults)
//             if (searchResults.length == 0) {
//                 console.log("nothing found")

//             }
//         }

//     return searchResults
//         }

// }