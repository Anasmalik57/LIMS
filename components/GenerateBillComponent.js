"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaPrint,
  FaSave,
  FaSpinner,
  FaCalculator,
  FaReceipt,
} from "react-icons/fa";
import Image from "next/image";

const GenerateBillComponent = () => {
  const params = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rupeesDiscount, setRupeesDiscount] = useState(0);
  const [percentDiscount, setPercentDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [saving, setSaving] = useState(false);

  // Fetch patient data and existing bill
  const fetchPatient = useCallback(async () => {
    if (!params.id) {
      setError("Invalid patient ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/generatebill/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch patient data");
      }
      const data = await response.json();

      if (data.success) {
        setPatient(data.patient);
        // Check if an existing bill exists and pre-fill discounts
        if (data.existingBill) {
          setRupeesDiscount(data.existingBill.rupeesDiscount || 0);
          setPercentDiscount(data.existingBill.percentDiscount || 0);
          setFinalAmount(
            data.existingBill.finalAmount || data.patient.totalPrice
          );
        } else {
          setFinalAmount(data.patient.totalPrice); // Default to totalPrice if no existing bill
        }
      } else {
        setError(data.message || "Failed to fetch patient");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch patient");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  // Calculate final amount when discounts change
  useEffect(() => {
    if (patient) {
      const amount = patient.totalPrice;
      const percentOff =
        percentDiscount > 0 ? (amount * percentDiscount) / 100 : 0;
      const final = Math.max(0, amount - percentOff - (rupeesDiscount || 0));
      setFinalAmount(final);
    }
  }, [rupeesDiscount, percentDiscount, patient]);

  // Handle saving the bill
  const handleSaveBill = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/generatebill/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rupeesDiscount,
          percentDiscount,
          finalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save bill");
      }

      const data = await response.json();

      if (data.success) {
        alert("Bill generated and saved successfully!");
        router.push("/allBills");
      } else {
        throw new Error(data.message || "Failed to save bill");
      }
    } catch (err) {
      console.error("Error saving bill:", err);
      alert(err.message || "Failed to save bill");
    } finally {
      setSaving(false);
    }
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <FaSpinner className="animate-spin text-blue-500 text-2xl mx-auto mb-3" />
          <p className="text-slate-600 text-sm">Loading Patient Data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <div className="text-red-400 text-3xl mb-3">⚠️</div>
          <h1 className="text-lg font-semibold text-slate-800 mb-2">
            Something went wrong
          </h1>
          <p className="text-slate-600 text-sm mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // No patient found
  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <h1 className="text-lg font-semibold text-slate-800 mb-4">
            No Patient Found
          </h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 print:bg-white">
      <div className="flex max-w-7xl mx-auto gap-6 p-4 print:p-0">
        {/* Main Bill Document */}
        <div className="flex-1 print:max-w-none">
          <div className="bg-white shadow-xl print:shadow-none rounded-2xl print:rounded-none overflow-hidden border border-slate-200 print:border-none">
            {/* Header */}
            <div className="border-b border-gray-300 p-6 px-4 bg-gradient-to-tl from-blue-300 via-blue-300 to-blue-400">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 w-full px-2 justify-between">
                  <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center border-[1.2px] border-blue-500">
                    <div className="w-12 h-12 p-1  rounded-full flex items-center justify-center">
                      {/* <span className="text-white font-bold text-xl">🏥</span> */}
                      <Image
                        src={"/global_labs_Logo.png"}
                        width={300}
                        height={300}
                        alt="global_labs_Logo"
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 border-2 rounded-sm border-gray-800 px-4 py-1 print:text-2xl">
                      GLOBAL PATHOLOGY LAB
                    </h1>
                  </div>
                  <div className="*:font-semibold">
                    <p className="text-red-600 text-sm font-semibold mt-1">
                      Shekhpura Roorkee, Haridwar (U.K)
                    </p>
                    <p className="text-gray-700 text-sm">
                      Phone: 9927782011, 9084648712
                    </p>
                    <p className="text-gray-700 text-xs">
                      Email: imrantyagi201@gmail.com, javadmalik379@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 print:p-3 space-y-4">
              {/* Patient Information */}
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <FaReceipt className="text-blue-500 text-xs" />
                  Patient Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-slate-500 block">Name:</span>
                    <span className="font-medium text-slate-800">
                      {patient.patientName}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-slate-500 block">Age:</span>
                    <span className="font-medium text-slate-800">
                      {patient.age}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-slate-500 block">Gender:</span>
                    <span className="font-medium text-slate-800">
                      {patient.gender}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-slate-500 block">Mobile:</span>
                    <span className="font-medium text-slate-800">
                      {patient.mobile}
                    </span>
                  </div>
                  {patient.address && (
                    <div className="bg-slate-50 p-2 rounded md:col-span-2">
                      <span className="text-slate-500 block">Address:</span>
                      <span className="font-medium text-slate-800">
                        {patient.address}
                      </span>
                    </div>
                  )}
                  {patient.refBy && (
                    <div className="bg-slate-50 p-2 rounded">
                      <span className="text-slate-500 block">Referred By:</span>
                      <span className="font-medium text-slate-800">
                        {patient.refBy}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tests Section */}
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-3">
                  Tests Conducted
                </h3>
                <div className="bg-slate-50 p-3 rounded ">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {patient.tests.map((test, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {test.testCode}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600">
                    Total Tests:{" "}
                    <span className="font-semibold">
                      {patient.tests.length}
                    </span>
                  </p>
                </div>
              </div>

              {/* Billing Summary */}
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-3">
                  Billing Summary
                </h3>
                <div className="bg-slate-50 p-3 rounded ">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="font-semibold">
                        ₹{patient.totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {rupeesDiscount > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>Discount (Rupees):</span>
                        <span>-₹{rupeesDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    {percentDiscount > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>Discount ({percentDiscount}%):</span>
                        <span>
                          -₹
                          {(
                            patient.totalPrice *
                            (percentDiscount / 100)
                          ).toFixed(2)}
                        </span>
                      </div>
                    )}

                    <hr className="border-slate-300" />

                    <div className="flex justify-between text-base font-bold bg-green-100 p-2 py-3 rounded">
                      <span>Final Amount:</span>
                      <span className="text-green-600">
                        ₹{finalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-4 px-6 print:p-3 bg-slate-50 print:bg-white">
              <div className="flex justify-between items-end">
                <div className="text-center">
                  <div className="w-24 h-12 border-b border-slate-400 mb-1 flex items-end justify-center">
                    <Image
                      src="/image.png"
                      width={100}
                      height={40}
                      alt="Dr. Azam Tyagi"
                    />
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    DR AZAM TYAGI
                  </p>
                  <p className="text-xs text-slate-600">
                    M.D PATHOLOGIST 66154
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-12 border-b border-slate-400 mb-1 flex items-end justify-center">
                    <Image
                      src="/image.png"
                      width={100}
                      height={40}
                      alt="M. Tyagi"
                    />
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    M.TYAGI (B.M.L.T)
                  </p>
                  <p className="text-xs text-slate-600 opacity-0">BMLT</p>
                </div>
              </div>

              {/* {patient.collectedBy && (
                <div className="text-center mt-3 pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-600">
                    <strong>Collected By:</strong> {patient.collectedBy}
                  </p>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Fixed Right Sidebar - Controls */}
        <div className="w-80 print:hidden">
          <div className="sticky top-4 space-y-4">
            {/* Discount Controls */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4">
              <h2 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FaCalculator className="text-blue-500 text-xs" />
                Bill Settings
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Rupees Discount (₹)
                  </label>
                  <input
                    type="number"
                    value={rupeesDiscount}
                    onChange={(e) =>
                      setRupeesDiscount(parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Percent Discount (%)
                  </label>
                  <input
                    type="number"
                    value={percentDiscount}
                    onChange={(e) =>
                      setPercentDiscount(parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>

                {/* Live Preview */}
                <div className="bg-slate-50 p-3 rounded-lg border text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Original:</span>
                      <span>₹{patient.totalPrice.toFixed(2)}</span>
                    </div>
                    {(rupeesDiscount > 0 || percentDiscount > 0) && (
                      <>
                        {rupeesDiscount > 0 && (
                          <div className="flex justify-between text-red-600">
                            <span>- Rupees:</span>
                            <span>₹{rupeesDiscount.toFixed(2)}</span>
                          </div>
                        )}
                        {percentDiscount > 0 && (
                          <div className="flex justify-between text-red-600">
                            <span>- {percentDiscount}%:</span>
                            <span>
                              ₹
                              {(
                                patient.totalPrice *
                                (percentDiscount / 100)
                              ).toFixed(2)}
                            </span>
                          </div>
                        )}
                        <hr className="border-slate-300" />
                      </>
                    )}
                    <div className="flex justify-between font-semibold text-green-600">
                      <span>Final:</span>
                      <span>₹{finalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4">
              <div className="space-y-2">
                <button
                  onClick={handleSaveBill}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  {saving ? "Saving..." : "Save Bill"}
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  <FaPrint /> Print Bill
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">
                Quick Stats
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Patient:</span>
                  <span className="font-medium">{patient.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tests:</span>
                  <span className="font-medium">{patient.tests.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Savings:</span>
                  <span className="font-medium text-red-600">
                    ₹{(patient.totalPrice - finalAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateBillComponent;
