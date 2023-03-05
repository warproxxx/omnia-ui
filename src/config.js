let ERC20_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_at_once","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
let GMX_ABI = [{"inputs":[{"internalType":"address","name":"_ORACLE_CONTRACT","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ORACLE_CONTRACT","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_collateralToken","type":"address"},{"internalType":"address","name":"_indexToken","type":"address"},{"internalType":"uint256","name":"_collateralDelta","type":"uint256"},{"internalType":"uint256","name":"_sizeDelta","type":"uint256"},{"internalType":"bool","name":"_isLong","type":"bool"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"decreasePosition","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_indexToken","type":"address"},{"internalType":"uint256","name":"_size","type":"uint256"},{"internalType":"uint256","name":"_averagePrice","type":"uint256"},{"internalType":"bool","name":"_isLong","type":"bool"},{"internalType":"uint256","name":"_lastIncreasedTime","type":"uint256"}],"name":"getDelta","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_collateralToken","type":"address"},{"internalType":"address","name":"_indexToken","type":"address"},{"internalType":"bool","name":"_isLong","type":"bool"}],"name":"getPosition","outputs":[{"components":[{"internalType":"uint256","name":"size","type":"uint256"},{"internalType":"uint256","name":"collateral","type":"uint256"},{"internalType":"uint256","name":"averagePrice","type":"uint256"},{"internalType":"uint256","name":"entryFundingRate","type":"uint256"},{"internalType":"uint256","name":"reserveAmount","type":"uint256"},{"internalType":"int256","name":"realisedPnl","type":"int256"},{"internalType":"uint256","name":"lastIncreasedTime","type":"uint256"}],"internalType":"structGMX.Position","name":"_pos","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_collateralToken","type":"address"},{"internalType":"address","name":"_indexToken","type":"address"},{"internalType":"uint256","name":"_sizeDelta","type":"uint256"},{"internalType":"bool","name":"_isLong","type":"bool"}],"name":"increasePosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"positions","outputs":[{"internalType":"uint256","name":"size","type":"uint256"},{"internalType":"uint256","name":"collateral","type":"uint256"},{"internalType":"uint256","name":"averagePrice","type":"uint256"},{"internalType":"uint256","name":"entryFundingRate","type":"uint256"},{"internalType":"uint256","name":"reserveAmount","type":"uint256"},{"internalType":"int256","name":"realisedPnl","type":"int256"},{"internalType":"uint256","name":"lastIncreasedTime","type":"uint256"}],"stateMutability":"view","type":"function"}]
let ORACLE_ABI = [{"inputs":[{"internalType":"address","name":"_ADMIN","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"collection","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"OracleUpdate","type":"event"},{"inputs":[],"name":"ADMIN","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"aggregators","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"prices","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_addresses","type":"address[]"},{"internalType":"address[]","name":"_aggregators","type":"address[]"}],"name":"setAggregators","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_addresses","type":"address[]"},{"internalType":"uint256[]","name":"_values","type":"uint256[]"}],"name":"updatePrices","outputs":[],"stateMutability":"nonpayable","type":"function"}]
let VAULT_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"WHITELISTED_ASSETS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"WHITELISTED_DETAILS","outputs":[{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint32","name":"MAX_LTV","type":"uint32"},{"internalType":"uint32","name":"MAX_DURATION","type":"uint32"},{"internalType":"uint32","name":"MAX_APR","type":"uint32"},{"internalType":"uint32","name":"MIN_APR","type":"uint32"},{"internalType":"uint32","name":"slope","type":"uint32"},{"internalType":"uint32","name":"intercept","type":"uint32"},{"internalType":"uint32","name":"MAX_EXPOSURE","type":"uint32"},{"internalType":"uint32","name":"HEDGE_AT","type":"uint32"},{"internalType":"uint32","name":"MAX_DELTA_DIVERGENCE","type":"uint32"},{"internalType":"uint32","name":"HEDGE_PERCENTAGE","type":"uint32"},{"internalType":"uint256","name":"COLLATERAL_SIZE","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_loans","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"address","name":"collateral","type":"address"},{"internalType":"address","name":"loan_asset","type":"address"},{"internalType":"uint256","name":"repaymentDate","type":"uint256"},{"internalType":"uint256","name":"principal","type":"uint256"},{"internalType":"uint256","name":"repayment","type":"uint256"},{"internalType":"uint256","name":"lockedAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_asset","type":"address"}],"name":"addLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"owners","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"balances","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_asset","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"checkBalanced","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_collateral","type":"address"},{"internalType":"address","name":"_loan_asset","type":"address"},{"internalType":"uint256","name":"_collateral_amount","type":"uint256"},{"internalType":"uint256","name":"_loan_amount","type":"uint256"},{"internalType":"uint256","name":"_repaymentDate","type":"uint256"}],"name":"createLoan","outputs":[{"internalType":"uint256","name":"loanId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getUSDBalanceAndDelta","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"components":[{"internalType":"address","name":"collection","type":"address"},{"internalType":"bool","name":"direction","type":"bool"},{"internalType":"uint256","name":"delta","type":"uint256"}],"internalType":"structDelta[]","name":"deltas","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_asset","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getUSDValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hedgePositions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"VAULT_NAME","type":"string"},{"internalType":"string","name":"VAULT_DESCRIPTION","type":"string"},{"internalType":"address","name":"ORACLE_CONTRACT","type":"address"},{"internalType":"address","name":"GMX_CONTRACT","type":"address"},{"internalType":"uint32","name":"MAX_LEVERAGE","type":"uint32"}],"internalType":"structVaultDetails","name":"_VAULT_DETAILS","type":"tuple"},{"internalType":"address[]","name":"_WHITELISTED_ASSETS","type":"address[]"},{"components":[{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint32","name":"MAX_LTV","type":"uint32"},{"internalType":"uint32","name":"MAX_DURATION","type":"uint32"},{"internalType":"uint32","name":"MAX_APR","type":"uint32"},{"internalType":"uint32","name":"MIN_APR","type":"uint32"},{"internalType":"uint32","name":"slope","type":"uint32"},{"internalType":"uint32","name":"intercept","type":"uint32"},{"internalType":"uint32","name":"MAX_EXPOSURE","type":"uint32"},{"internalType":"uint32","name":"HEDGE_AT","type":"uint32"},{"internalType":"uint32","name":"MAX_DELTA_DIVERGENCE","type":"uint32"},{"internalType":"uint32","name":"HEDGE_PERCENTAGE","type":"uint32"},{"internalType":"uint256","name":"COLLATERAL_SIZE","type":"uint256"}],"internalType":"structWhitelisted[]","name":"_WHITELISTED_DETAILS","type":"tuple[]"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_loanId","type":"uint32"}],"name":"repayLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"address","name":"_asset","type":"address"}],"name":"withdrawLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"}]
let VAULTMANAGER_ABI = [{"inputs":[{"internalType":"address","name":"_VAULT","type":"address"},{"internalType":"address","name":"_ORACLE","type":"address"},{"internalType":"address","name":"_ADMIN","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"_vault","type":"address"}],"name":"addValidVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"VAULT_NAME","type":"string"},{"internalType":"string","name":"VAULT_DESCRIPTION","type":"string"},{"internalType":"address","name":"ORACLE_CONTRACT","type":"address"},{"internalType":"address","name":"GMX_CONTRACT","type":"address"},{"internalType":"uint32","name":"MAX_LEVERAGE","type":"uint32"}],"internalType":"structVaultDetails","name":"_VAULT_DETAILS","type":"tuple"},{"internalType":"address[]","name":"_WHITELISTED_ASSETS","type":"address[]"},{"components":[{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint32","name":"MAX_LTV","type":"uint32"},{"internalType":"uint32","name":"MAX_DURATION","type":"uint32"},{"internalType":"uint32","name":"MAX_APR","type":"uint32"},{"internalType":"uint32","name":"MIN_APR","type":"uint32"},{"internalType":"uint32","name":"slope","type":"uint32"},{"internalType":"uint32","name":"intercept","type":"uint32"},{"internalType":"uint32","name":"MAX_EXPOSURE","type":"uint32"},{"internalType":"uint32","name":"HEDGE_AT","type":"uint32"},{"internalType":"uint32","name":"MAX_DELTA_DIVERGENCE","type":"uint32"},{"internalType":"uint32","name":"HEDGE_PERCENTAGE","type":"uint32"},{"internalType":"uint256","name":"COLLATERAL_SIZE","type":"uint256"}],"internalType":"structWhitelisted[]","name":"_WHITELISTED_DETAILS","type":"tuple[]"},{"internalType":"address","name":"_VAULT","type":"address"}],"name":"createVault","outputs":[{"internalType":"address","name":"vault","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getVaults","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"validVault","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"vaults","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]


let VAULT_MANAGER='0x2D472D22710436564694f9Fda36bb86aDD3f9793'
let ORACLE='0x931F00F016fa7A42A250dfE05aeC7325124F0E57'
let VAULT='0xF41556A18f4f2A7fd75265bA9e7efB796b92A823'
let PAIRS={"USDC":"0x307b2db2E2F12a9979175b0867C59963fC0e8064","WETH":"0x8466bf47fe2aB6d947970591034b8985a88c4d69","WBTC":"0x28CC9bf6bf29daE12dE61837f0807bD920553091"}

module.exports = {ERC20_ABI,GMX_ABI,ORACLE_ABI,VAULT_ABI,VAULTMANAGER_ABI,ORACLE,VAULT_MANAGER,PAIRS,VAULT}