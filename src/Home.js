import React, { useEffect, useState } from "react";
import { JsonRpc } from "eosjs";

const rpc = new JsonRpc("https://api.wax.alohaeos.com", { fetch });

const Home = ({ ual }) => {
  const transactionStakeToSelf = async () => {
    const actions = {
      actions: [
        {
          account: "s.rplanet",
          name: "claim",
          authorization: [
            {
              actor: ual.activeUser.accountName,
              permission: "active",
            },
          ],
          data: {
            to: ual.activeUser.accountName,
          },
        },
      ],
    };

    const r = await ual.activeUser.signTransaction(actions, {
      broadcast: true,
    });
    console.log(r);
  };

  const SEND_OPTIONS = {
    self: "Stake to self",
    other: "Stake to other",
    deposit: "Deposit and earn",
  };

  const TRANSACTIONS = {
    [SEND_OPTIONS.self]: transactionStakeToSelf,
  };

  const [account, setAccount] = useState();
  const [sendOption, setSendOption] = useState(SEND_OPTIONS.self);
  const [numberOfDaysOption, setNumberOfDaysOptions] = useState(1);
  const [amountToSend, setAmountToSend] = useState(0);
  const [amountToBeStaked, setAmountToBeStaked] = useState(0);
  const [accountToStake, setAccountToStake] = useState("");

  useEffect(() => {
    const run = async () => {
      if (ual.activeUser) {
        const acc = await rpc.get_account(ual.activeUser.accountName);
        setAccount(acc);
      }
    };
    run();
  }, [ual.activeUser]);

  useEffect(() => {
    if (amountToSend && amountToSend > 0) {
      // CALL CONTRACT / DO CALCULATION
      setAmountToBeStaked(amountToSend * 100);
    } else {
      setAmountToBeStaked(0);
    }
  }, [amountToSend]);

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
        {ual.activeUser.accountName} {account.core_liquid_balance}
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
            {renderNumberOfDaysDropdown()}
            {renderAmountToSendInput()}
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
            {renderAccountToStake()}
            {renderNumberOfDaysDropdown()}
            {renderAmountToSendInput()}
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
    }
  };

  const renderAccountToStake = () => {
    return (
      <tr>
        <td style={{ textAlign: "right" }}>Account to stake</td>
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
        <h3>How it works:</h3>
        <p>1. Send wax</p>
        <p>2. ????????</p>
        <p>3. Get steak</p>
      </div>
    );
  };

  return (
    <div>
      <h1>CPU 4 SALE</h1>
      {ual.activeUser ? renderNameAndBalance() : null}
      {ual.activeUser ? renderLogoutButton() : renderLoginButton()}
      {ual.activeUser ? renderSelectSendOption() : null}
      <br />
      {renderFaq()}
    </div>
  );
};

export default Home;
