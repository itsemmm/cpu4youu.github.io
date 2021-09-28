import React, { useEffect, useState, useCallback } from "react";
import { JsonRpc } from "eosjs";

// const rpc = new JsonRpc("https://wax.greymass.com", { fetch });
const rpc = new JsonRpc("https://testnet.wax.eosdetroit.io", { fetch });

const Home = ({ ual }) => {
  const transactionStakeToSelf = async () => {
    const actions = {
      actions: [
        {
          account: "eosio.token",
          name: "transfer",
          data: {
            from: ual.activeUser.accountName,
            to: "cpu4",
            quantity: amountToSend + " WAX",
            memo: numberOfDaysOption + "",
          },
          authorization: [
            {
              actor: ual.activeUser.accountName,
              permission: "active",
            },
          ],
        },
      ],
    };
    try {
    const r = await ual.activeUser.signTransaction(actions, {
      blocksBehind: 5,
      expireSeconds: 300,
      broadcast: true,
      sign: true,
    })
    console.log(r);
    } catch (e) {
        console.error(e);
        // process.exit();
        console.log(JSON.stringify(e));
    }
  };

  const transactionStakeToUser = async () => {
    const actions = {
      actions: [
        {
          account: "eosio.token",
          name: "transfer",
          data: {
            from: ual.activeUser.accountName,
            to: "cpu4",
            quantity: amountToSend + " WAX",
            memo: "USER:" + accountToStake + "," + numberOfDaysOption,
          },
          authorization: [
            {
              actor: ual.activeUser.accountName,
              permission: "active",
            },
          ],
        },
      ],
    };
    try {
    const r = await ual.activeUser.signTransaction(actions, {
      blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
    })
    console.log(r);
    } catch (e) {
        console.error(e);
        // process.exit();
        console.log(JSON.stringify(e));
    }
  };

  const transactionDeposit = async () => {
    const actions = {
      actions: [
        {
          account: "eosio.token",
          name: "transfer",
          data: {
            from: ual.activeUser.accountName,
            to: "cpu4",
            quantity: amountToSend + " WAX",
            memo: "Deposit",
          },
          authorization: [
            {
              actor: ual.activeUser.accountName,
              permission: "active",
            },
          ],
        },
      ],
    };
    try {
    const r = await ual.activeUser.signTransaction(actions, {
      blocksBehind: 5,
      expireSeconds: 300,
      broadcast: true,
      sign: true,
    })
    console.log(r);
    } catch (e) {
        console.error(e);
        // process.exit();
        console.log(JSON.stringify(e));
    }
  };

  const transactionUpdateBalance = async () => {
    const actions = {
      actions: [
        {
          account: "cpu4",
          name: "updateBalance",
          data: {
            username: ual.activeUser.accountName,
          },
          authorization: [
            {
              actor: ual.activeUser.accountName,
              permission: "active",
            },
          ],
        },
      ],
    };
    try {
    const r = await ual.activeUser.signTransaction(actions, {
      blocksBehind: 5,
      expireSeconds: 300,
      broadcast: true,
      sign: true,
    })
    console.log(r);
    } catch (e) {
        console.error(e);
        // process.exit();
        console.log(JSON.stringify(e));
    }
  };

  const transactionWithdraw = async () => {
    const actions = {
      actions: [
        {
          account: "cpu4",
          name: "withdraw",
          data: {
            username: ual.activeUser.accountName,
            amount: amountToSend + " WAX",
          },
          authorization: [
            {
              actor: ual.activeUser.accountName,
              permission: "active",
            },
          ],
        },
      ],
    };
    try {
    const r = await ual.activeUser.signTransaction(actions, {
      blocksBehind: 5,
      expireSeconds: 300,
      broadcast: true,
      sign: true,
    })
    console.log(r);
    } catch (e) {
        console.error(e);
        // process.exit();
        console.log(JSON.stringify(e));
    }
  };

  const SEND_OPTIONS = {
    self: "Request Self Stake",
    other: "Stake To User",
    deposit: "Deposit And Earn",
    update: "Update Balance",
    withdraw: "Withdraw",
  };

  const TRANSACTIONS = {
    [SEND_OPTIONS.self]: transactionStakeToSelf,
    [SEND_OPTIONS.other]: transactionStakeToUser,
    [SEND_OPTIONS.deposit]: transactionDeposit,
    [SEND_OPTIONS.update]: transactionUpdateBalance,
    [SEND_OPTIONS.withdraw]: transactionWithdraw,

  };

  const [account, setAccount] = useState();
  const [sendOption, setSendOption] = useState(SEND_OPTIONS.self);
  const [numberOfDaysOption, setNumberOfDaysOptions] = useState(1);
  const [amountToSend, setAmountToSend] = useState(0);
  const [amountToBeStaked, setAmountToBeStaked] = useState(0);
  const [accountToStake, setAccountToStake] = useState("");
  // const [exponent, setExponent] = useState(1);
  // const [totalWax, setTotalWax] = useState();
  // const [currentLoanedWax, setCurrentLoanedWax] = useState();
  // const [multiDayFee, setMultiDayFee] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  // const [updateTime, setUpdateTime] = useState();
  const [response, setResponse] = useState();


  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("FETCH");
      const table = await rpc.get_table_rows({
        json: true, // Get the response as json
        code: "cpu4", // Contract that we target
        scope: "cpu4", // Account that owns the data
        table: "config", // Table name
        limit: 1, // Maximum number of rows that we want to get
        reverse: false, // Optional: Get reversed data
        show_payer: false, // Optional: Show ram payer
      });
      const table2 = await rpc.get_table_rows({
        json: true, // Get the response as json
        code: "cpu4", // Contract that we target
        scope: "cpu4", // Account that owns the data
        table: "deposits", // Table name
        limit: 1000, // Maximum number of rows that we want to get
        reverse: false, // Optional: Get reversed data
        show_payer: false, // Optional: Show ram payer
      });
      setResponse({ r1: table, r2: table2 });
    }, 5000);
    return () => clearInterval(interval);
  }, []);



useEffect(() => {
    if (amountToSend && amountToSend > 0) {
      const run = async () => {
        try {
          const table = response.r1;
          console.log(table["rows"][0]);

          const ex = parseFloat(table["rows"][0].exponent);
          const tw = parseFloat(table["rows"][0].total_wax);
          const cl = parseFloat(table["rows"][0].current_loaned);
          const mdf = parseFloat(table["rows"][0].multi_day_fee);

          if (amountToSend && amountToSend > 0) {
            var multiplier = Math.pow((1.0 - (cl / tw)), ex) * 100;
            if (multiplier < 10) {
              multiplier = 10;
            }
            var total =
              multiplier *
              (1 - (mdf * (numberOfDaysOption - 1))) *
              (amountToSend / numberOfDaysOption);
            console.log(total);
            setAmountToBeStaked(total);
          }

          const table2 = response.r2;

          for (var i = 0; i < table2["rows"].length; i++) {
            if (table2["rows"][i].account === "cpubanktrust") {
              setCurrentBalance(table2["rows"][i].wax);
            }
          }
        } catch (e) {
          console.error(e);
          console.log(JSON.stringify(e));
        }
      };

      run();
    } else {
      setAmountToBeStaked(0);
    }
  }, [amountToSend, numberOfDaysOption, response]);



// useCallback(() => {
// const getConfig = async () => {

//   try {
//     const table = await rpc.get_table_rows({
//         json: true, // Get the response as json
//         code: "cpu4", // Contract that we target
//         scope: "cpu4", // Account that owns the data
//         table: "config", // Table name
//         limit: 1, // Maximum number of rows that we want to get
//         reverse: false, // Optional: Get reversed data
//         show_payer: false, // Optional: Show ram payer
//     });
//     console.log(table["rows"][0]);
//     setExponent(table["rows"][0].exponent);
//     setTotalWax(table["rows"][0].total_wax);
//     setCurrentLoanedWax(table["rows"][0].current_loaned);
//     setMultiDayFee(table["rows"][0].multi_day_fee);

//     if (amountToSend && amountToSend > 0) 
//     {
//       var multiplier = (1.0 - (currentLoanedWax / totalWax)^(exponent)) * 100;
//       if (multiplier < 10)
//       {
//           multiplier = 10;
//       }
//       var total = multiplier 
//         * (1 - (multiDayFee * (numberOfDaysOption - 1)))
//         * (amountToSend / numberOfDaysOption);
//       setAmountToBeStaked(total);
//     }

//     if (account) {
//       const table2 = await rpc.get_table_rows({
//           json: true, // Get the response as json
//           code: "cpu4", // Contract that we target
//           scope: "cpu4", // Account that owns the data
//           table: "deposits", // Table name
//           limit: 1000, // Maximum number of rows that we want to get
//           reverse: false, // Optional: Get reversed data
//           show_payer: false, // Optional: Show ram payer
//       });

//       for (var i = 0; i < table2["rows"].length; i++) {
//         if (table2["rows"][i].account === account) 
//         {
//           setCurrentBalance(table2["rows"][i].wax);
//         }
//       }
//     }
//   } catch (e) {
//     console.error(e);
//     console.log(JSON.stringify(e));
//   }
// };
// });

  // const updateCost = async () => {
  //   var multiplier = (1.0 - (currentLoanedWax / totalWax)^(exponent)) * 100;
  //   if (multiplier < 10)
  //   {
  //       multiplier = 10;
  //   }
  //   var total = multiplier 
  //     * (1 - (multiDayFee * (numberOfDaysOption - 1)))
  //     * (amountToSend / numberOfDaysOption);
  //   setAmountToBeStaked(total);
  // };

  useEffect(() => {
    const run = async () => {
      if (ual.activeUser) {
        try {
          const acc = await rpc.get_account(ual.activeUser.accountName);
          setAccount(acc);
        } catch (e) {
            console.error(e);
            // process.exit();
            console.log(JSON.stringify(e));
        }

      }
    };
    run();
  }, [ual.activeUser]);



  // useEffect(() => {
  //   if (amountToSend && amountToSend > 0) {

  //     // CALL CONTRACT / DO CALCULATION
  //     // updateCost();
  //     const run = async () => {
  //       await getConfig();
  //     };

  //     run();
  //   } else {
  //     setAmountToBeStaked(0);
  //   }
  // }, [amountToSend,updateTime]);


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setUpdateTime(Date.now());
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
      // const run = async () => {
      //   await getConfig();
      // };

      // run();

  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [getConfig]);



// useEffect(() => {
//     const interval = setInterval(async () => {
//         await getConfig();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [getConfig]);






  const openLoginModal = () => {
    if (!ual.activeUser) {
      ual.showModal();
    }
  };

  const renderLoginButton = () => {
    return (
      <div>
        <button onClick={openLoginModal}>Login</button>
        <br />
      </div>
    );
  };

  const renderLogoutButton = () => {
    if (!!ual.activeUser && !!ual.activeAuthenticator) {
      return (
        <div>
          <br />
          <button onClick={ual.logout}>Logout</button>
          <br />
        </div>
      );
    }
  };

  const renderNameAndBalance = () => {
    return ual.activeUser && account ? (
      <div>
        {ual.activeUser.accountName} <br />
        Current Balance: {account.core_liquid_balance}
        <br />
      </div>
    ) : null;
  };

  const depositedWax = () => {
    return ual.activeUser && account ? (
      <div>
        Deposited: {currentBalance}
        <br />
      </div>
    ) : null;
  };

  const renderSelectSendOption = () => {
    return (
      <div>
        <br />
        <select
          value={sendOption}
          onChange={(e) => setSendOption(e.target.value)}
        >
          <option value={SEND_OPTIONS.self}>{SEND_OPTIONS.self}</option>
          <option value={SEND_OPTIONS.other}>{SEND_OPTIONS.other}</option>
          <option value={SEND_OPTIONS.deposit}>{SEND_OPTIONS.deposit}</option>
          <option value={SEND_OPTIONS.update}>{SEND_OPTIONS.update}</option>
          <option value={SEND_OPTIONS.withdraw}>{SEND_OPTIONS.withdraw}</option>
        </select>
        <br />
        <br />
        {renderForm()}
        <br />
        {renderSubmitButton()}
      </div>
    );
  };

  const renderForm = () => {
    if (sendOption === SEND_OPTIONS.self) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>
            {renderAmountToSendInput()}
            {renderNumberOfDaysDropdown()}
            {renderAmountToBeStaked()}
          </tbody>
        </table>
      );
    } else if (sendOption === SEND_OPTIONS.other) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>
            {renderAmountToSendInput()}
            {renderNumberOfDaysDropdown()}
            {renderUserInput()}
            {renderAmountToBeStaked()}
          </tbody>
        </table>
      );
    } else if (sendOption === SEND_OPTIONS.deposit) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>{renderAmountToSendInput()}</tbody>
        </table>
      );
    } else if (sendOption === SEND_OPTIONS.update) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>{renderUpdateBalance()}</tbody>
        </table>
      );
    } else if (sendOption === SEND_OPTIONS.withdraw) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>{renderWithdraw()}</tbody>
        </table>
      );
    }
  };

  const renderUserInput = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>User to stake to</td>
        <td>
          <input
            style={{ width: "120px" }}
            type="text"
            value={accountToStake}
            onChange={(e) => setAccountToStake(e.target.value)}
          />
        </td>
      </tr>
    );
  };

  const renderNumberOfDaysDropdown = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Number of days</td>
        <td>
          <select
            value={numberOfDaysOption}
            onChange={(e) => setNumberOfDaysOptions(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={13}>13</option>
            <option value={14}>14</option>
          </select>
        </td>
      </tr>
    );
  };

  const renderAmountToSendInput = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Amount to send</td>
        <td>
          <input
            style={{ width: "60px" }}
            type="number"
            value={amountToSend}
            onChange={(e) => setAmountToSend(e.target.value)}
          />{" "}
          WAX
        </td>
      </tr>
    );
  };

  const renderUpdateBalance = () => {
    return (
      <tr>
      </tr>
    );
  };

  const renderWithdraw = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Amount to withdraw</td>
        <td>
          <input
            style={{ width: "60px" }}
            type="number"
            value={amountToSend}
            onChange={(e) => setAmountToSend(e.target.value)}
          />{" "}
          WAX
        </td>
      </tr>
    );
  };

  const renderAmountToBeStaked = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Amount to be staked</td>
        <td>{amountToBeStaked.toLocaleString()} WAX</td>
      </tr>
    );
  };

  const renderSubmitButton = () => {
    return (
      <div>
        <button onClick={() => TRANSACTIONS[sendOption].call()}>
          {sendOption}
        </button>
      </div>
    );
  };

  const renderFaq = () => {
    return (
      <div>
        <h2>How it works:</h2>
        <h4>Requesting Wax:</h4>
        <p>1. Send wax</p>
        <p>2. ????????</p>
        <h4>Depositing Wax:</h4>
        <p>3. Get steak</p>
      </div>
    );
  };

  return (
    <div>
      <h1>CPU 4 SALE</h1>
      {ual.activeUser ? renderNameAndBalance() : null}
      {ual.activeUser ? depositedWax() : null}
      {ual.activeUser ? renderLogoutButton() : renderLoginButton()}
      {ual.activeUser ? renderSelectSendOption() : null}
      <br />
      {renderFaq()}
    </div>
  );
};

export default Home;
