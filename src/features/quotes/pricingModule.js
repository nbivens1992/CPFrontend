export class Pricing {
    #currentPricePerGallon;
    #locationFactor;
    #rateHistoryFactor;
    #companyProfitFactor;
    #gallonsRequestedFactor;
    #margin;
    #sPrice;
  
    constructor(location, quoteHistory, galReq) {
      this.#currentPricePerGallon = 1.5;
  
      this.#locationFactor = location === "TX" ? 0.02 : 0.04;
      this.#rateHistoryFactor = quoteHistory ? 0.01 : 0;
      this.#companyProfitFactor = 0.1;
      this.#gallonsRequestedFactor = galReq >= 1000 ? 0.02 : 0.03;
  
      this.#margin =
        this.#currentPricePerGallon *
        (this.#locationFactor -
          this.#rateHistoryFactor +
          this.#gallonsRequestedFactor +
          this.#companyProfitFactor);
  
      this.#sPrice = this.#currentPricePerGallon + this.#margin;
    }
    suggestedPrice() {
      return this.#sPrice;
    }
  }
  
  export default Pricing;