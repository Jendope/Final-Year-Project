// ============================================
// Configuration
// ============================================
const API_BASE_URL = 'http://localhost:5000/api';

// State management
let uploadedImage = null;
let recognizedText = '';

// ============================================
// Tab Management
// ============================================
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    if (tab === 'text') {
        document.querySelector('.tab-btn:first-child').classList.add('active');
        document.getElementById('textTab').classList.add('active');
    } else {
        document.querySelector('.tab-btn:last-child').classList.add('active');
        document.getElementById('imageTab').classList.add('active');
    }

    // Hide results when switching tabs
    document.getElementById('resultSection').classList.remove('show');
}

// ============================================
// Text Input Functions
// ============================================
function clearText() {
    document.getElementById('smsInput').value = '';
    document.getElementById('resultSection').classList.remove('show');
}

async function analyzeText() {
    const text = document.getElementById('smsInput').value.trim();

    if (!text) {
        alert(t('alert_empty'));
        return;
    }

    showLoading(true);

    try {
        const response = await fetch(API_BASE_URL + '/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const result = await response.json();
        displayResults(result.probability, result.reason, text);

    } catch (error) {
        console.error('Analysis error:', error);
        alert(t('alert_api_error'));
    } finally {
        showLoading(false);
    }
}

// ============================================
// Image Upload & OCR Functions
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const uploadArea = document.getElementById('uploadArea');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragover');
        }, false);
    });

    uploadArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    console.log('HK FraudGuard initialized');
    console.log('API Base URL:', API_BASE_URL);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    handleFile(file);
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert(t('alert_file_type'));
        return;
    }

    uploadedImage = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('previewImage').src = e.target.result;
        document.getElementById('previewContainer').style.display = 'block';
        document.getElementById('analyzeImageBtn').disabled = false;
    };
    reader.readAsDataURL(file);
}

function clearImage() {
    uploadedImage = null;
    recognizedText = '';
    document.getElementById('imageInput').value = '';
    document.getElementById('previewContainer').style.display = 'none';
    document.getElementById('analyzeImageBtn').disabled = true;
    document.getElementById('ocrProgress').style.display = 'none';
    document.getElementById('resultSection').classList.remove('show');
}

async function analyzeImage() {
    if (!uploadedImage) {
        alert(t('alert_upload_first'));
        return;
    }

    document.getElementById('ocrProgress').style.display = 'block';
    document.getElementById('progressText').textContent = t('ocr_progress');
    document.getElementById('analyzeImageBtn').disabled = true;

    try {
        // Step 1: OCR Recognition
        const worker = await Tesseract.createWorker('chi_tra+eng');

        const { data: { text } } = await worker.recognize(uploadedImage, {
            logger: m => {
                if (m.status === 'recognizing text') {
                    const percent = Math.round(m.progress * 100);
                    document.getElementById('progressText').textContent =
                        t('ocr_recognizing') + ' ' + percent + '%';
                }
            }
        });

        await worker.terminate();

        recognizedText = text.trim();

        if (!recognizedText) {
            alert(t('alert_ocr_empty'));
            document.getElementById('ocrProgress').style.display = 'none';
            document.getElementById('analyzeImageBtn').disabled = false;
            return;
        }

        document.getElementById('progressText').textContent = t('ocr_done');

        // Step 2: Send to backend for fraud analysis
        const response = await fetch(API_BASE_URL + '/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: recognizedText })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const result = await response.json();

        // Hide OCR progress and show results
        document.getElementById('ocrProgress').style.display = 'none';
        displayResults(result.probability, result.reason, recognizedText);

    } catch (error) {
        console.error('OCR or Analysis Error:', error);
        alert(t('alert_ocr_error'));
        document.getElementById('ocrProgress').style.display = 'none';
    } finally {
        document.getElementById('analyzeImageBtn').disabled = false;
    }
}

// ============================================
// Results Display
// ============================================
function displayResults(probability, reason, inputText) {
    const percentage = Math.round(probability * 100);

    // Update risk score
    const riskScoreElement = document.getElementById('riskScore');
    riskScoreElement.textContent = percentage + '%';

    // Set color based on risk level
    riskScoreElement.className = 'risk-value ' +
        (percentage >= 70 ? 'risk-high' : percentage >= 40 ? 'risk-medium' : 'risk-low');

    // Update reason text
    const truncatedText = inputText.length > 200
        ? inputText.substring(0, 200) + '...'
        : inputText;

    document.getElementById('reasonText').innerHTML =
        '<strong>' + t('result_content_label') + '</strong><br>' +
        '<div class="extracted-text-box">' + escapeHtml(truncatedText) + '</div>' +
        '<strong>' + t('result_analysis_label') + '</strong><br>' +
        escapeHtml(reason);

    // Show results section with animation
    document.getElementById('resultSection').classList.add('show');

    // Scroll to results
    setTimeout(() => {
        document.getElementById('resultSection').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }, 100);
}

// ============================================
// Utility Functions
// ============================================
function showLoading(show) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.disabled = show;
    });

    if (show) {
        document.body.style.cursor = 'wait';
    } else {
        document.body.style.cursor = 'default';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}