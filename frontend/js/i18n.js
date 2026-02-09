// ============================================
// Internationalization (i18n) - Trilingual Support
// Traditional Chinese | Simplified Chinese | English
// ============================================

const translations = {
    'zh-hant': {
        subtitle: '香港詐騙檢測系統 | RAG-Based Fraud Detection',
        tab_text: '文字輸入',
        tab_ocr: '圖片識別 (OCR)',
        input_title: '輸入可疑短訊內容',
        input_placeholder: '請貼上或輸入可疑的短訊、電郵或對話內容...\n\n例如：\n- 銀行通知要求驗證帳戶\n- 中獎通知要求轉帳\n- 假冒親友要求轉帳\n- 投資機會推銷',
        btn_clear: '清空',
        btn_analyze: '分析詐騙風險',
        btn_ocr_analyze: '開始識別並分析',
        upload_title: '上傳截圖進行文字識別',
        upload_prompt: '點擊上傳或拖放圖片',
        upload_hint: '支援 JPG, PNG, JPEG 格式',
        ocr_progress: '正在識別文字...',
        ocr_recognizing: '識別中...',
        ocr_done: '識別完成！正在分析風險...',
        risk_label: '詐騙風險評分',
        result_title: '分析結果',
        result_content_label: '識別的內容：',
        result_analysis_label: '風險分析：',
        risk_high: '高風險：內容包含多個詐騙常見話術，如索取驗證碼、要求轉帳等。建議立即警惕，切勿按指示操作。',
        risk_medium: '中等風險：內容包含部分可疑元素，建議謹慎核實來源，切勿輕易提供個人資料或轉帳。',
        risk_low: '低風險：暫未發現明顯詐騙特徵，但仍需保持警覺，注意保護個人資料。',
        footer_warning: '本系統僅供參考，如遇可疑情況請致電警方防詐騙熱線 18222',
        alert_empty: '請輸入要分析的內容',
        alert_upload_first: '請先上傳圖片',
        alert_file_type: '請上傳圖片檔案（JPG, PNG, JPEG）',
        alert_ocr_empty: '未能識別到文字內容，請嘗試上傳更清晰的圖片',
        alert_api_error: '分析失敗\n\n可能原因：\n1. 後端服務未啟動\n2. 網絡連接問題\n\n請檢查後端是否正在運行（python app.py）',
        alert_ocr_error: '處理失敗\n\n可能原因：\n1. 圖片識別失敗\n2. 後端服務未啟動\n\n請檢查後端是否正在運行',
        verdict_safe: '✅ 可能安全',
        verdict_suspicious: '⚠️ 可疑',
        verdict_fraud: '🚨 可能詐騙'
    },
    'zh-hans': {
        subtitle: '香港诈骗检测系统 | RAG-Based Fraud Detection',
        tab_text: '文字输入',
        tab_ocr: '图片识别 (OCR)',
        input_title: '输入可疑短信内容',
        input_placeholder: '请粘贴或输入可疑的短信、邮件或对话内容...\n\n例如：\n- 银行通知要求验证账户\n- 中奖通知要求转账\n- 假冒亲友要求转账\n- 投资机会推销',
        btn_clear: '清空',
        btn_analyze: '分析诈骗风险',
        btn_ocr_analyze: '开始识别并分析',
        upload_title: '上传截图进行文字识别',
        upload_prompt: '点击上传或拖放图片',
        upload_hint: '支持 JPG, PNG, JPEG 格式',
        ocr_progress: '正在识别文字...',
        ocr_recognizing: '识别中...',
        ocr_done: '识别完成！正在分析风险...',
        risk_label: '诈骗风险评分',
        result_title: '分析结果',
        result_content_label: '识别的内容：',
        result_analysis_label: '风险分析：',
        risk_high: '高风险：内容包含多个诈骗常见话术，如索取验证码、要求转账等。建议立即警惕，切勿按指示操作。',
        risk_medium: '中等风险：内容包含部分可疑元素，建议谨慎核实来源，切勿轻易提供个人资料或转账。',
        risk_low: '低风险：暂未发现明显诈骗特征，但仍需保持警觉，注意保护个人资料。',
        footer_warning: '本系统仅供参考，如遇可疑情况请致电警方防诈骗热线 18222',
        alert_empty: '请输入要分析的内容',
        alert_upload_first: '请先上传图片',
        alert_file_type: '请上传图片文件（JPG, PNG, JPEG）',
        alert_ocr_empty: '未能识别到文字内容，请尝试上传更清晰的图片',
        alert_api_error: '分析失败\n\n可能原因：\n1. 后端服务未启动\n2. 网络连接问题\n\n请检查后端是否正在运行（python app.py）',
        alert_ocr_error: '处理失败\n\n可能原因：\n1. 图片识别失败\n2. 后端服务未启动\n\n请检查后端是否正在运行',
        verdict_safe: '✅ 可能安全',
        verdict_suspicious: '⚠️ 可疑',
        verdict_fraud: '🚨 可能诈骗'
    },
    'en': {
        subtitle: 'Hong Kong Fraud Detection System | RAG-Based',
        tab_text: 'Text Input',
        tab_ocr: 'Image OCR',
        input_title: 'Enter Suspicious Message',
        input_placeholder: 'Paste or type the suspicious SMS, email, or conversation...\n\nExamples:\n- Bank verification requests\n- Prize-winning transfer requests\n- Impersonating relatives asking for money\n- Investment opportunity promotions',
        btn_clear: 'Clear',
        btn_analyze: 'Analyze Fraud Risk',
        btn_ocr_analyze: 'Recognize & Analyze',
        upload_title: 'Upload Screenshot for OCR',
        upload_prompt: 'Click to upload or drag & drop',
        upload_hint: 'Supports JPG, PNG, JPEG formats',
        ocr_progress: 'Recognizing text...',
        ocr_recognizing: 'Recognizing...',
        ocr_done: 'Recognition complete! Analyzing risk...',
        risk_label: 'Fraud Risk Score',
        result_title: 'Analysis Result',
        result_content_label: 'Detected Content:',
        result_analysis_label: 'Risk Analysis:',
        risk_high: 'High Risk: Content contains multiple common fraud tactics such as requesting verification codes or bank transfers. Do NOT follow any instructions.',
        risk_medium: 'Medium Risk: Content contains some suspicious elements. Verify the source carefully and do not provide personal information or make transfers.',
        risk_low: 'Low Risk: No obvious fraud indicators detected, but remain vigilant and protect your personal information.',
        footer_warning: 'This system is for reference only. If suspicious, call the HK Police Anti-Scam Hotline 18222',
        alert_empty: 'Please enter content to analyze',
        alert_upload_first: 'Please upload an image first',
        alert_file_type: 'Please upload an image file (JPG, PNG, JPEG)',
        alert_ocr_empty: 'No text detected. Please try uploading a clearer image.',
        alert_api_error: 'Analysis failed\n\nPossible causes:\n1. Backend server is not running\n2. Network connection issue\n\nPlease check if the backend is running (python app.py)',
        alert_ocr_error: 'Processing failed\n\nPossible causes:\n1. Image recognition failed\n2. Backend server is not running\n\nPlease check if the backend is running',
        verdict_safe: '✅ Likely Safe',
        verdict_suspicious: '⚠️ Suspicious',
        verdict_fraud: '🚨 Likely Fraud'
    }
};

// Current language state
let currentLang = 'zh-hant';

/**
 * Switch the UI language
 * @param {string} lang - Language code: 'zh-hant', 'zh-hans', or 'en'
 */
function switchLang(lang) {
    currentLang = lang;

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    const buttons = document.querySelectorAll('.lang-btn');
    if (lang === 'zh-hant') buttons[0].classList.add('active');
    else if (lang === 'zh-hans') buttons[1].classList.add('active');
    else buttons[2].classList.add('active');

    // Update all elements with data-i18n attribute
    const tr = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (tr[key]) {
            el.textContent = tr[key];
        }
    });

    // Update placeholder text
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (tr[key]) {
            el.placeholder = tr[key];
        }
    });

    // Update HTML lang attribute for accessibility
    if (lang === 'zh-hant') document.documentElement.lang = 'zh-HK';
    else if (lang === 'zh-hans') document.documentElement.lang = 'zh-CN';
    else document.documentElement.lang = 'en';
}

/**
 * Get a translated string by key
 * @param {string} key - Translation key
 * @returns {string} Translated string
 */
function t(key) {
    return translations[currentLang][key] || key;
}