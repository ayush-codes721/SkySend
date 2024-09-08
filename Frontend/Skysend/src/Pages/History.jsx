import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState, authToken } from "../atoms/AppAtoms";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useRecoilValue(authToken); // Replace with your actual token logic
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth == false) {
      navigate("/login");
      return;
    }
    async function fetchMails() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/mails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMails(response.data.data.mails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mails:", error);
        setLoading(false);
      }
    }

    fetchMails();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 mt-8">
      {" "}
      {/* Added mt-8 for top margin */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mx-auto">
        {" "}
        {/* Added mx-auto for centering */}
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Sent Mails</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subject
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Body
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  To Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mails.map((mail) => (
                <tr key={mail.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {mail.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mail.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mail.body}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mail.toEmail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
