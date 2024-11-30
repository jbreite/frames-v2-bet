export const SportsAmmV2_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1167FailedCreateClone",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "defaultCollateral",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "manager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "riskManager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "resultManager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "referrals",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "stakingThales",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "safeBox",
        type: "address",
      },
    ],
    name: "AddressesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "safeBoxFee",
        type: "uint256",
      },
    ],
    name: "AmountsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "game",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
    ],
    name: "GameRootUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "gameId",
            type: "bytes32",
          },
          {
            internalType: "uint16",
            name: "sportId",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "typeId",
            type: "uint16",
          },
          {
            internalType: "uint256",
            name: "maturity",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "int24",
            name: "line",
            type: "int24",
          },
          {
            internalType: "uint24",
            name: "playerId",
            type: "uint24",
          },
          {
            internalType: "uint8",
            name: "position",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "odd",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint16",
                name: "typeId",
                type: "uint16",
              },
              {
                internalType: "uint8",
                name: "position",
                type: "uint8",
              },
              {
                internalType: "int24",
                name: "line",
                type: "int24",
              },
            ],
            internalType: "struct ISportsAMMV2.CombinedPosition[]",
            name: "combinedPositions",
            type: "tuple[]",
          },
        ],
        indexed: false,
        internalType: "struct Ticket.MarketData[]",
        name: "markets",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "ticket",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "buyInAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isLive",
        type: "bool",
      },
    ],
    name: "NewTicket",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerNominated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "isPaused",
        type: "bool",
      },
    ],
    name: "PauseChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "refferer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "volume",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateral",
        type: "address",
      },
    ],
    name: "ReferrerPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "safeBoxFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "safeBoxAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateral",
        type: "address",
      },
    ],
    name: "SafeBoxFeePaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_collateral",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_addedPayout",
        type: "uint256",
      },
    ],
    name: "SetAddedPayoutPercentagePerCollateral",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "freeBetsHolder",
        type: "address",
      },
    ],
    name: "SetFreeBetsHolder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "liquidityPool",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateral",
        type: "address",
      },
    ],
    name: "SetLiquidityPoolForCollateral",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "liveTradingProcessor",
        type: "address",
      },
    ],
    name: "SetLiveTradingProcessor",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "onOffRamper",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "SetMultiCollateralOnOffRamp",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_collateral",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_safeBox",
        type: "address",
      },
    ],
    name: "SetSafeBoxPerCollateral",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "ticket",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "buyInAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fees",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalQuote",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateral",
        type: "address",
      },
    ],
    name: "TicketCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "ticketMastercopy",
        type: "address",
      },
    ],
    name: "TicketMastercopyUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "ticket",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "ticketOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isUserTheWinner",
        type: "bool",
      },
    ],
    name: "TicketResolved",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addedPayoutPercentagePerCollateral",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultCollateral",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ticket",
        type: "address",
      },
    ],
    name: "exerciseTicket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ticket",
        type: "address",
      },
      {
        internalType: "address",
        name: "_exerciseCollateral",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_inEth",
        type: "bool",
      },
    ],
    name: "exerciseTicketOffRamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tickets",
        type: "address[]",
      },
    ],
    name: "expireTickets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "freeBetsHolder",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "_games",
        type: "bytes32[]",
      },
    ],
    name: "getRootsPerGames",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "_roots",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initNonReentrant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_defaultCollateral",
        type: "address",
      },
      {
        internalType: "contract ISportsAMMV2Manager",
        name: "_manager",
        type: "address",
      },
      {
        internalType: "contract ISportsAMMV2RiskManager",
        name: "_riskManager",
        type: "address",
      },
      {
        internalType: "contract ISportsAMMV2ResultManager",
        name: "_resultManager",
        type: "address",
      },
      {
        internalType: "contract IReferrals",
        name: "_referrals",
        type: "address",
      },
      {
        internalType: "contract IStakingThales",
        name: "_stakingThales",
        type: "address",
      },
      {
        internalType: "address",
        name: "_safeBox",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastPauseTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "liquidityPoolForCollateral",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "liveTradingProcessor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [
      {
        internalType: "contract ISportsAMMV2Manager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "multiCollateralOnOffRamp",
    outputs: [
      {
        internalType: "contract IMultiCollateralOnOffRamp",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "multicollateralEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "nominateNewOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nominatedOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "referrals",
    outputs: [
      {
        internalType: "contract IReferrals",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "resultManager",
    outputs: [
      {
        internalType: "contract ISportsAMMV2ResultManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "riskManager",
    outputs: [
      {
        internalType: "contract ISportsAMMV2RiskManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "rootPerGame",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "safeBox",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "safeBoxFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "safeBoxPerCollateral",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_collateral",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_addedPayout",
        type: "uint256",
      },
    ],
    name: "setAddedPayoutPercentagePerCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_defaultCollateral",
        type: "address",
      },
      {
        internalType: "address",
        name: "_manager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_riskManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_resultManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_referrals",
        type: "address",
      },
      {
        internalType: "address",
        name: "_stakingThales",
        type: "address",
      },
      {
        internalType: "address",
        name: "_safeBox",
        type: "address",
      },
    ],
    name: "setAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_safeBoxFee",
        type: "uint256",
      },
    ],
    name: "setAmounts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_freeBetsHolder",
        type: "address",
      },
    ],
    name: "setFreeBetsHolder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_collateralAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_liquidityPool",
        type: "address",
      },
    ],
    name: "setLiquidityPoolForCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_liveTradingProcessor",
        type: "address",
      },
    ],
    name: "setLiveTradingProcessor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_onOffRamper",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_enabled",
        type: "bool",
      },
    ],
    name: "setMultiCollateralOnOffRamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_paused",
        type: "bool",
      },
    ],
    name: "setPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_game",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
    ],
    name: "setRootForGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "_games",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32[]",
        name: "_roots",
        type: "bytes32[]",
      },
    ],
    name: "setRootsPerGames",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_collateral",
        type: "address",
      },
      {
        internalType: "address",
        name: "_safeBox",
        type: "address",
      },
    ],
    name: "setSafeBoxPerCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ticketMastercopy",
        type: "address",
      },
    ],
    name: "setTicketMastercopy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingThales",
    outputs: [
      {
        internalType: "contract IStakingThales",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ticketMastercopy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "gameId",
            type: "bytes32",
          },
          {
            internalType: "uint16",
            name: "sportId",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "typeId",
            type: "uint16",
          },
          {
            internalType: "uint256",
            name: "maturity",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "int24",
            name: "line",
            type: "int24",
          },
          {
            internalType: "uint24",
            name: "playerId",
            type: "uint24",
          },
          {
            internalType: "uint256[]",
            name: "odds",
            type: "uint256[]",
          },
          {
            internalType: "bytes32[]",
            name: "merkleProof",
            type: "bytes32[]",
          },
          {
            internalType: "uint8",
            name: "position",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "uint16",
                name: "typeId",
                type: "uint16",
              },
              {
                internalType: "uint8",
                name: "position",
                type: "uint8",
              },
              {
                internalType: "int24",
                name: "line",
                type: "int24",
              },
            ],
            internalType: "struct ISportsAMMV2.CombinedPosition[][]",
            name: "combinedPositions",
            type: "tuple[][]",
          },
        ],
        internalType: "struct ISportsAMMV2.TradeData[]",
        name: "_tradeData",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "_buyInAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expectedQuote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_additionalSlippage",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_referrer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_collateral",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isEth",
        type: "bool",
      },
    ],
    name: "trade",
    outputs: [
      {
        internalType: "address",
        name: "_createdTicket",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "gameId",
            type: "bytes32",
          },
          {
            internalType: "uint16",
            name: "sportId",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "typeId",
            type: "uint16",
          },
          {
            internalType: "uint256",
            name: "maturity",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "int24",
            name: "line",
            type: "int24",
          },
          {
            internalType: "uint24",
            name: "playerId",
            type: "uint24",
          },
          {
            internalType: "uint256[]",
            name: "odds",
            type: "uint256[]",
          },
          {
            internalType: "bytes32[]",
            name: "merkleProof",
            type: "bytes32[]",
          },
          {
            internalType: "uint8",
            name: "position",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "uint16",
                name: "typeId",
                type: "uint16",
              },
              {
                internalType: "uint8",
                name: "position",
                type: "uint8",
              },
              {
                internalType: "int24",
                name: "line",
                type: "int24",
              },
            ],
            internalType: "struct ISportsAMMV2.CombinedPosition[][]",
            name: "combinedPositions",
            type: "tuple[][]",
          },
        ],
        internalType: "struct ISportsAMMV2.TradeData[]",
        name: "_tradeData",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "_buyInAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expectedQuote",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "_referrer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_collateral",
        type: "address",
      },
    ],
    name: "tradeLive",
    outputs: [
      {
        internalType: "address",
        name: "_createdTicket",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "gameId",
            type: "bytes32",
          },
          {
            internalType: "uint16",
            name: "sportId",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "typeId",
            type: "uint16",
          },
          {
            internalType: "uint256",
            name: "maturity",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "int24",
            name: "line",
            type: "int24",
          },
          {
            internalType: "uint24",
            name: "playerId",
            type: "uint24",
          },
          {
            internalType: "uint256[]",
            name: "odds",
            type: "uint256[]",
          },
          {
            internalType: "bytes32[]",
            name: "merkleProof",
            type: "bytes32[]",
          },
          {
            internalType: "uint8",
            name: "position",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "uint16",
                name: "typeId",
                type: "uint16",
              },
              {
                internalType: "uint8",
                name: "position",
                type: "uint8",
              },
              {
                internalType: "int24",
                name: "line",
                type: "int24",
              },
            ],
            internalType: "struct ISportsAMMV2.CombinedPosition[][]",
            name: "combinedPositions",
            type: "tuple[][]",
          },
        ],
        internalType: "struct ISportsAMMV2.TradeData[]",
        name: "_tradeData",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "_buyInAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_collateral",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isLive",
        type: "bool",
      },
    ],
    name: "tradeQuote",
    outputs: [
      {
        internalType: "uint256",
        name: "totalQuote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fees",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "amountsToBuy",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "buyInAmountInDefaultCollateral",
        type: "uint256",
      },
      {
        internalType: "enum ISportsAMMV2RiskManager.RiskStatus",
        name: "riskStatus",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "proxyAddress",
        type: "address",
      },
    ],
    name: "transferOwnershipAtInit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
