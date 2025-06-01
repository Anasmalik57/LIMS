"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  FaUser, 
  FaPhone, 
  FaBirthdayCake, 
  FaVenusMars, 
  FaMapMarkerAlt,
  FaUserMd,
  FaFlask,
  FaRupeeSign,
  FaCalendarAlt,
  FaPrint,
  FaDownload,
  FaArrowLeft,
  FaHospital,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

// You'll need to create this server action to fetch report by ID
const getReportById = async (id) => {
  try {
    const response = await fetch(`/api/report/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch report');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching report:', error);
    return { success: false, message: error.message };
  }
};

const ReportPage = () => {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        // You'll need to implement this API endpoint
        const response = await fetch(`/api/report/${params.id}`);
        const data = await response.json();
        
        if (data.success) {
          setReport(data.report);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch report');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReport();
    }
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download logic here
    alert('PDF download functionality to be implemented');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">Error</h1>
          <p className="text-slate-300 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-400 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-white mb-2">Report Not Found</h1>
          <p className="text-slate-300 mb-4">The requested report could not be found.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto print:mt-0">
        
        {/* Header Actions - Hidden in print */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
          >
            <FaArrowLeft />
            Back
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPrint />
              Print
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaDownload />
              Download PDF
            </button>
          </div>
        </div>

        {/* Report Container */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">
          
          {/* Lab Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 print:bg-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FaHospital className="text-2xl" />
                  <h1 className="text-3xl font-bold">MediLab Diagnostics</h1>
                </div>
                <p className="text-blue-100">Advanced Pathology & Diagnostic Center</p>
                <p className="text-blue-100 text-sm">📧 info@medilab.com | 📞 +91-9876543210</p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4">
                  <p className="text-sm text-blue-100">Report ID</p>
                  <p className="font-mono text-lg font-bold">{report._id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaUser className="text-blue-600" />
              Patient Information
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patient Name</p>
                  <p className="font-semibold text-gray-800">{report.patientName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaPhone className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <p className="font-semibold text-gray-800">{report.mobile}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaBirthdayCake className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-semibold text-gray-800">{report.age} years</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <FaVenusMars className="text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-semibold text-gray-800">{report.gender}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FaCalendarAlt className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Report Date</p>
                  <p className="font-semibold text-gray-800">{formatDate(report.createdAt)}</p>
                </div>
              </div>

              {report.refBy && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <FaUserMd className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Referred By</p>
                    <p className="font-semibold text-gray-800">{report.refBy}</p>
                  </div>
                </div>
              )}
            </div>

            {report.address && (
              <div className="mt-6 flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold text-gray-800">{report.address}</p>
                </div>
              </div>
            )}
          </div>

          {/* Test Results */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaFlask className="text-green-600" />
              Test Results
            </h2>

            <div className="space-y-4">
              {report.tests.map((test, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{test.testName}</h3>
                      <p className="text-sm text-gray-500">Code: {test.testCode}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        {test.status === 'Completed' ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <FaCheckCircle />
                            <span className="text-sm font-semibold">Completed</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-yellow-600">
                            <FaClock />
                            <span className="text-sm font-semibold">Pending</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <FaRupeeSign className="text-sm" />
                        <span className="font-semibold">₹{test.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  {test.result && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Result:</p>
                      <p className="font-medium text-gray-800">{test.result}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Total Amount</h3>
                  <p className="text-sm text-gray-500">Including all tests</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                    <FaRupeeSign />
                    <span>{report.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              This is a computer-generated report and does not require a signature.
            </p>
            <p className="text-xs text-gray-500">
              Report generated on {formatDate(new Date())} | MediLab Diagnostics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;