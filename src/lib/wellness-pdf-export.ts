import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { Timestamp } from 'firebase/firestore';

interface WellnessData {
  moodData: any[];
  meditationData: any[];
  nutritionData: any[];
  activityData: any[];
  sleepData: any[];
  journalData: any[];
  breathingData: any[];
  waterData: any[];
}

interface ProcessedWellnessData {
  activityChartData: any[];
  sleepChartData: any[];
  nutritionChartData: any[];
  moodChartData: any[];
  meditationChartData: any[];
  waterChartData: any[];
}

export const exportWellnessReportToPDF = async (
  data: WellnessData,
  processedData: ProcessedWellnessData,
  userName?: string
) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;
  
  // Function to capture chart as image
  const captureChart = async (chartId: string): Promise<string | null> => {
    try {
      const chartElement = document.getElementById(chartId);
      if (!chartElement) return null;
      
      const canvas = await html2canvas(chartElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error capturing chart:', error);
      return null;
    }
  };
  
  // Function to add image to PDF
  const addImageToPDF = (imageData: string, width: number, height: number) => {
    const aspectRatio = height / width;
    const maxWidth = contentWidth;
    const maxHeight = 80; // Max height for charts
    
    let imgWidth = maxWidth;
    let imgHeight = imgWidth * aspectRatio;
    
    if (imgHeight > maxHeight) {
      imgHeight = maxHeight;
      imgWidth = imgHeight / aspectRatio;
    }
    
    // Center the image
    const xPos = margin + (contentWidth - imgWidth) / 2;
    
    doc.addImage(imageData, 'PNG', xPos, yPosition, imgWidth, imgHeight);
    yPosition += imgHeight + 10;
  };
  
  // Helper function to add text with word wrap
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.35);
  };
  
  // Helper function to add a new page if needed
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };
  
  // Title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Wellness Report', margin, yPosition, contentWidth, 24);
  yPosition += 5;
  
  // Date and user info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const reportDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  yPosition = addText(`Generated on: ${reportDate}`, margin, yPosition, contentWidth, 12);
  if (userName) {
    yPosition = addText(`User: ${userName}`, margin, yPosition, contentWidth, 12);
  }
  yPosition += 10;
  
  // Executive Summary
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Executive Summary', margin, yPosition, contentWidth, 16);
  yPosition += 5;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  // Calculate summary statistics
  const totalActivity = processedData.activityChartData.reduce((sum, d) => sum + d.minutes, 0);
  const totalCalories = processedData.nutritionChartData.reduce((sum, d) => sum + d.calories, 0);
  const avgCalories = Math.round(totalCalories / 7);
  const avgMood = Math.round(processedData.moodChartData.reduce((sum, d) => sum + d.mood, 0) / 7);
  const avgSleep = Math.round((processedData.sleepChartData.reduce((sum, d) => sum + d.hours, 0) / 7) * 10) / 10;
  const activeDays = processedData.activityChartData.filter(d => d.minutes > 0).length;
  const totalMeditation = processedData.meditationChartData.reduce((sum, d) => sum + d.minutes, 0);
  const totalWater = processedData.waterChartData.reduce((sum, d) => sum + d.glasses, 0);
  
  const moodLevels: { [key: number]: string } = {
    1: 'Poor',
    2: 'Low', 
    3: 'Okay',
    4: 'Good',
    5: 'Excellent',
  };
  
  const summaryText = `
This report covers your wellness data for the past 7 days. Here are the key highlights:

• Total Physical Activity: ${totalActivity} minutes
• Average Daily Calories: ${avgCalories} kcal
• Average Mood: ${moodLevels[avgMood as keyof typeof moodLevels]}
• Average Sleep: ${avgSleep} hours per night
• Active Days: ${activeDays} out of 7 days
• Total Meditation: ${totalMeditation} minutes
• Total Water Intake: ${totalWater} glasses
  `;
  
  yPosition = addText(summaryText, margin, yPosition, contentWidth, 12);
  yPosition += 10;
  
  // Capture and add charts
  checkNewPage(100);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Weekly Charts & Visualizations', margin, yPosition, contentWidth, 16);
  yPosition += 5;
  
  // Activity Chart
  const activityChart = await captureChart('activity-chart');
  if (activityChart) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    yPosition = addText('Physical Activity Trend', margin, yPosition, contentWidth, 12);
    yPosition += 2;
    addImageToPDF(activityChart, contentWidth, 60);
  }
  
  // Sleep Chart
  const sleepChart = await captureChart('sleep-chart');
  if (sleepChart) {
    checkNewPage(100);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    yPosition = addText('Sleep Duration Trend', margin, yPosition, contentWidth, 12);
    yPosition += 2;
    addImageToPDF(sleepChart, contentWidth, 60);
  }
  
  // Nutrition Chart
  const nutritionChart = await captureChart('nutrition-chart');
  if (nutritionChart) {
    checkNewPage(100);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    yPosition = addText('Daily Calorie Intake', margin, yPosition, contentWidth, 12);
    yPosition += 2;
    addImageToPDF(nutritionChart, contentWidth, 60);
  }
  
  // Mood Chart
  const moodChart = await captureChart('mood-chart');
  if (moodChart) {
    checkNewPage(100);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    yPosition = addText('Mood Trend', margin, yPosition, contentWidth, 12);
    yPosition += 2;
    addImageToPDF(moodChart, contentWidth, 60);
  }
  
  // Mood Analysis
  checkNewPage(50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Mood Analysis', margin, yPosition, contentWidth, 16);
  yPosition += 5;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const moodEntries = data.moodData.slice(0, 10); // Show last 10 entries
  if (moodEntries.length > 0) {
    yPosition = addText('Recent Mood Entries:', margin, yPosition, contentWidth, 12);
    yPosition += 3;
    
    moodEntries.forEach((entry, index) => {
      const date = entry.createdAt?.toDate?.() || entry.createdAt || new Date();
      const dateStr = date.toLocaleDateString();
      const moodText = `${dateStr}: ${entry.mood} mood, ${entry.energy} energy`;
      yPosition = addText(moodText, margin + 10, yPosition, contentWidth - 10, 10);
      
      if (entry.notes) {
        yPosition = addText(`Notes: ${entry.notes}`, margin + 20, yPosition, contentWidth - 20, 9);
      }
      
      if (entry.influences && entry.influences.length > 0) {
        yPosition = addText(`Influences: ${entry.influences.join(', ')}`, margin + 20, yPosition, contentWidth - 20, 9);
      }
      yPosition += 2;
    });
  } else {
    yPosition = addText('No mood entries found for this period.', margin, yPosition, contentWidth, 12);
  }
  yPosition += 10;
  
  // Sleep Analysis
  checkNewPage(50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Sleep Analysis', margin, yPosition, contentWidth, 16);
  yPosition += 5;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const sleepEntries = data.sleepData.slice(0, 10);
  if (sleepEntries.length > 0) {
    yPosition = addText('Recent Sleep Entries:', margin, yPosition, contentWidth, 12);
    yPosition += 3;
    
    sleepEntries.forEach((entry) => {
      const date = entry.createdAt?.toDate?.() || entry.createdAt || new Date();
      const dateStr = date.toLocaleDateString();
      const sleepText = `${dateStr}: ${entry.duration || 0} hours, Quality: ${entry.quality || 'N/A'}`;
      yPosition = addText(sleepText, margin + 10, yPosition, contentWidth - 10, 10);
      
      if (entry.notes) {
        yPosition = addText(`Notes: ${entry.notes}`, margin + 20, yPosition, contentWidth - 20, 9);
      }
      yPosition += 2;
    });
  } else {
    yPosition = addText('No sleep entries found for this period.', margin, yPosition, contentWidth, 12);
  }
  yPosition += 10;
  
  // Activity Analysis
  checkNewPage(50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Physical Activity Analysis', margin, yPosition, contentWidth, 16);
  yPosition += 5;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const activityEntries = data.activityData.slice(0, 10);
  if (activityEntries.length > 0) {
    yPosition = addText('Recent Activity Entries:', margin, yPosition, contentWidth, 12);
    yPosition += 3;
    
    activityEntries.forEach((entry) => {
      const date = entry.createdAt?.toDate?.() || entry.createdAt || new Date();
      const dateStr = date.toLocaleDateString();
      const activityText = `${dateStr}: ${entry.activity || 'N/A'} - ${entry.duration || 0} minutes`;
      yPosition = addText(activityText, margin + 10, yPosition, contentWidth - 10, 10);
      
      if (entry.notes) {
        yPosition = addText(`Notes: ${entry.notes}`, margin + 20, yPosition, contentWidth - 20, 9);
      }
      yPosition += 2;
    });
  } else {
    yPosition = addText('No activity entries found for this period.', margin, yPosition, contentWidth, 12);
  }
  yPosition += 10;
  
  // Nutrition Analysis
  checkNewPage(50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Nutrition Analysis', margin, yPosition, contentWidth, 16);
  yPosition += 5;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const nutritionEntries = data.nutritionData.slice(0, 10);
  if (nutritionEntries.length > 0) {
    yPosition = addText('Recent Meal Entries:', margin, yPosition, contentWidth, 12);
    yPosition += 3;
    
    nutritionEntries.forEach((entry) => {
      const date = entry.createdAt?.toDate?.() || entry.createdAt || new Date();
      const dateStr = date.toLocaleDateString();
      const mealText = `${dateStr}: ${entry.mealType || 'Meal'}`;
      yPosition = addText(mealText, margin + 10, yPosition, contentWidth - 10, 10);
      
      if (entry.items && entry.items.length > 0) {
        entry.items.forEach((item: any) => {
          const itemText = `  • ${item.name || 'Food item'}: ${item.calories || 0} calories`;
          yPosition = addText(itemText, margin + 20, yPosition, contentWidth - 20, 9);
        });
      }
      yPosition += 2;
    });
  } else {
    yPosition = addText('No nutrition entries found for this period.', margin, yPosition, 12);
  }
  yPosition += 10;
  
  // Meditation Analysis
  checkNewPage(50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Meditation & Mindfulness Analysis', margin, yPosition, contentWidth, 16);
  yPosition += 5;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const meditationEntries = data.meditationData.slice(0, 10);
  if (meditationEntries.length > 0) {
    yPosition = addText('Recent Meditation Sessions:', margin, yPosition, contentWidth, 12);
    yPosition += 3;
    
    meditationEntries.forEach((entry) => {
      const date = entry.createdAt?.toDate?.() || entry.createdAt || new Date();
      const dateStr = date.toLocaleDateString();
      const meditationText = `${dateStr}: ${entry.duration || 0} minutes, Type: ${entry.type || 'Meditation'}`;
      yPosition = addText(meditationText, margin + 10, yPosition, contentWidth - 10, 10);
      
      if (entry.notes) {
        yPosition = addText(`Notes: ${entry.notes}`, margin + 20, yPosition, contentWidth - 20, 9);
      }
      yPosition += 2;
    });
  } else {
    yPosition = addText('No meditation entries found for this period.', margin, yPosition, contentWidth, 12);
  }
  yPosition += 10;
  
  // Journal Analysis
  checkNewPage(50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Journal & Reflection Analysis', margin, yPosition, contentWidth, 16);
  yPosition += 5;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const journalEntries = data.journalData.slice(0, 5); // Show fewer journal entries due to length
  if (journalEntries.length > 0) {
    yPosition = addText('Recent Journal Entries:', margin, yPosition, contentWidth, 12);
    yPosition += 3;
    
    journalEntries.forEach((entry) => {
      const date = entry.createdAt?.toDate?.() || entry.createdAt || new Date();
      const dateStr = date.toLocaleDateString();
      yPosition = addText(`${dateStr}:`, margin + 10, yPosition, contentWidth - 10, 10);
      
      if (entry.content) {
        const truncatedContent = entry.content.length > 200 
          ? entry.content.substring(0, 200) + '...' 
          : entry.content;
        yPosition = addText(truncatedContent, margin + 20, yPosition, contentWidth - 20, 9);
      }
      yPosition += 3;
    });
  } else {
    yPosition = addText('No journal entries found for this period.', margin, yPosition, contentWidth, 12);
  }
  yPosition += 10;
  
  // Weekly Trends Table
  checkNewPage(80);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Weekly Trends Summary', margin, yPosition, contentWidth, 16);
  yPosition += 5;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  // Create a table with weekly data
  const tableHeaders = ['Day', 'Mood', 'Sleep (hrs)', 'Activity (min)', 'Calories', 'Water (glasses)'];
  const colWidths = [20, 25, 25, 30, 25, 25];
  const startX = margin;
  
  // Draw table headers
  let xPos = startX;
  tableHeaders.forEach((header, index) => {
    doc.setFont('helvetica', 'bold');
    doc.text(header, xPos, yPosition);
    xPos += colWidths[index];
  });
  yPosition += 5;
  
  // Draw table data
  doc.setFont('helvetica', 'normal');
  for (let i = 0; i < 7; i++) {
    xPos = startX;
    const dayData = {
      day: processedData.activityChartData[i]?.day || '',
      mood: moodLevels[processedData.moodChartData[i]?.mood as keyof typeof moodLevels] || 'N/A',
      sleep: processedData.sleepChartData[i]?.hours || 0,
      activity: processedData.activityChartData[i]?.minutes || 0,
      calories: processedData.nutritionChartData[i]?.calories || 0,
      water: processedData.waterChartData[i]?.glasses || 0,
    };
    
    const rowData = [dayData.day, dayData.mood, dayData.sleep.toString(), dayData.activity.toString(), dayData.calories.toString(), dayData.water.toString()];
    
    rowData.forEach((cell, index) => {
      doc.text(cell, xPos, yPosition);
      xPos += colWidths[index];
    });
    yPosition += 4;
  }
  
  yPosition += 10;
  
  // Insights and Recommendations
  checkNewPage(60);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Insights & Recommendations', margin, yPosition, contentWidth, 16);
  yPosition += 5;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const insights = generateInsights(processedData, data);
  yPosition = addText(insights, margin, yPosition, contentWidth, 12);
  yPosition += 10;
  
  // Footer
  const footerY = pageHeight - 15;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Generated by Find Your Inner Peace Wellness App', margin, footerY);
  doc.text(`Page ${doc.getNumberOfPages()}`, pageWidth - margin - 20, footerY);
  
  // Save the PDF
  const fileName = `wellness-report-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};












