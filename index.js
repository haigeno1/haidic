#!/usr/bin/env node
const axios = require("axios")
const readline = require("readline") 
const baseUrl = 'http://104.194.71.73:5001/word/'

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "dictionary>>>>>>",
})

;(async () => {
    if (process.argv[2]) {
        await translate(process.argv[2])
    } 
    rl.prompt()
})()

rl.on("line",async (line) => {
    line = line.trim()
    if (line === ""){
        return rl.prompt()
    }
    if (line === "exit"){
        process.exit()
    }
    await translate(line)
    rl.prompt()
})

rl.on("close",() => {
    console.log("thank you for use")
    process.exit()
})

async function translate(word){
    var targetUrl = baseUrl + word
    try {
        var res = await axios.get(targetUrl)
    } catch(e) {
        console.log("querying failed...")
        return 
    }
    var data = res.data
    if (data.length === 0){
        console.log("no result...")
    } else {
        data = data[0].senses[0].defs
        data.forEach((it, i) => {
            console.log("#", i + 1)
            console.log(it.defCn)
            console.log(it.defEn)
            console.log(it.examples[0].cn)
            console.log(it.examples[0].en)
        })
    }
}