const cheerio = require("cheerio"); 
const axios = require("axios");

export default async function handler(req, res) {
    // get the request params

    const asset1 = req.query.asset1;
    const asset2 = req.query.asset2;

    // console.log(asset1, asset2);

    let url = ""

    if (asset1 === "WBTC" && asset2 === "USDC" || asset1 === "USDC" && asset2 === "WBTC") {
        url = 'https://finance.yahoo.com/quote/BTC-USD/';
    } else if (asset1 === "WETH" && asset2 === "USDC" || asset1 === "USDC" && asset2 === "WETH") {
        url = 'https://finance.yahoo.com/quote/ETH-USD/';
    }
    else if (asset1 === "WBTC" && asset2 === "WETH" || asset1 === "WETH" && asset2 === "WBTC") {
        url = 'https://finance.yahoo.com/quote/BTC-ETH/';
    }
    else{
        res.status(404).json({ message: "Asset pair not found" })
    }

    const pageHTML = await axios.get(url)

    const $ = cheerio.load(pageHTML.data);
    const tds= []
    $("td").each((index, element) => { 
        tds.push($(element).text())
    })

    const spans = []
    $("fin-streamer span").each((index, element) => {
        spans.push($(element).text())
    })

    const totalVolume = tds[19];
    const cirCulatingSupply = tds[15];
    const oneDayVolume = tds[21];
    const open = tds[3];
    const oneDayPercentChange = spans[13];
    const oneDayChange = spans[12];
    const marketCap = tds[13];

    

    res.status(200).json({ 
        oneDayVolume,
        open,
        oneDayPercentChange,
        oneDayChange,
        totalVolume,
        cirCulatingSupply,
        marketCap
    })
}
