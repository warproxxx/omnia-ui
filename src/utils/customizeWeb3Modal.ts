


const customizeWeb3Modal = (web3ModalInstant: any, querySelectorAllDeep: Function) => {
    if (document) {
        const web3modalDOMObject = <HTMLElement>document?.querySelector("w3m-modal")?.shadowRoot?.querySelector("#w3m-modal");
        const appDOMObject = <HTMLElement>document?.querySelector("#OMNIA");
        const nextDomObject = <HTMLElement>document?.querySelector("#__next");
        querySelectorAllDeep('span.w3m-medium-normal').forEach((span:HTMLElement) => {
            span.style.setProperty("font-family", "VCROSD");
            span.style.setProperty('font-weight','500');
        });
        querySelectorAllDeep("w3m-text").forEach((text: HTMLElement) => {
            if(text.innerText==='Connect Wallet'){
                text.innerText='Connect'
            }
        });
        if (web3ModalInstant.isOpen) {
            if (web3modalDOMObject && appDOMObject && nextDomObject) {
                setTimeout(() => {

                    // change all w3m-large-bold's span to font family "VCROSD"
                    let spans = querySelectorAllDeep('span.w3m-small-normal');
                    
                    //Combine all spans into one array
                    spans = spans.concat(querySelectorAllDeep('span.w3m-large-bold'));

                    spans = spans.concat(querySelectorAllDeep('span.w3m-xsmall-normal'));

                    spans = spans.concat(querySelectorAllDeep('span.w3m-xxsmall-bold'));

                    spans = spans.concat(querySelectorAllDeep('span.w3m-medium-normal'));

                    spans = spans.concat(querySelectorAllDeep('span.w3m-small-normal'));
                    
                    spans.forEach((span:HTMLElement) => {
                        span.style.setProperty("font-family", "VCROSD");
                    });

                    appDOMObject.style.setProperty("filter", "blur(10px)");

                }, 25);
            }
        } else {
            appDOMObject?.style.setProperty("filter", "none");
        }
    }
};

export default customizeWeb3Modal;
