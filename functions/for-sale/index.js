export async function onRequest(request) {
    
    const html = `<!DOCTYPE html>
		<body>
        
            <h1> All listings on /for-sale </h1>
            <h2>/for-sale/iphone for search results</h2>
            <h3>/for-sale/$id for details page</h3>
            
            <h3>So, from this page, let's send a post to /for-sale/keyword-with-hyphens</h3>
            <h3>And update the [item].js file to be the search result page, using the posted data as keyword</h3>

		</body>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });

}