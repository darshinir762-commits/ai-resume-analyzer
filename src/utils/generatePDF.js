import jsPDF from "jspdf";

const generatePDF = (candidate) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("AI Resume Analysis Report", 20, y);

  y += 15;

  doc.setFontSize(14);
  doc.text(`Name: ${candidate.name}`, 20, y);

  y += 10;
  doc.text(`Email: ${candidate.email}`, 20, y);

  y += 10;
  doc.text(`Phone: ${candidate.phone}`, 20, y);

  y += 10;
  doc.text(`Education: ${candidate.education}`, 20, y);

  y += 10;
  doc.text(`University: ${candidate.university}`, 20, y);

  y += 15;

  doc.setFontSize(16);
  doc.text("ATS Score", 20, y);

  y += 10;

  doc.setFontSize(14);
  doc.text(`${candidate.ats_score}%`, 20, y);

  y += 15;

  doc.setFontSize(16);
  doc.text("Matched Skills", 20, y);

  y += 10;

  candidate.matched_skills.forEach((skill) => {
    doc.text("- " + skill, 25, y);
    y += 8;
  });

  y += 5;

  doc.setFontSize(16);
  doc.text("Missing Skills", 20, y);

  y += 10;

  candidate.missing_skills.forEach((skill) => {
    doc.text("- " + skill, 25, y);
    y += 8;
  });

  y += 5;

  doc.setFontSize(16);
  doc.text("Suggestions", 20, y);

  y += 10;

  candidate.suggestions.forEach((item) => {
    doc.text("- " + item, 25, y);
    y += 8;
  });

  y += 5;

  doc.setFontSize(16);
  doc.text("Interview Questions", 20, y);

  y += 10;

  candidate.interview_questions.forEach((q, index) => {
    doc.text(`${index + 1}. ${q}`, 20, y);
    y += 10;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("Resume_Analysis_Report.pdf");
};

export default generatePDF;