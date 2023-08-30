import React, { useEffect, useState } from "react";
import { Api, JsonRpc } from "eosjs";
import * as waxjs from "@waxio/waxjs/dist";

const rpc = new JsonRpc("https://api.waxsweden.org", { fetch });
// const rpc = new JsonRpc("https://testnet.wax.eosdetroit.io", { fetch });
const { TextDecoder, TextEncoder } = require("util"); //node only

const Home = () => {
  const transactionStakeToSelf = async () => {
    await checkLogin();
    console.log("wallet:", wallet);
    var actions = {};
    var response = {};
    try {
      response = await fetch("https://api.limitlesswax.co/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      response.status = 400;
    }

    var enough_cpu = false;
    try {
      var account_info = await fetch(
        "https://api.wax.greeneosio.com/v2/state/get_account?limit=1&skip=0&account=limitlesswax",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      var account_info_json = await account_info.json();
      console.log(account_info_json.account.cpu_limit);

      if (parseInt(account_info_json.account.cpu_limit.available) > 5000) {
        console.log("Enough cpu left");
        enough_cpu = true;
      } else {
        console.log("Not enough cpu");
        enough_cpu = false;
      }
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      enough_cpu = false;
    }
    enough_cpu = false;
    if (response.status != 200 || enough_cpu == false) {
      console.log("Server is down.");
      // exclude the server signing part
      actions = {
        actions: [
          {
            account: "eosio.token",
            name: "transfer",
            data: {
              from: wallet.name,
              to: "cpu4",
              quantity: parseFloat(amountToSend).toFixed(8) + " WAX",
              memo: numberOfDaysOption + "",
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    } else {
      console.log("Server is up.");
      // include the server signing part
      actions = {
        max_cpu_usage_ms: 5,
        max_net_usage_words: 5000,
        actions: [
          // {
          //   account: "limitlesswax",
          //   name: "paycpu",
          //   data: {
          //     user: ual.activeUser.accountName,
          //     info: "5 ms max",
          //   },
          //   authorization: [
          //     {
          //       actor: "limitlesswax",
          //       permission: "cosign",
          //     },
          //   ],
          // },
          {
            account: "eosio.token",
            name: "transfer",
            data: {
              from: wallet.name,
              to: "cpu4",
              quantity: parseFloat(amountToSend).toFixed(8) + " WAX",
              memo: numberOfDaysOption + "",
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    }

    try {
      const r = await transaction(actions, {
        blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
      });
      console.log(r);
      alert("Transaction ID: " + r.transaction_id);
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
      setAccountToStake("");
    } catch (e) {
      console.error(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }
  };

  const transactionStakeToUser = async () => {
    await checkLogin();
    var actions = {};
    var response = {};
    try {
      response = await fetch("https://api.limitlesswax.co/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      response.status = 400;
    }

    var enough_cpu = false;
    try {
      var account_info = await fetch(
        "https://api.wax.greeneosio.com/v2/state/get_account?limit=1&skip=0&account=limitlesswax",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      var account_info_json = await account_info.json();
      console.log(account_info_json.account.cpu_limit);

      if (parseInt(account_info_json.account.cpu_limit.available) > 5000) {
        console.log("Enough cpu left");
        enough_cpu = true;
      } else {
        console.log("Not enough cpu");
        enough_cpu = false;
      }
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      enough_cpu = false;
    }
    enough_cpu = false;
    if (response.status != 200 || enough_cpu == false) {
      console.log("Server is down.");
      // exclude the server signing part
      actions = {
        actions: [
          {
            account: "eosio.token",
            name: "transfer",
            data: {
              from: wallet.name,
              to: "cpu4",
              quantity: parseFloat(amountToSend).toFixed(8) + " WAX",
              memo: "USER:" + accountToStake + "," + numberOfDaysOption,
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    } else {
      console.log("Server is up.");
      // include the server signing part
      actions = {
        max_cpu_usage_ms: 5,
        max_net_usage_words: 5000,
        actions: [
          // {
          //   account: "limitlesswax",
          //   name: "paycpu",
          //   data: {
          //     user: ual.activeUser.accountName,
          //     info: "5 ms max",
          //   },
          //   authorization: [
          //     {
          //       actor: "limitlesswax",
          //       permission: "cosign",
          //     },
          //   ],
          // },
          {
            account: "eosio.token",
            name: "transfer",
            data: {
              from: wallet.name,
              to: "cpu4",
              quantity: parseFloat(amountToSend).toFixed(8) + " WAX",
              memo: "USER:" + accountToStake + "," + numberOfDaysOption,
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    }

    try {
      const r = await transaction(actions, {
        blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
      });
      console.log(r);
      alert("Transaction ID: " + r.transaction_id);
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
      setAccountToStake("");
    } catch (e) {
      console.error(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }
  };

  const transactionFreeCPU = async () => {
    await checkLogin();
    var actions = {};
    var response = {};
    try {
      response = await fetch("https://api.limitlesswax.co/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      response.status = 400;
    }

    var enough_cpu = false;
    try {
      var account_info = await fetch(
        "https://api.wax.greeneosio.com/v2/state/get_account?limit=1&skip=0&account=limitlesswax",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      var account_info_json = await account_info.json();
      console.log(account_info_json.account.cpu_limit);

      if (parseInt(account_info_json.account.cpu_limit.available) > 5000) {
        console.log("Enough cpu left");
        enough_cpu = true;
      } else {
        console.log("Not enough cpu");
        enough_cpu = false;
      }
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      enough_cpu = false;
    }

    if (response.status != 200 || enough_cpu == false) {
      console.log("Server is down.");
      // exclude the server signing part
      actions = {
        actions: [
          {
            account: "free.cpu4",
            name: "getcpu",
            data: {
              username: accountToStake,
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    } else {
      console.log("Server is up.");
      // include the server signing part
      actions = {
        max_cpu_usage_ms: 5,
        max_net_usage_words: 5000,
        actions: [
          {
            account: "limitlesswax",
            name: "paycpu",
            data: {
              user: wallet.name,
              info: "5 ms max",
            },
            authorization: [
              {
                actor: "limitlesswax",
                permission: "cosign",
              },
            ],
          },
          {
            account: "free.cpu4",
            name: "getcpu",
            data: {
              username: accountToStake,
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    }

    try {
      const r = await transaction(actions, {
        blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
      });
      console.log(r);
      alert("Transaction ID: " + r.transaction_id);
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
      setAccountToStake("");
    } catch (e) {
      console.error(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }
  };

  const transactionDeposit = async () => {
    await checkLogin();
    var actions = {};
    var response = {};
    try {
      response = await fetch("https://api.limitlesswax.co/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      response.status = 400;
    }

    var enough_cpu = false;
    try {
      var account_info = await fetch(
        "https://api.wax.greeneosio.com/v2/state/get_account?limit=1&skip=0&account=limitlesswax",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      var account_info_json = await account_info.json();
      console.log(account_info_json.account.cpu_limit);

      if (parseInt(account_info_json.account.cpu_limit.available) > 5000) {
        console.log("Enough cpu left");
        enough_cpu = true;
      } else {
        console.log("Not enough cpu");
        enough_cpu = false;
      }
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      enough_cpu = false;
    }
    enough_cpu = false;
    if (response.status != 200 || enough_cpu == false) {
      console.log("Server is down.");
      // exclude the server signing part
      actions = {
        actions: [
          {
            account: "eosio.token",
            name: "transfer",
            data: {
              from: wallet.name,
              to: "cpu4",
              quantity: parseFloat(amountToSend).toFixed(8) + " WAX",
              memo: "Deposit",
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    } else {
      console.log("Server is up.");
      // include the server signing part
      actions = {
        max_cpu_usage_ms: 5,
        max_net_usage_words: 5000,
        actions: [
          // {
          //   account: "limitlesswax",
          //   name: "paycpu",
          //   data: {
          //     user: ual.activeUser.accountName,
          //     info: "5 ms max",
          //   },
          //   authorization: [
          //     {
          //       actor: "limitlesswax",
          //       permission: "cosign",
          //     },
          //   ],
          // },
          {
            account: "eosio.token",
            name: "transfer",
            data: {
              from: wallet.name,
              to: "cpu4",
              quantity: parseFloat(amountToSend).toFixed(8) + " WAX",
              memo: "Deposit",
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    }

    try {
      const r = await transaction(actions, {
        blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
      });
      console.log(r);
      alert("Transaction ID: " + r.transaction_id);
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
      setAccountToStake("");
    } catch (e) {
      console.error(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }
  };

  const transactionUpdateBalance = async () => {
    await checkLogin();
    var actions = {};
    var response = {};
    try {
      response = await fetch("https://api.limitlesswax.co/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      response.status = 400;
    }

    var enough_cpu = false;
    try {
      var account_info = await fetch(
        "https://api.wax.greeneosio.com/v2/state/get_account?limit=1&skip=0&account=limitlesswax",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      var account_info_json = await account_info.json();
      console.log(account_info_json.account.cpu_limit);

      if (parseInt(account_info_json.account.cpu_limit.available) > 5000) {
        console.log("Enough cpu left");
        enough_cpu = true;
      } else {
        console.log("Not enough cpu");
        enough_cpu = false;
      }
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      enough_cpu = false;
    }
    enough_cpu = false;
    if (response.status != 200 || enough_cpu == false) {
      console.log("Server is down.");
      // exclude the server signing part
      actions = {
        actions: [
          {
            account: "cpu4",
            name: "updatebalance",
            data: {
              username: wallet.name,
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    } else {
      console.log("Server is up.");
      // include the server signing part
      actions = {
        max_cpu_usage_ms: 5,
        max_net_usage_words: 5000,
        actions: [
          {
            account: "limitlesswax",
            name: "paycpu",
            data: {
              user: wallet.name,
              info: "5 ms max",
            },
            authorization: [
              {
                actor: "limitlesswax",
                permission: "cosign",
              },
            ],
          },
          {
            account: "cpu4",
            name: "updatebalance",
            data: {
              username: wallet.name,
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    }

    try {
      const r = await transaction(actions, {
        blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
      });
      console.log(r);
      alert("Transaction ID: " + r.transaction_id);
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
      setAccountToStake("");
    } catch (e) {
      console.error(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }
  };

  const transactionWithdraw = async () => {
    await checkLogin();
    var actions = {};
    var response = {};
    try {
      response = await fetch("https://api.limitlesswax.co/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      response.status = 400;
    }

    var enough_cpu = false;
    try {
      var account_info = await fetch(
        "https://api.wax.greeneosio.com/v2/state/get_account?limit=1&skip=0&account=limitlesswax",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      var account_info_json = await account_info.json();
      console.log(account_info_json.account.cpu_limit);

      if (parseInt(account_info_json.account.cpu_limit.available) > 5000) {
        console.log("Enough cpu left");
        enough_cpu = true;
      } else {
        console.log("Not enough cpu");
        enough_cpu = false;
      }
    } catch (e) {
      console.error(e);
      // process.exit();
      // alert(e);
      console.log(JSON.stringify(e));
      enough_cpu = false;
    }
    enough_cpu = false;
    if (response.status != 200 || enough_cpu == false) {
      console.log("Server is down.");
      // exclude the server signing part
      actions = {
        actions: [
          {
            account: "cpu4",
            name: "withdraw",
            data: {
              username: wallet.name,
              amount: parseFloat(amountToSend).toFixed(8) + " WAX",
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    } else {
      console.log("Server is up.");
      // include the server signing part
      actions = {
        max_cpu_usage_ms: 5,
        max_net_usage_words: 5000,
        actions: [
          {
            account: "limitlesswax",
            name: "paycpu",
            data: {
              user: wallet.name,
              info: "5 ms max",
            },
            authorization: [
              {
                actor: "limitlesswax",
                permission: "cosign",
              },
            ],
          },
          {
            account: "cpu4",
            name: "withdraw",
            data: {
              username: wallet.name,
              amount: parseFloat(amountToSend).toFixed(8) + " WAX",
            },
            authorization: [
              {
                actor: wallet.name,
                permission: "active",
              },
            ],
          },
        ],
      };
    }

    try {
      const r = await transaction(actions, {
        blocksBehind: 5,
        expireSeconds: 300,
        broadcast: true,
        sign: true,
      });
      console.log(r);
      alert("Transaction ID: " + r.transaction_id);
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
      setAccountToStake("");
    } catch (e) {
      console.error(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }
  };

  const transactionTest = async () => {
    await checkLogin();
    // const [landToBoost, setLandToBoost] = useState("");
    // const [amountToBoost, setAmountToBoost] = useState(3);
    // const [numTimesToBoost, setNumTimesToBoost] = useState(1);

    var action_format_one = {
      account: "alien.worlds",
      name: "transfer",
      data: {
        from: wallet.name,
        to: "boost.worlds",
        quantity: parseFloat(amountToBoost).toFixed(4) + " TLM",
        memo: "landrating - boostslot for " + landToBoost,
      },
      authorization: [
        {
          actor: wallet.name,
          permission: "active",
        },
      ],
    };

    var action_format_two = {
      account: "awlndratings",
      name: "boost",
      data: {
        amount: parseFloat(amountToBoost).toFixed(4) + " TLM",
        land_id: landToBoost,
        payer: wallet.name,
      },
      authorization: [
        {
          actor: wallet.name,
          permission: "active",
        },
      ],
    };

    var action_format_three = [
      {
        account: "alien.worlds",
        name: "transfer",
        data: {
          from: wallet.name,
          to: "boost.worlds",
          quantity: parseFloat(amountToBoost).toFixed(4) + " TLM",
          memo: "landrating - boostslot for " + landToBoost,
        },
        authorization: [
          {
            actor: wallet.name,
            permission: "active",
          },
        ],
      },
      {
        account: "awlndratings",
        name: "boost",
        data: {
          amount: parseFloat(amountToBoost).toFixed(4) + " TLM",
          land_id: landToBoost,
          payer: wallet.name,
        },
        authorization: [
          {
            actor: wallet.name,
            permission: "active",
          },
        ],
      },
    ];
    var all_actions = [];
    for (var i = 0; i < parseInt(numTimesToBoost); i++) {
      var clone = JSON.parse(JSON.stringify(action_format_one));
      var clone_two = JSON.parse(JSON.stringify(action_format_two));
      all_actions.push(clone);
      all_actions.push(clone_two);
    }

    console.log("TESTING TESTING", landToBoost);
    console.log("TESTING TESTING", amountToBoost);
    console.log("TESTING TESTING", numTimesToBoost);
    console.log("TESTING TESTING", all_actions);

    try {
      const r = await transaction(
        { actions: all_actions },
        {
          blocksBehind: 5,
          expireSeconds: 300,
          broadcast: true,
          sign: true,
        }
      );
      console.log("TESTER TESTER: ", r);
      alert("Transaction ID: " + r.transaction_id);
      setLandToBoost("");
      setAmountToBoost(4);
      setNumTimesToBoost(1);
    } catch (e) {
      console.log(e);
      // process.exit();
      alert(e);
      console.log(JSON.stringify(e));
    }
  };

  const SEND_OPTIONS = {
    self: "Request Self Stake",
    other: "Stake To User",
    free: "Get Free CPU",
    deposit: "Deposit And Earn",
    update: "Update Balance",
    withdraw: "Withdraw",
    test: "Test",
  };

  const TRANSACTIONS = {
    [SEND_OPTIONS.self]: transactionStakeToSelf,
    [SEND_OPTIONS.other]: transactionStakeToUser,
    [SEND_OPTIONS.free]: transactionFreeCPU,
    [SEND_OPTIONS.deposit]: transactionDeposit,
    [SEND_OPTIONS.update]: transactionUpdateBalance,
    [SEND_OPTIONS.withdraw]: transactionWithdraw,
    [SEND_OPTIONS.test]: transactionTest,
  };

  const [account, setAccount] = useState();
  const [sendOption, setSendOption] = useState(SEND_OPTIONS.self);
  const [numberOfDaysOption, setNumberOfDaysOptions] = useState(3);
  const [amountToSend, setAmountToSend] = useState(1);
  const [amountToBeStaked, setAmountToBeStaked] = useState(0);
  const [accountToStake, setAccountToStake] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [response, setResponse] = useState();
  const [totalWax, setTotalWax] = useState(0);
  const [freeWax, setFreeWax] = useState(0);

  const [contract, setContract] = useState("eosio.token");
  const [action, setAction] = useState("transfer");
  const [data, setData] = useState(
    '{"from": "yourname", "to": "otheruser", "quantity": "1.00000000 WAX", "memo": "" }'
  );
  const [buyCPU, setbuyCPU] = useState(true);
  const [ms, setMS] = useState(1);

  const [landToBoost, setLandToBoost] = useState("");
  const [amountToBoost, setAmountToBoost] = useState(4);
  const [numTimesToBoost, setNumTimesToBoost] = useState(1);

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

  const getFirstApiCall = async () => {
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
  };

  useEffect(() => {
    const run = async () => {
      if (response) {
        try {
          const table = response.r1;
          // console.log(table["rows"][0]);

          const ex = parseFloat(table["rows"][0].exponent);
          const tw = parseFloat(table["rows"][0].total_wax);
          const cl = parseFloat(table["rows"][0].current_loaned);
          const mdf = parseFloat(table["rows"][0].multi_day_fee);

          setTotalWax(table["rows"][0].total_wax);
          setFreeWax(tw - cl + " WAX");

          if (amountToSend && amountToSend > 0) {
            var multiplier = Math.pow(1.0 - cl / tw, ex) * 850;
            if (multiplier < 200) {
              multiplier = 200;
            }
            var total =
              multiplier *
              (1 - mdf * (numberOfDaysOption - 1)) *
              (amountToSend / numberOfDaysOption);
            // console.log(total);
            setAmountToBeStaked(total);
          } else {
            setAmountToBeStaked(0);
          }
          if (account) {
            const table2 = response.r2;
            setCurrentBalance("0 WAX");
            for (var i = 0; i < table2["rows"].length; i++) {
              if (table2["rows"][i].account === account.account_name) {
                setCurrentBalance(table2["rows"][i].wax);
              }
            }
          }
        } catch (e) {
          console.error(e);
          console.log(JSON.stringify(e));
        }
      }
    };

    run();
  }, [amountToSend, numberOfDaysOption, response, account]);

  useEffect(() => {
    const run = async () => {
      if (wallet) {
        try {
          const acc = await rpc.get_account(wallet.name);
          setAccount(acc);
          getFirstApiCall();
        } catch (e) {
          console.error(e);
          // process.exit();
          console.log(JSON.stringify(e));
        }
      }
    };
    run();
  }, [wallet]);

  const renderLoginButton = () => {
    return (
      <div>
        <button
          onClick={() => {
            Login();
          }}
        >
          Login Test
        </button>
        <br />
      </div>
    );
  };

  const renderNameAndBalance = () => {
    return wallet.name && account ? (
      <div>
        {wallet.name} <br />
        Current Balance: {account.core_liquid_balance}
        <br />
      </div>
    ) : null;
  };

  const depositedWax = () => {
    return wallet.name && account ? (
      <div>
        Deposited: {currentBalance}
        <br />
        <br />
      </div>
    ) : null;
  };

  const waxSupply = () => {
    return (
      <div>
        Total Wax in System: {totalWax}
        <br />
        <p style={{ color: "red" }}>Wax Available to Rent: {freeWax}</p>
        <br />
      </div>
    );
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
          <option value={SEND_OPTIONS.free}>{SEND_OPTIONS.free}</option>
          <option value={SEND_OPTIONS.deposit}>{SEND_OPTIONS.deposit}</option>
          <option value={SEND_OPTIONS.update}>{SEND_OPTIONS.update}</option>
          <option value={SEND_OPTIONS.withdraw}>{SEND_OPTIONS.withdraw}</option>
          <option value={SEND_OPTIONS.test}>{SEND_OPTIONS.test}</option>
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
    } else if (sendOption === SEND_OPTIONS.free) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>{renderUserInput()}</tbody>
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
    } else if (sendOption === SEND_OPTIONS.test) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>
            {renderBoostInput()}
            {renderAmountToBoost()}
            {renderTimesToBoost()}
          </tbody>
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

  const renderBoostInput = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Name of Land to Boost</td>
        <td>
          <input
            style={{ width: "180px" }}
            type="text"
            value={landToBoost}
            onChange={(e) => setLandToBoost(e.target.value)}
          />{" "}
        </td>
      </tr>
    );
  };

  const renderAmountToBoost = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Amount to Boost Land</td>
        <td>
          <select
            value={amountToBoost}
            onChange={(e) => setAmountToBoost(e.target.value)}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={32}>32</option>
            <option value={64}>64</option>
          </select>
        </td>
      </tr>
    );
  };

  const renderTimesToBoost = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Times to Boost Land</td>
        <td>
          <select
            value={numTimesToBoost}
            onChange={(e) => setNumTimesToBoost(e.target.value)}
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
            <option value={15}>15</option>
          </select>
        </td>
      </tr>
    );
  };

  const renderContractInput = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Name of Smart Contract</td>
        <td>
          <input
            style={{ width: "180px" }}
            type="text"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
          />{" "}
        </td>
      </tr>
    );
  };

  const renderContractAction = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Action from Smart Contract</td>
        <td>
          <input
            style={{ width: "180px" }}
            type="text"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />{" "}
        </td>
      </tr>
    );
  };

  const renderContractData = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Action Data</td>
        <td>
          <input
            style={{ width: "480px" }}
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />{" "}
        </td>
      </tr>
    );
  };

  const renderPayCPU = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Buy CPU</td>
        <td>
          <input
            style={{ width: "60px" }}
            type="bool"
            value={buyCPU}
            onChange={(e) => setbuyCPU(e.target.value)}
          />{" "}
        </td>
      </tr>
    );
  };

  const renderMS = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>
          How many miliseconds do you need?
        </td>
        <td>
          <input
            style={{ width: "120px" }}
            type="number"
            value={ms}
            onChange={(e) => setMS(e.target.value)}
          />{" "}
        </td>
      </tr>
    );
  };

  const renderUpdateBalance = () => {
    return <tr></tr>;
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

  const renderTest = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Amount to Test</td>
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
      <div style={{ textAlign: "left", width: "400px", margin: "auto" }}>
        <h2>What is cpu4?</h2>
        <p>
          CPU4 is a new cpu renting system on the wax blockchain, created with
          help from the WAX Dev team and community members(Vaaaan,deraXyna). It
          allows anyone to rent cpu or deposit wax and earn from renting to
          others. The price is dynamically set between a 1% and 10% fee and it
          changes everytime someone deposits/withdraws/rents/returns wax. Users
          first send the fee then get staked the amount of wax it would pay for.
          Users are limited to how much they can rent in a single transaction
          but can make multiple requests as long as there is wax available.
          There is also a free system implemented but it has limits too.
        </p>
        <p>
          The system will be open for 1 week before allowing users to deposit
          their own wax to earn. If users find bugs there is a bug bounty
          program on discord.
        </p>
        <p style={{ color: "red" }}>
          Disclaimer: Deposits are open. Use at your own risk, all transactions
          are final and irreversible. There is no guarentee of profit or return.
          If bugs arise I will do my best to fix them asap.
        </p>
        <h2>How it works:</h2>
        <h4>
          Users can interact with the cpu4 and free.cpu4 smart contract in a
          number of ways:
        </h4>
        <p>1. Request cpu for themself</p>
        <p>2. Request cpu for a different user</p>
        <p>3. Requesting free cpu</p>
        <p>4. Deposit wax to earn</p>
        <p>5. Update user collected fees</p>
        <p>6. Withdraw deposited wax</p>
        <p>
          <b>
            <i>All transactions are final.</i>
          </b>
        </p>
        <h4>Request CPU for Self</h4>
        <p>Send wax to cpu4</p>
        <p>
          The system dynamically creates a price for the staked wax given the
          current supply, total loaned out, number of days, and amount user
          requests.
        </p>
        <p>
          Then that wax is sent to a minion account and staked to the user for
          the given time.
        </p>
        <p></p>
        <h4>Request CPU for Others</h4>
        <p>
          Similar to requesting to yourself, this does the first few steps but
          then directly stakes to the user specified.
        </p>
        <p>The memo must contain USER:&lt;username&gt;,&lt;days&gt;</p>
        <p>This can be sent from anyone for anyone else.</p>
        <h4>Request Free CPU</h4>
        <p>Users can call the action getcpu from the contract free.cpu4.</p>
        <p>
          As long as this account has wax it will send in a specified amount to
          the main contract requesting cpu as if it was a regular user.
        </p>
        <p>
          It follows the same format as requesting cpu for a different user but
          it pays the wax from its balance.
        </p>
        <p>This can only be given to someone once per 48 hours.</p>
        <h4>Deposit to Earn</h4>
        <p>
          Users can also deposit wax to earn 70% of the total fees collected.
        </p>
        <p>You can send at least 1000 wax to cpu4 with the memo Deposit</p>
        <p>
          This will immediately update the system and you will earn part of any
          fees after that transaction.
        </p>
        <p>
          Users can do this at little or often as they would like, there is no
          maximum one can send in.
        </p>
        <h4>Update Collected Fees</h4>
        <p>
          This method is not required but will immediately update the table
          entry with how much wax the user has.
        </p>
        <p>
          At the top of this page under you current balance there is a deposited
          amount listed.
        </p>
        <p>
          This function will update the fees in the contract table and show you
          how much you could withdraw in total.
        </p>
        <h4>Withdraw Deposited Wax</h4>
        <p>At any time a user can request to withdraw deposited wax.</p>
        <p>
          A user can make as many withdraw requests as they want up to the total
          wax they have deposited.
        </p>
        <p>
          If there is not enough liquid wax, as more gets unstaked it will be
          sent in order to users in line to withdraw.
        </p>
        <h2>FAQ:</h2>
        <h4>How are fees calculated?</h4>
        <p>
          multiplier = (1.0 - (current loaned wax / total wax in
          system))^(exponent) * 100
        </p>
        <p>if the multiplier is less than 10 then we just use 10.</p>
        <p>
          total staked wax = multiplier * (1 - (multi day fee * (number of days
          requested - 1))) * (wax sent in / number of days requested)
        </p>
        <p>
          This process keeps the price dynamic based on the current load and
          changes with every buy or unstake
        </p>
        <h4>Is this code public?</h4>
        <p>
          All the website code is located at
          https://github.com/cpu4youu/cpu4youu.github.io
        </p>
        <h4>How do depositors earn?</h4>
        <p>
          Every time someone requests some wax they need to first send in a fee.
        </p>
        <p>That fee is broken up into 4 parts.</p>
        <p> 70% which goes to the depositors pool</p>
        <p> 15% goes to the admin.cpu4 account (For dev team)</p>
        <p> 10% goes to the reserve.cpu4 account</p>
        <p> 5% goes to the free.cpu4 account</p>
        <br></br>
        <p>
          As long as a user has some wax deposited they earn their share of the
          70% of the fees collected
        </p>
        <p>
          The admin fee funds the development of new updates and sets the system
          up to have great service
        </p>
        <p>
          The reserve is a special account. It collects fees until the current
          rate of wax to cpu is 1 - 10.
        </p>
        <p>
          Once this happens the system requests wax and all the wax in the
          reserve account get sent back to the cpu4 account.
        </p>
        <p>
          This does a few things, it lowers the current fee and rates the rate
          for users meaning before a user sends 1 wax in and gets 10
        </p>
        <p>
          staked but now maybe the send 1 in and get 20 staked. It also adds
          liquidity if users are trying to withdraw, and
        </p>
        <p>it grows the system wax which helps more users get access to cpu.</p>
        <p>
          Then finally the free.cpu4 account is set up as a completely free
          system. Users can directly go to the smart contract and{" "}
        </p>
        <p>
          enter a username to recieve some free cpu every 48 hours. As long as
          it has wax it can continue to service users.
        </p>
        <p>
          Since it is funded by the normal app, as long as the normal app is
          being used it will keep getting wax to give to users for free.
        </p>
        <p>
          The rates/fees and starting value for the free account are all subject
          to change. Any changes will be posted on this page.
        </p>
        <h4>How does staking work?</h4>
        <p>
          I use multiple minion accounts to stake to users on a per request
          basis.
        </p>
        <p>
          No minion stakes to more than 1 user at a time and so it can be very
          efficient.
        </p>
        <p>
          I also use a dynamic system to ustake and keep track of minions who
          are done but still not free.
        </p>
        <p>All smart contract code is proprietary software.</p>
        <h4>I found a bug, what do I do?</h4>
        <p>Please go to the discord and find the bug bounty channel.</p>
        <p>
          Depending no how severe it is, you can be compensated for posting it
          first.
        </p>
        <h4>I need help or have a question where do I go?</h4>
        <p>Discord: https://discord.gg/UJzBuRa9sY</p>
        <p>Telegram: https://t.me/joinchat/L2y-P0pVWS5lMTkx</p>
        <h4>Why did you start this, can I trust you?</h4>
        <p>
          I have been creating smart contracts and dapps for almost a year now
          but programming since 2014.
        </p>
        <p>
          The wax dev team sponsored my research and development in creating
          this service for everyone and I intend to keep updating it
        </p>
        <p>
          and bringing new features to users and allowing users free access to
          my services.
        </p>
        <p>Some wax projects I have worked on are:</p>
        <p> Nova Rally</p>
        <p> Olive Land</p>
        <p> Beast Garden</p>
        <p> Gods and Legends</p>
        <p> Poly Play</p>
        <p>
          I also have an Alien Worlds cpu service located at www.limitlesswax.co
        </p>
        <br></br>
        <p>Thank you for your time, I hope you enjoy my service!</p>
      </div>
    );
  };

  return (
    <div>
      <h1>CPU 4 SALE</h1>
      {wallet.name ? renderNameAndBalance() : null}
      {wallet.name ? depositedWax() : null}
      {waxSupply()}
      {wallet.name !== undefined}
      {wallet.name ? renderSelectSendOption() : null}
      <br />
      {renderFaq()}
    </div>
  );
};

class WCWWallet {
  name = "tempname";
  wax = null;

  constructor() {
    const wax = new waxjs.WaxJS({
      rpcEndpoint: "https://wax.greymass.com",
      tryAutoLogin: false,
    });
    wax.rpc = new JsonRpc("https://wax.greymass.com", {
      fetch,
    });
    this.wax = wax;
  }

  async checkLogin() {
    const isAutoLoginAvailable = await this.wax.isAutoLoginAvailable();
    console.log("check wax autoLogin", isAutoLoginAvailable);

    if (isAutoLoginAvailable) {
      console.log("wcw auto logined");
      this.name = this.wax.user.account;
      return {
        chainId:
          "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
        name: this.wax.user.account,
        authorization: {
          actor: this.wax.user.account,
          permission: "active",
        },
      };
    } else {
      return null;
    }
  }

  async login() {
    const userAccount = await this.wax.login();
    console.log("this.wax.user.account", this.wax.user.account);
    this.name = this.wax.user.account;
    return {
      chainId:
        "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
      name: this.wax.user.account,
      authorization: {
        actor: this.wax.user.account,
        permission: "active",
      },
    };
  }

  async logout() {
    this.wax = new waxjs.WaxJS({
      rpcEndpoint: "https://wax.greymass.com",
      tryAutoLogin: false,
    });
    return {};
  }

  async transact(packed) {
    console.log(packed);
    try {
      const trans = await this.wax.api.transact(packed, {
        blocksBehind: 3,
        expireSeconds: 1200,
      });
      return trans;
    } catch (e) {
      alert(e);
    }
  }

  async fetchTable(packed) {
    try {
      console.log(packed);
      const response = this.wax.rpc.get_table_rows(packed);
      return response;
    } catch (e) {
      console.log(e);
      return {};
    }
  }
}

const wallet = new WCWWallet();

async function Login() {
  try {
    const logined = await wallet.login();
    if (logined) {
      return logined;
    }
    return {};
  } catch (e) {
    console.log(e);
  }
}

async function checkLogin() {
  try {
    const autoLogined = await wallet.checkLogin();
    if (autoLogined != null) {
      return autoLogined;
    }
    return {};
  } catch (e) {
    console.log(e);
  }
}

async function fetchTable(packed) {
  const x = await wallet.fetchTable(packed);
  return x;
}

export async function transaction(packed) {
  await Login();
  const x = await wallet.transact(packed);
  return x;
}

export default Home;
