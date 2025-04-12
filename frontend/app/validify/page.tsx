'use client';

import React, { useState } from 'react';

type ValidUsers = {
  [key: string]: string;
};

type Balances = {
  [key: string]: number;
};

export default function Validify() {
  const [section, setSection] = useState<'make' | 'verify' | 'show' | 'balance'>('make');
  const [message, setMessage] = useState('');
  const [txData, setTxData] = useState<any[]>([]);
  const [balance, setBalance] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false); // ✅ added

  const validUsers: ValidUsers = {
    'manoj': '1234',
    'adrian': 'pass',
    'suhas': 'abcd'
  };

  const transactions = [
    { sender: 'manoj', receiver: 'sejal', amount: 10 },
    { sender: 'adrian', receiver: 'punith', amount: 20 },
    { sender: 'suhas', receiver: 'bilal', amount: 15 }
  ];

  const validHashes = ['abc123', 'def456', 'ghi789'];

  const balances: Balances = {
    'adrian': 70,
    'punith': 45,
    'suhas': 100
  };

  const handleTransaction = (e: any) => {
    e.preventDefault();
    setHasSubmitted(true);
    const sender = e.target.sender.value;
    const receiver = e.target.receiver.value;
    const amount = parseFloat(e.target.amount.value);
    const password = e.target.password.value;

    const validPair = transactions.find(tx => tx.sender === sender && tx.receiver === receiver && amount <= 25);

    if (validUsers[sender] === password && validPair) {
      setMessage('✅ Transaction Successful');
    } else {
      setMessage('❌ Transaction Denied');
    }
  };

  const handleVerify = (e: any) => {
    e.preventDefault();
    setHasSubmitted(true);
    const hash = e.target.hash.value;

    if (validHashes.includes(hash)) {
      setMessage('✅ Transaction Verified');
    } else {
      setMessage('❌ Invalid Transaction Hash');
    }
  };

  const handleShowTx = (e: any) => {
    e.preventDefault();
    setHasSubmitted(true);
    const name = e.target.name.value;

    const filtered = transactions.filter(tx =>
      tx.sender.toLowerCase() === name.toLowerCase() ||
      tx.receiver.toLowerCase() === name.toLowerCase()
    );

    if (filtered.length > 0) {
      setTxData(filtered);
      setMessage('');
    } else {
      setTxData([]);
      setMessage('❌ No transactions found for this user');
    }
  };

  const handleBalance = (e: any) => {
    e.preventDefault();
    setHasSubmitted(true);
    const name = e.target.name.value;

    if (balances[name]) {
      setBalance(`${name}'s balance: ₹${balances[name]}`);
    } else {
      setBalance('❌ No balance info available for this name');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🔗 Validify Blockchain Portal</h1>

      <div className="flex justify-center gap-4 mb-6">
        {['make', 'verify', 'show', 'balance'].map((sec) => (
          <button
            key={sec}
            onClick={() => { setSection(sec as any); setMessage(''); setHasSubmitted(false); setBalance(''); }}
            className={`px-6 py-3 rounded text-white ${
              sec === 'make' ? 'bg-blue-600 hover:bg-blue-700' :
              sec === 'verify' ? 'bg-green-600 hover:bg-green-700' :
              sec === 'show' ? 'bg-yellow-600 hover:bg-yellow-700' :
              'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {sec === 'make' && 'Make Transaction'}
            {sec === 'verify' && 'Verify Transaction'}
            {sec === 'show' && 'Show Transaction'}
            {sec === 'balance' && 'Check Balances'}
          </button>
        ))}
      </div>

      {section === 'make' && (
        <form onSubmit={handleTransaction} className="space-y-4">
          <input name="sender" placeholder="Sender Name" required className="p-2 border rounded w-full" />
          <input name="receiver" placeholder="Receiver Name" required className="p-2 border rounded w-full" />
          <input name="amount" type="number" placeholder="Amount < 25" required className="p-2 border rounded w-full" />
          <input name="password" type="password" placeholder="Password" required className="p-2 border rounded w-full" />
          <button type="submit" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">Submit Transaction</button>
        </form>
      )}

      {section === 'verify' && (
        <form onSubmit={handleVerify} className="space-y-4">
          <input name="hash" placeholder="Enter Transaction Hash" required className="p-2 border rounded w-full" />
          <button type="submit" className="mt-4 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">Verify Transaction</button>
        </form>
      )}

      {section === 'show' && (
        <form onSubmit={handleShowTx} className="space-y-4">
          <input name="name" placeholder="Enter Name to View Transactions" required className="p-2 border rounded w-full" />
          <button type="submit" className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600">Show Transaction</button>
          {txData.length > 0 && (
            <div className="mt-4 space-y-2">
              {txData.map((tx, idx) => (
                <div key={idx} className="border p-4 rounded-lg bg-gray-100 text-black">
                  <p><strong>Sender:</strong> {tx.sender}</p>
                  <p><strong>Receiver:</strong> {tx.receiver}</p>
                  <p><strong>Amount:</strong> ₹{tx.amount}</p>
                  <p><strong>Status:</strong> Verified</p>
                </div>
              ))}
            </div>
          )}
        </form>
      )}

      {section === 'balance' && (
        <form onSubmit={handleBalance} className="space-y-4">
          <input name="name" placeholder="Enter Name" required className="p-2 border rounded w-full" />
          <button type="submit" className="mt-4 px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-600">Check Balance</button>
          {balance && <p className="mt-4 text-lg font-semibold">{balance}</p>}
        </form>
      )}

      {/* ✅ Show message only after submission */}
      {hasSubmitted && message && (
        <p className="mt-6 text-xl font-semibold text-center">
          {message}
        </p>
      )}
    </div>
  );
}