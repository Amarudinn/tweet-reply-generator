import { useState, useEffect, useRef } from 'react'
import styles from './SettingsModal.module.css'

const LANGUAGES = [
  { value: 'auto', label: 'Auto (Detect)' },
  { value: 'id', label: 'Indonesia' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語 (Jepang)' },
]

export default function SettingsModal({ isOpen, onClose, onSave, currentSettings }) {
  const [apiKey, setApiKey] = useState('')
  const [language, setLanguage] = useState('auto')
  const [temperature, setTemperature] = useState(0.7)
  const [replyCount, setReplyCount] = useState(5)
  const [langOpen, setLangOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setApiKey(currentSettings.apiKey || '')
      setLanguage(currentSettings.language || 'auto')
      setTemperature(currentSettings.temperature ?? 0.7)
      setReplyCount(currentSettings.replyCount ?? 5)
      setLangOpen(false)
    }
  }, [isOpen, currentSettings])

  useEffect(() => {
    if (!isOpen) return
    function handleEsc(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!langOpen) return
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [langOpen])

  function handleSave() {
    onSave({
      apiKey: apiKey.trim(),
      language,
      temperature,
      replyCount,
    })
  }

  async function handlePasteKey() {
    try {
      const text = await navigator.clipboard.readText()
      if (text) setApiKey(text.trim())
    } catch {
      // silently ignore clipboard errors
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Pengaturan</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* API Key */}
        <div className={styles.section}>
          <label className={styles.label}>API Key</label>
          <div className={styles.inputWrap}>
            <input
              type="password"
              className={styles.input}
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <button
              className={styles.inputBtn}
              onClick={handlePasteKey}
              aria-label="Paste API key"
              title="Paste"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            </button>
          </div>
          <p className={styles.desc}>
            API key disimpan secara lokal di browser kamu dan tidak dikirim ke server manapun.
          </p>

          <div className={styles.howTo}>
            <div className={styles.howToTitle}>Cara mendapatkan API Key</div>
            <ol className={styles.steps}>
              <li>Buka <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className={styles.link}>platform.deepseek.com</a></li>
              <li>Daftar atau login ke akun DeepSeek</li>
              <li>Buka menu <strong>API Keys</strong></li>
              <li>Klik <strong>Create New Key</strong>, copy key-nya</li>
              <li>Paste key di atas, lalu klik Save</li>
            </ol>
          </div>
        </div>

        {/* Language */}
        <div className={styles.section}>
          <label className={styles.label}>Bahasa Output</label>
          <div className={styles.customSelect} ref={dropdownRef}>
            <button
              type="button"
              className={`${styles.selectTrigger} ${langOpen ? styles.selectOpen : ''}`}
              onClick={() => setLangOpen(!langOpen)}
            >
              <span>{LANGUAGES.find((l) => l.value === language)?.label}</span>
              <svg className={styles.selectChevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {langOpen && (
              <div className={styles.selectDropdown}>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.value}
                    type="button"
                    className={`${styles.selectOption} ${language === lang.value ? styles.optionSelected : ''}`}
                    onClick={() => { setLanguage(lang.value); setLangOpen(false) }}
                  >
                    <span>{lang.label}</span>
                    {language === lang.value && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className={styles.hint}>Bahasa yang digunakan AI untuk menulis reply</p>
        </div>

        {/* Reply Count */}
        <div className={styles.section}>
          <label className={styles.label}>Jumlah Reply</label>
          <div className={styles.counterWrap}>
            <button
              className={styles.counterBtn}
              onClick={() => setReplyCount(Math.max(2, replyCount - 1))}
              disabled={replyCount <= 2}
              aria-label="Kurangi jumlah reply"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span className={styles.counterValue}>{replyCount}</span>
            <button
              className={styles.counterBtn}
              onClick={() => setReplyCount(Math.min(10, replyCount + 1))}
              disabled={replyCount >= 10}
              aria-label="Tambah jumlah reply"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
          <p className={styles.hint}>Minimal 2 untuk perbandingan Best Pick, maksimal 10</p>
        </div>

        {/* Temperature */}
        <div className={styles.section}>
          <div className={styles.labelRow}>
            <label className={styles.label}>Temperature</label>
            <span className={styles.tempValue}>{temperature.toFixed(1)}</span>
          </div>
          <div className={styles.sliderWrap}>
            <div className={styles.sliderTrack}>
              <div
                className={styles.sliderFill}
                style={{ width: `${temperature * 100}%` }}
              />
            </div>
            <input
              type="range"
              className={styles.slider}
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
            />
          </div>
          <div className={styles.sliderLabels}>
            <span>Presisi</span>
            <span>Kreatif</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}
