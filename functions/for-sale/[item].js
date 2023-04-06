export async function onRequest({ context, env, request  }) {
  try {
    console.log("I'm alive")
    console.log("There's a request.")
    console.log("I want to get to the bottom of this. ")
    
		let input = await request.formData();
    console.log(input)
    let keyword = input.get("keyword")
    console.log(keyword)
       
    //learn how to patch pages to kv
    // const allKeys = await env.marketplace.get("available:T01C79S2HKP:U01JP332EP7:1616534585127")
    const allKeys = (await env.marketplace.list({"prefix": "available:"})).keys
    console.log(allKeys)
    console.log(allKeys)
    return new Response(JSON.stringify(allKeys))
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