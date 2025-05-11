import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Referral = () => {
  const [userId] = useState("hardik"); // Replace with dynamic user context
  const [copied, setCopied] = useState(false);
  const [tree, setTree] = useState(null);
  const referralLink = `${window.location.origin}/?ref=${userId}`;

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Error copying link:', err);
    }
  };

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get('/api/referrals/tree?userId=user555');
        setTree(response.data);
      } catch (error) {
        console.error('Failed to load tree:', error);
      }
    };
  
    fetchTree();
  }, []);
  

  const renderTree = (node) => {
    if (!node) return null;
    return (
      <ul className="ml-6 mt-2 border-l-2 border-gray-500 pl-4">
        <li>
          <span className="font-semibold">{node.userId}</span>
          {node.left || node.right ? (
            <div className="ml-4">
              {renderTree(node.left)}
              {renderTree(node.right)}
            </div>
          ) : null}
        </li>
      </ul>
    );
  };

  return (
    <div className="referral-container p-6 bg-gray-900 text-white rounded shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Invite Your Friends!</h2>
      <p className="mb-2">Share this referral link:</p>
      <div className="flex items-center mb-3">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-grow p-2 mr-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={copyReferralLink}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
        >
          Copy
        </button>
      </div>
      {copied && <p className="text-green-400 text-sm mb-4">Referral link copied!</p>}

      <h3 className="text-xl font-semibold mt-6 mb-2">Your Referral Tree</h3>
{tree ? (
  renderTree(tree) // Assuming renderTree is a function that visually displays the tree structure
) : (
  <p className="text-gray-400">
    Alice (ALICE123)
    <br />
    / &nbsp; \ 
    <br />
    Bob &nbsp;&nbsp;&nbsp;&nbsp; (empty)
    <br />
    <br />
    Dhoni (DHONI001)
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
    <br />
    Newuser123 (NEWUSER123)
    <br />
    <br />
    Sachin (SACHIN001)
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp; / &nbsp; \ 
    <br />
    Rahul &nbsp;&nbsp;&nbsp;&nbsp; Dravid
  </p>
)}

    </div>
  );
};

export default Referral;
