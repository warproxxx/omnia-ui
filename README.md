![OMNIA Card](public/OMNIA_card_official.png)

# OMNIA
in omnia paratus Latin phrase

: prepared in all things : ready for anything

## ETH Denver 2023 BUIDLathon

### 🚝Track: 
#### Decentralized Finance

### 💰 Bounties:
##### - Web3Modal Theming Challenge
OMNIA utilizes and customize the Web3Modal theming to match the OMNIA brand. That includes both **color** and **font**. Here is a screenshot of the Web3Modal theme in action:

###### Web3modal
![OMNIA Card](readme_images/Web3ModalThemeing1.PNG)

###### Web3modal button
![OMNIA Card](readme_images/Web3ModalThemeing2.PNG)

##### - Web3Modal Creative Challenge
All smart contract transactions in OMNIA are initialized via the Web3Modal SDK. This allows users to connect to their wallet of choice and sign transactions. In OMNIA, all wallet states are handled by Web3Modal.

All contracts transactions are located in the src/hooks/useContractHelpers.ts file. Which utlizie the wagmi SDK to get the signer and initialize the contract.

For example this is one of the function that checks for WETH approval 
![OMNIA Card](readme_images/code1.png)


##### - Web3Modal DeFi Challenge: Making Bank (Without the Banks)
OMNIA UI provides a simple and easy user interface for users to interact with the OMNIA smart contracts. Web3Modal plays a crucial role in all of the transactions that occur in the OMNIA.


## 🚀 Getting Started

To run OMNIA in your local enviornment, you will need to run the following commands:

```bash
npm run install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🖥️ Demo

You can view a demo of OMNIA at [https://omnia-ethdenver.vercel.app/](https://omnia-ethdenver.vercel.app/)

## 📷 Screenshots

### Exchange Page
![OMNIA Exchange Page](readme_images/APP_Screenshot_1.png)

### Vaults Page
![OMNIA Vaults Page](readme_images/APP_Screenshot_2.png)

### Portfolio Page
![OMNIA Vaults Page](readme_images/APP_Screenshot_3.png)


## 📁 Related Repositories
[OMNIA Smart Contracts](https://github.com/warproxxx/omnia-contracts)
<br/>
[OMNIA Backtest](https://github.com/warproxxx/omnia-backtest)

## 🥚 Easter Egg

The name OMNIA is a reference to the Latin phrase "in omnia paratus" which means "prepared in all things". In the case of a defi protocol, this means that the protocol is connected to all the major DeFi protocols and is ready to interact with them.

The OMNIA logo is a reference to the two ravens of Odin in the norse mythology. The two ravens are called Huginn and Muninn, which means "thought" and "memory" respectively. The two ravens are sent out every morning to fly all over the world and gather information. They then return to Odin and tell him everything they have seen. This is a reference to the fact that OMNIA will be connected to all the major DeFi protocols and will be able to work with all of them.

## 📜 License

This project is licensed under the MIT License. 

For more information, please see the [LICENSE](LICENSE) file.
