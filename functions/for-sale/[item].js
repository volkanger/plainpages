export async function onRequest({ context, env, request  }) {
  try {
    console.log("I'm reporting live from the [item].js page")

    
		let input = await request.formData();
    // console.log(input)
    let keyword = input.get("keyword")
    console.log("keyword is: " + keyword)
       
    //learn how to patch pages to kv
    // const allKeys = await env.marketplace.get("available:T01C79S2HKP:U01JP332EP7:1616534585127")
    const allKeys = (await env.marketplace.list({"prefix": "available:"})).keys
    let availables = JSON.parse(await env.marketplace.get("availables"))
    // console.log(availables)




    async function search(keyword) {
      console.log("search initiated for this keyword: " + keyword)
      let itemsFound = {}
      let itemsFoundStringified = {}
      let availables = JSON.parse(await env.marketplace.get("availables"))
      let items = Object.entries(availables);
      console.log(items)
      items.forEach( ([key, item]) => {
        // console.log(key)
        // console.log(value)
        if (item.title.includes(keyword)) {
          console.log(item)
          console.log("found one: " + item.title)
					itemsFound[key] = item
          itemsFoundStringified[JSON.stringify(key)] = JSON.stringify(item)
          console.log("item")
          console.log(item)
          console.log("item sitringifed")
          console.log(JSON.stringify(item))
          console.log("key")
          console.log(item)
          console.log("key sitringifed")
          console.log(JSON.stringify(key))
        }
      })
      console.log("itemsFound:")
      console.log(itemsFound)
      console.log("itemsFoundStringified:")
      console.log(itemsFoundStringified)
      

      return itemsFound
    }

    

    console.log("---i guess ill see this before the rest")
    console.time("search keyword function starts with the keyword: " + keyword)
    let searcheResults = JSON.stringify(await search(keyword))

    console.timeEnd("search ended")
    // console.log(searcheResults)
    //console.log(JSON.stringify(searcheResults))

    let cards = [``]

    //git add . && git commit -m "publish por favor" && git push
    //git add . ; git commit -m "publish por favor" ; git push
    //wrangler pages deployment tail

    // let foundItems = Object.values(searcheResults)
    // console.log(foundItems)

    Object.values(JSON.parse(searcheResults)).forEach( (item) => { //this is an object, run it like an object
      console.log("searcheResults in ")
      console.log("searcheResults in ")
      console.log("searcheResults in")
      console.log(searcheResults)
      console.log("for each at 74")
      console.log(item)
      const date = new Date(item.timestamp)
      
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
                              <i class="fa fa-calendar-o"></i>${date.getDate() + '/' +  date.getMonth() + '/' + date.getFullYear()}
                          </figure>
                          <figure>
                              <a href="#">
                                  <i class="fa fa-user"></i>${item.userID}
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
                        

                        

                        <a href="submit.html" class="item call-to-action">
                            <div class="wrapper">
                                <div class="title">
                                    <i class="fa fa-plus-square-o"></i>
                                    Submit Your Ad
                                </div>
                            </div>
                        </a>
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
    <script type="text/javascript" src="/assets/js/purify.min.js"></script>

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