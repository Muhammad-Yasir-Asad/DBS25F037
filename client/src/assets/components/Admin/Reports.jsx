import React, { useState } from "react";
import axios from "axios";

const reports = [
  { name: "Blocked Report", path: "Blocked_Report" },
  { name: "Clients Report", path: "ClientsReport" },
  { name: "Completed Order Report", path: "CompletedOrderReport", param: "date", type: "date" },
  { name: "Freelancer Order Report", path: "FreelacnerOrderReport", param: "orders", type: "number" },
  { name: "Freelancer Experience Report", path: "FreelancerExperinceReport", param: "years", type: "number" },
  { name: "Freelancer Report", path: "FreeLancerReport" },
  { name: "Gig Report", path: "GigReport" },
  { name: "Order Coin Report", path: "OrderCoinReport", param: "coins", type: "number" },
  { name: "Order Report", path: "OrderReport" },
  { name: "Package Report", path: "PackageReport" },
  { name: "Wallet Report", path: "WalletReport" },
];

const ReportDownloader = () => {
  const [inputs, setInputs] = useState({});
  const [pdfUrl, setPdfUrl] = useState(null);
  const [currentReport, setCurrentReport] = useState("");

  const handleDownload = async (report, action = "download") => {
    try {
      let url = `https://skillhub.runasp.net/api/report/${report.path}`;
      if (report.param && inputs[report.path]) {
        const paramVal = encodeURIComponent(inputs[report.path]);
        url += `?${report.param}=${paramVal}`;
      }

      const response = await axios.get(url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);

      if (action === "download") {
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${report.path}.pdf`;
        link.click();
      } else {
        setPdfUrl(blobUrl);
        setCurrentReport(report.name);
      }
    } catch (error) {
      alert("Error: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Reports</h1>

      <div className="grid gap-4 mb-10">
        {reports.map((report) => (
          <div key={report.path} className="p-4 border rounded-xl shadow flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-grow">
              <p className="font-semibold">{report.name}</p>
              {report.param && (
                <input
                  type={report.type}
                  placeholder={`Enter ${report.param}`}
                  className="mt-2 p-2 border rounded w-full md:w-64"
                  value={inputs[report.path] || ""}
                  onChange={(e) => setInputs({ ...inputs, [report.path]: e.target.value })}
                />
              )}
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleDownload(report, "view")}
              >
                View
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => handleDownload(report, "download")}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {pdfUrl && (
        <div className="border rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">{currentReport}</h2>
          <iframe
            src={pdfUrl}
            title="PDF Report"
            className="w-full h-[700px] border rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ReportDownloader;
