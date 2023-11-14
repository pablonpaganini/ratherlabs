import { ethers } from 'ethers';

export default class Wallet {
  readonly contractAddress = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72';
  readonly contractAbi = [{ "inputs": [{ "internalType": "uint256", "name": "_cooldownSeconds", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cooldownSeconds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "lastSubmittal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_cooldownSeconds", "type": "uint256" }], "name": "setCooldown", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_surveyId", "type": "uint256" }, { "internalType": "uint256[]", "name": "_answerIds", "type": "uint256[]" }], "name": "submit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
  public chainId: number | null = null;
  public address: string | null = null;
  public ethToken: number | null = null;
  public quizToken: number | null = null;

  public async getQuizToken() {
    this.hasAddress();
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      if (provider) {
        const erc20Contract = new ethers.Contract(this.contractAddress, this.contractAbi, provider);
        const balance = await erc20Contract.balanceOf(this.address);
        console.log(`Balance de ${this.address}: ${balance.toString()} $QUIZ tokens`);
        this.quizToken = balance;
      }
    }
  }
  public async getEther() {
    this.hasAddress();
    if (window.ethereum) {
      const response = await window.ethereum.request({
        "method": "eth_getBalance",
        "params": [
          this.address,
          null
        ]
      });
      console.log(`Balance de ${this.address}: ${response} Ether`);
      this.ethToken = Number.isNaN(response) ? null : Number(response);
    }
  }
  public async callSubmitMethod(surveyId: number, listOfAnswers: number[]) {
    this.hasAddress();
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        if (provider) {
          const contract = new ethers.Contract(this.contractAddress, this.contractAbi, await provider.getSigner());
          try {
            const transaction = await contract.submit(surveyId, listOfAnswers);
            console.log('Transacción enviada:', transaction);
          }
          catch (error: any) {
            throw new Error(`Error al enviar la transacción: ${error.message}`);
          }
        }
        else {
          throw new Error("No hay provider");
        }
      }
      catch (error: any) {
        throw new Error(`Error al conectar con MetaMask: : ${error.message}`);
      }
    } 
    else {
      throw new Error('MetaMask no detectado');
    }
  }
  public clone(): Wallet {
    const w: Wallet = new Wallet();
    w.address = this.address;
    w.chainId = this.chainId;
    w.ethToken = this.ethToken;
    w.quizToken = this.quizToken;
    return w
  }

  private hasAddress() {
    if (this.address == null)
      throw new Error("No hay address por la cual consultar");
  }
}