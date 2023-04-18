export async function onRequest({ context, env, request  }) {

//  let availables = JSON.parse(await env.marketplace.get("availables"))
//  console.log(availables)
//  console.log(JSON.stringify(availables))
//  let newest = {
//   "key": "available:T:U:Timey", 
//   "value": "satılık iphoney"
//   }
//   console.log(newest)
//   availables.push(newest)
//   console.log(availables)

//  return new Response(JSON.stringify(availables))


    const allKeys = (await env.marketplace.list({"prefix": "available:"})).keys
    // //all discord
    // const availablesDiscord = await env.marketplace.get("availables:discord")
    // //all slack
    // const availablesSlack = await env.marketplace.get("availables:slack")
    let availables = JSON.parse(await env.marketplace.get("availables"))

    for (let i = 0; i < allKeys.length; i++) {
        const value = await env.marketplace.get(allKeys[i].name)
        console.log("Current Value:")
        console.log(value)
        console.log("Availables:")
        console.log(availables)
        //push the object
        // console.log("Availables type:")
        // console.log(typeof availables)
        // let availablesArray = JSON.parse(availables)
        // console.log("AvailablesArray type:")
        // console.log(typeof availablesArray)
        let newPair = {"key": allKeys[i].name, "value": value}
        console.log("newPair:")
        console.log(newPair)
        availables.push(newPair)
        console.log("availables after push:")
        console.log(availables)
        if (i == allKeys.length-1) { //last one. Not sure if I can get the value out of here.
          console.log(availables)
          await env.marketplace.put("availables", JSON.stringify(availables))
        }
    }
    
    console.log(availables)

    return new Response("Thank you for the new values. Let's see if it worked. check the logs. Hope you were tailing 'em.", {
        headers: {
          "content-type": "text/plain;charset=UTF-8",
        },
      });

}