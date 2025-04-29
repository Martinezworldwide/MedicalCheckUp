const doctorList = [
    "Allergist", "Anesthesiologist", "Cardiologist", "Dentist", "Dermatologist",
    "Endocrinologist", "Family Physician", "Gastroenterologist", "Geriatrician",
    "Gynecologist", "Hematologist", "Immunologist", "Infectious Disease Specialist",
    "Internist", "Nephrologist", "Neurologist", "Obstetrician", "Oncologist",
    "Ophthalmologist", "Orthopedic Surgeon", "Otolaryngologist (ENT)", "Pediatrician",
    "Psychiatrist", "Pulmonologist", "Radiologist", "Rheumatologist", "Surgeon",
    "Urologist", "Chiropractor", "Podiatrist", "Optometrist", "Plastic Surgeon",
    "General Practitioner", "Physical Therapist", "Psychologist"
];

let checkups = [];

window.onload = () => {
    const doctorSelect = document.getElementById('doctor');
    doctorList.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc;
        option.textContent = doc;
        doctorSelect.appendChild(option);
    });

    loadCheckups();
    populateYearMonthFilters();
    renderCheckups();
};

function addCheckup() {
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('date').value;
    if (!doctor || !date) {
        alert('Please select a doctor and date.');
        return;
    }
    checkups.push({ doctor, date });
    saveCheckups();
    populateYearMonthFilters();
    renderCheckups();
}

function renderCheckups() {
    const list = document.getElementById('checkupList');
    list.innerHTML = '';

    const selectedMonth = document.getElementById('monthFilter').value;
    const selectedYear = document.getElementById('yearFilter').value;

    let filtered = checkups;
    if (selectedMonth || selectedYear) {
        filtered = checkups.filter(item => {
            const d = new Date(item.date);
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const year = d.getFullYear().toString();
            return (!selectedMonth || month === selectedMonth) && (!selectedYear || year === selectedYear);
        });
    }

    filtered.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.doctor} on ${item.date}
            <button class="edit-btn" onclick="editCheckup(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteCheckup(${index})">Delete</button>
        `;
        list.appendChild(listItem);
    });
}

function editCheckup(index) {
    const newDoctor = prompt("Update doctor:", checkups[index].doctor);
    const newDate = prompt("Update date (YYYY-MM-DD):", checkups[index].date);
    if (newDoctor && newDate) {
        checkups[index] = { doctor: newDoctor, date: newDate };
        saveCheckups();
        renderCheckups();
    }
}

function deleteCheckup(index) {
    if (confirm("Are you sure you want to delete this checkup?")) {
        checkups.splice(index, 1);
        saveCheckups();
        renderCheckups();
    }
}

async function downloadPDF() {
    if (checkups.length === 0) {
        alert('No checkups to save.');
        return;
    }

    const { PDFDocument, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    let y = height - 50;
    page.drawText('Scheduled Doctor Checkups:', { x: 50, y, size: 20, color: rgb(0, 0, 0) });
    y -= 30;

    checkups.forEach((item, index) => {
        page.drawText(`${index + 1}. ${item.doctor} - ${item.date}`, { x: 50, y, size: 14, color: rgb(0, 0, 0) });
        y -= 20;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Doctor_Checkup_Schedule.pdf';
    link.click();
}

function printSchedule() {
    let printContent = "<h1>Scheduled Doctor Checkups</h1><ul>";
    checkups.forEach(item => {
        printContent += `<li>${item.doctor} on ${item.date}</li>`;
    });
    printContent += "</ul>";

    const newWindow = window.open('', '', 'width=800,height=600');
    newWindow.document.write(`
        <html>
            <head><title>Print Checkup Schedule</title></head>
            <body>${printContent}</body>
        </html>
    `);
    newWindow.document.close();
    newWindow.print();
}

function saveCheckups() {
    localStorage.setItem('doctorCheckups', JSON.stringify(checkups));
}

function loadCheckups() {
    const stored = localStorage.getItem('doctorCheckups');
    if (stored) {
        checkups = JSON.parse(stored);
    }
}

function populateYearMonthFilters() {
    const monthFilter = document.getElementById('monthFilter');
    const yearFilter = document.getElementById('yearFilter');

    const months = [...new Set(checkups.map(c => (new Date(c.date).getMonth() + 1).toString().padStart(2, '0')))];
    const years = [...new Set(checkups.map(c => new Date(c.date).getFullYear().toString()))];

    monthFilter.innerHTML = '<option value="">All Months</option>';
    months.sort().forEach(month => {
        monthFilter.innerHTML += `<option value="${month}">${month}</option>`;
    });

    yearFilter.innerHTML = '<option value="">All Years</option>';
    years.sort().forEach(year => {
        yearFilter.innerHTML += `<option value="${year}">${year}</option>`;
    });
}

