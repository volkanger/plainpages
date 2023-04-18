export async function onRequest({ context, env, request  }) {
    const allKeys = (await env.marketplace.list({"prefix": "available:T151XMC12:167"})).keys
    // //all discord
    // const availablesDiscord = await env.marketplace.get("availables:discord")
    // //all slack
    // const availablesSlack = await env.marketplace.get("availables:slack")
    const availables = await env.marketplace.get("availables") //array

    for (let i = 0; i < allKeys.length; i++) {
        const value = await env.marketplace.get(allKeys[i].name)
        console.log("Current Value:")
        console.log(value)
        availables = JSON.parse(availables)
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
          await env.marketplace.put(availables, JSON.stringify(availables))
        }
    }
    
    console.log(availables)

    return new Response("Thank you for the new values. Let's see if it worked. check the logs. Hope you were tailing 'em.", {
        headers: {
          "content-type": "text/plain;charset=UTF-8",
        },
      });

}