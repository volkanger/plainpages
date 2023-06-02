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

		//grab the available keys one by one
		const allKeys = (await env.marketplace.list({"prefix": "available:slack"})).keys // list of available:slack:T1234:U1234:threadID123:timestamp123
    //convert the key to object
    let availables = JSON.parse(await env.marketplace.get("obj:availables"))
    for (let i = 0; i < allKeys.length; i++) {
      const value = await env.marketplace.get(allKeys[i].name) //.get(available:slack:T1234:U1234:threadID123:timestamp123) will grab the value
      //allKeys[i].name is one of the keys we have in DB
      let item = {}
      console.log("Current Value:")
      console.log(value)
      console.log("Availables:")
      console.log(availables)
      item.status = allKeys[i].name.split(":")[0]
      item.platform = allKeys[i].name.split(":")[1]
      item.teamID = allKeys[i].name.split(":")[2]
      item.userID = allKeys[i].name.split(":")[3]
      item.forSaleChannelID = await env.marketplace.get("channel:"+allKeys[i].name.split(":")[2])
      if (value.split(":")[5]) { //new gen with the enriched key including thread id.
        item.threadID = allKeys[i].name.split(":")[4]
        item.timestamp = allKeys[i].name.split(":")[5]
      } else { //no threadid, so the timestamp is 4.
        item.timestamp = allKeys[i].name.split(":")[4]
      }
      item.title = value

      //push the object to obj:availables
      console.log("Availables type:")
      console.log(typeof availables)
      let availablesArray = JSON.parse(availables)
      console.log("AvailablesArray type:")
      console.log(typeof availablesArray)
      let newPair = {"key": allKeys[i].name, "value": JSON.stringify(item)}
      console.log("newPair:")
      console.log(newPair)
      availables.push(newPair)
      console.log("availables after push:")
      console.log(availables)
      //delete the current key (so we don't hassle with timeouts)
      await env.marketplace.delete(allKeys[i].name)
      if (i == allKeys.length-1) { //last one. Not sure if I can get the value out of here.
        console.log(availables)
        console.log("-------------")
        console.log("-------------")
        console.log("-------------")
        console.log("-------------")
        //once everything is all good, manually delete the availables and rename the obj:availables to availables
        console.log("Now it's time to manually delete the availables and rename the obj:availables to availables")
        console.log("Now it's time to manually delete the availables and rename the obj:availables to availables")
        console.log("Now it's time to manually delete the availables and rename the obj:availables to availables")
        console.log("Now it's time to manually delete the availables and rename the obj:availables to availables")
        console.log("-------------")
        console.log("-------------")
        console.log("-------------")
        console.log("-------------")
        await env.marketplace.put("availables", JSON.stringify(availables))
      }
  }
		
		
		
		//push the changes for new keys to be saved in objects via the modal
		//push the changes for new keys to be saved in objects via the /command
		//push the changes for search to look into objects
    

    
    console.log(availables)

    return new Response("Thank you for the new values. Let's see if it worked. check the logs. Hope you were tailing 'em.", {
        headers: {
          "content-type": "text/plain;charset=UTF-8",
        },
      });

}