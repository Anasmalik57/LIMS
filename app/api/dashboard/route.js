// app/api/dashboard/route.js

import connectDB from '@/database/connectDB';
import Patient from '@/models/Patient';
import Doctor from '@/models/Doctor';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';
    
    // Calculate date range based on period
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    
    // Fetch all data in parallel
    const [patients, doctors, users] = await Promise.all([
      Patient.find({}).sort({ createdAt: -1 }),
      Doctor.find({}).sort({ createdAt: -1 }),
      User.find({}).sort({ createdAt: -1 })
    ]);
    
    // Filter patients by date range
    const recentPatients = patients.filter(patient => 
      new Date(patient.createdAt) >= startDate
    );
    
    // Calculate statistics
    const stats = calculateStats(patients, recentPatients);
    
    // Generate chart data
    const chartData = generateChartData(recentPatients, period);
    
    // Generate test distribution data
    const testDistribution = generateTestDistribution(patients);
    
    // Get recent patients for table (limit to 10)
    const recentPatientsForTable = patients.slice(0, 10);
    
    const dashboardData = {
      patients,
      doctors,
      users,
      stats,
      recentPatients: recentPatientsForTable,
      testDistribution,
      chartData
    };
    
    return NextResponse.json(dashboardData);
    
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: error.message },
      { status: 500 }
    );
  }
}

// Helper function to calculate statistics
function calculateStats(allPatients, recentPatients) {
  const totalPatients = allPatients.length;
  
  // Calculate total tests and completed tests
  let totalTests = 0;
  let completedTests = 0;  
  let pendingTests = 0;
  let totalRevenue = 0;
  
  allPatients.forEach(patient => {
    totalTests += patient.tests?.length || 0;
    totalRevenue += patient.totalPrice || 0;
    
    patient.tests?.forEach(test => {
      if (test.status === 'Completed') {
        completedTests++;
      } else {
        pendingTests++;
      }
    });
  });
  
  return {
    totalPatients,
    totalTests,
    pendingReports: pendingTests,
    totalRevenue,
    completedTests,
    pendingTests
  };
}

// Helper function to generate chart data
function generateChartData(patients, period) {
  const chartData = [];
  const now = new Date();
  
  // Determine number of data points based on period
  let dataPoints, intervalMs, labelFormat;
  
  switch (period) {
    case '7d':
      dataPoints = 7;
      intervalMs = 24 * 60 * 60 * 1000; // 1 day
      labelFormat = (date) => date.toLocaleDateString('en-IN', { weekday: 'short' });
      break;
    case '30d':
      dataPoints = 30;
      intervalMs = 24 * 60 * 60 * 1000; // 1 day
      labelFormat = (date) => date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      break;
    case '90d':
      dataPoints = 12;
      intervalMs = 7 * 24 * 60 * 60 * 1000; // 1 week
      labelFormat = (date) => `Week ${Math.ceil(date.getDate() / 7)}`;
      break;
    case '1y':
      dataPoints = 12;
      intervalMs = 30 * 24 * 60 * 60 * 1000; // ~1 month
      labelFormat = (date) => date.toLocaleDateString('en-IN', { month: 'short' });
      break;
    default:
      dataPoints = 7;
      intervalMs = 24 * 60 * 60 * 1000;
      labelFormat = (date) => date.toLocaleDateString('en-IN', { weekday: 'short' });
  }
  
  // Generate data points
  for (let i = dataPoints - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * intervalMs);
    const nextDate = new Date(date.getTime() + intervalMs);
    
    // Count patients and tests in this interval
    const patientsInInterval = patients.filter(patient => {
      const patientDate = new Date(patient.createdAt);
      return patientDate >= date && patientDate < nextDate;
    });
    
    const testsInInterval = patientsInInterval.reduce((total, patient) => {
      return total + (patient.tests?.length || 0);
    }, 0);
    
    chartData.push({
      name: labelFormat(date),
      patients: patientsInInterval.length,
      tests: testsInInterval,
      date: date.toISOString()
    });
  }
  
  return chartData;
}

// Helper function to generate test distribution data
function generateTestDistribution(patients) {
  const testCounts = {};
  let totalTests = 0;
  
  // Count all tests by type
  patients.forEach(patient => {
    patient.tests?.forEach(test => {
      const testName = test.testName || test.name || 'Unknown Test';
      testCounts[testName] = (testCounts[testName] || 0) + 1;
      totalTests++;
    });
  });
  
  // Convert to percentage and format for chart
  const testDistribution = Object.entries(testCounts)
    .map(([name, count]) => ({
      name,
      value: Math.round((count / totalTests) * 100),
      count,
      color: getRandomColor()
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Top 6 tests
  
  return testDistribution;
}

// Helper function to generate random colors for pie chart
function getRandomColor() {
  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#6B7280'  // Gray
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}

// Optional: Add POST method for updating dashboard data
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { action, data } = body;
    
    switch (action) {
      case 'refresh':
        // Trigger a data refresh
        return NextResponse.json({ message: 'Data refresh triggered' });
      
      case 'updateStats':
        // Update specific statistics
        return NextResponse.json({ message: 'Stats updated successfully' });
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Dashboard POST API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error.message },
      { status: 500 }
    );
  }
}