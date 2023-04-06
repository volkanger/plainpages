export async function onRequest(request) {
    
    const html = `<!DOCTYPE html>
		<body>
        
            <h1> All listings on /for-sale </h1>
            <h2>/for-sale/iphone for search results</h2>
            <h3>/for-sale/$id for details page</h3>

		</body>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });

}
