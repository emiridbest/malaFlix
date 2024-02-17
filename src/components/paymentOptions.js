const paymentOptions = [
  {
    chainId: 80001,
    receiverAddress: "0x0000000000000000000000000000000000000000",
    superToken: {
      address: "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f",
    },
    flowRate: {
      amountEther: "1",
      period: "month",
    },
  },
  {
    chainId: 80001,
    receiverAddress: "0x0000000000000000000000000000000000000000",
    superToken: {
      address: "0x42bb40bf79730451b11f6de1cba222f17b87afd7",
    },
    flowRate: {
      amountEther: "1",
      period: "month",
    },
  },
  {
    chainId: 100,
    receiverAddress: "0x0000000000000000000000000000000000000000",
    superToken: {
      address: "0x59988e47a3503aafaa0368b9def095c818fdca01",
    },
    flowRate: {
      amountEther: "1",
      period: "month",
    },
  },
];

export default paymentOptions;
