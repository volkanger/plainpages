export async function onRequest(request) {
    const allKeys = (await env.marketplace.list({"prefix": "available:"})).keys
    // //all discord
    // const availablesDiscord = await env.marketplace.get("availables:discord")
    // //all slack
    // const availablesSlack = await env.marketplace.get("availables:slack")
    for (let i = 0; i < allKeys.length; i++) {
        const value = await env.marketplace.get(allKeys[i].name)
        console.log("Current Value:")
        console.log(value)
        const availables = await env.marketplace.get("availables") //array
        console.log("Availables:")
        console.log(availables)
        //push the object
        console.log("Availables type:")
        console.log(typeof availables)
        let newPair = {"key": allKeys[i].name, "value": value}
        console.log("newPair:")
        console.log(newPair)
        const newAvailables = availables.push()
        console.log("newAvailables:")
        console.log(newAvailables)
        await env.marketplace.put(availables, newAvailables)
    }


    return new Response("Thank you for the new values. Let's see if it worked. check the logs. Hope you were tailing 'em.", {
        headers: {
          "content-type": "text/plain;charset=UTF-8",
        },
      });

}