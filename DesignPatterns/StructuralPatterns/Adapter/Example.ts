/**
 * PaymentProcessor is the target interface expected by the client code.
 */
class PaymentProcessor {
  pay(amount: number): string {
    return `Paid ${amount} using PaymentProcessor.`;
  }
}

/**
 * ThirdPartyPay is an existing class with a different interface.
 */
class ThirdPartyPay {
  makePayment(paymentDetails: { total: number }): string {
    return `Payment of ${paymentDetails.total} processed via ThirdPartyPay.`;
  }
}

/**
 * ThirdPartyPayAdapter adapts the interface of ThirdPartyPay to the 
 * PaymentProcessor interface.
 */
class ThirdPartyPayAdapter extends PaymentProcessor {
  private thirdParty: ThirdPartyPay;

  constructor(thirdParty: ThirdPartyPay) {
    super();
    this.thirdParty = thirdParty;
  }

  /**
   * Overrides the pay method to delegate the call to ThirdPartyPay's makePayment method.
   */
  pay(amount: number): string {
    return this.thirdParty.makePayment({ total: amount });
  }
}

/**
 * Client function that processes payments using a PaymentProcessor.
 */
function processPayment(processor: PaymentProcessor, amount: number) {
  console.log(processor.pay(amount));
}

// Example usage of PaymentProcessor
const processor = new PaymentProcessor();
processPayment(processor, 100);

// Example usage of ThirdPartyPay through the adapter
const thirdParty = new ThirdPartyPay();
const adaptedProcessor = new ThirdPartyPayAdapter(thirdParty);
processPayment(adaptedProcessor, 200);

export {};
