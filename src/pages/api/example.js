import nc from "next-connect";
import cors from "cors";

const handler = nc()
    // use connect based middleware
    .use(cors())
    .post(async (req, res) => {
        console.log("hello")
        const response = await fetch('https://api.coingate.com/v2/rates/merchant/ETH/BTC');
        res.json("hello");
    });

export default handler;
