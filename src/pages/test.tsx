import {Button} from '@mui/material'

const Test = () => {
    const testFunction = () => {
        const fetchUrl = async (url: string) => {
            const response = await fetch(url);
            const data = await response.json();      
            console.log(data);
        }

        fetchUrl('api/scrape?asset1=WETH&asset2=USDC');
    }

    return (
        <div>
        <Button onClick={()=>testFunction()} variant="contained">
            Try
        </Button>
        </div>
    )
}

export default Test;