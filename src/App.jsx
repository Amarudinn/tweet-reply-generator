import { useState, useCallback, useEffect } from 'react';
import styles from './App.module.css';
import { getApiKey, saveApiKey, getLanguage, saveLanguage, getTemperature, saveTemperature, getReplyCount, saveReplyCount, getTheme, saveTheme, getSelectedProviderId, saveSelectedProviderId, getModelForProvider, saveModelForProvider, getCustomSystemPrompt, saveCustomSystemPrompt, resetSystemPrompt, SYSTEM_PROMPT, generateReply, parseResponse } from './api';
import { getProvider } from './providers/registry';
import ReplyCard from './components/ReplyCard';
import MetaBar from './components/MetaBar';
import SettingsModal from './components/SettingsModal';
import Toast from './components/Toast';

const GEAR_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const DOWNLOAD_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function App() {
  const [tweet, setTweet] = useState('');
  const [state, setState] = useState('empty'); // empty | loading | error | results
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(() => !getApiKey());
  const [toast, setToast] = useState({ message: '', visible: false });
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [promptDraft, setPromptDraft] = useState('');

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2200);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('App installed successfully!');
    }
    setInstallPrompt(null);
  }, [installPrompt, showToast]);

  const handleGenerate = useCallback(async () => {
    const text = tweet.trim();
    if (!text) {
      showToast('Paste a tweet first');
      return;
    }

    const providerId = getSelectedProviderId();
    const apiKey = getApiKey(providerId);
    if (!apiKey) {
      setShowSettings(true);
      showToast('Set your API key first');
      return;
    }

    setState('loading');
    setResults(null);
    setError('');

    try {
      const raw = await generateReply(text, apiKey, {
        language: getLanguage(),
        temperature: getTemperature(),
        replyCount: getReplyCount(),
        theme: getTheme(),
        providerId: getSelectedProviderId(),
        model: getModelForProvider(getSelectedProviderId()),
      });
      const parsed = parseResponse(raw);
      setResults(parsed);
      setState('results');
    } catch (err) {
      setError(err.message);
      setState('error');
    }
  }, [tweet, showToast]);

  const handleKeyDown = useCallback(
    (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGenerate();
      }
    },
    [handleGenerate]
  );

  const handleSaveSettings = useCallback(
    (settings) => {
      saveSelectedProviderId(settings.providerId);
      saveApiKey(settings.apiKey, settings.providerId);
      saveModelForProvider(settings.model, settings.providerId);
      saveLanguage(settings.language);
      saveTemperature(settings.temperature);
      saveReplyCount(settings.replyCount);
      saveTheme(settings.theme);
      setShowSettings(false);
      showToast('Settings saved');
    },
    [showToast]
  );

  const recommendedIndex = results?.recommendation?.pick ? results.recommendation.pick - 1 : -1;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Tweet Reply Generator</h1>
          {(() => {
            const p = getProvider(getSelectedProviderId());
            const m = getModelForProvider(p.id);
            const label = p.models.length > 1
              ? p.models.find(mod => mod.value === m)?.label || m
              : p.name;
            return (
              <span className={styles.providerBadge}>
                {label}
              </span>
            );
          })()}
        </div>
        <div className={styles.headerActions}>
          {installPrompt && (
            <button
              className={styles.downloadBtn}
              onClick={handleInstall}
              aria-label="Install App"
              title="Install App"
            >
              {DOWNLOAD_ICON}
            </button>
          )}
          <button
            className={styles.settingsBtn}
            onClick={() => setShowSettings(true)}
            aria-label="Settings"
          >
            {GEAR_ICON}
          </button>
        </div>
      </header>

      {/* Input */}
      <section className={styles.inputSection}>
        <div className={styles.textareaWrap}>
          <textarea
            className={styles.textarea}
            placeholder="Paste tweet here..."
            maxLength={4000}
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {!tweet ? (
            <button
              className={styles.pasteBtn}
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  if (text) setTweet(text.slice(0, 4000));
                } catch {
                  showToast('Cannot access clipboard');
                }
              }}
              aria-label="Paste from clipboard"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
              Paste
            </button>
          ) : (
            <button
              className={styles.clearBtn}
              onClick={() => setTweet('')}
              aria-label="Clear text"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <div className={styles.inputFooter}>
          <span className={styles.charCount}>{tweet.length} / 4000</span>
          <button
            className={styles.generateBtn}
            onClick={handleGenerate}
            disabled={state === 'loading'}
          >
            {state === 'loading' ? 'Generating...' : 'Generate Reply'}
          </button>
        </div>

      </section>

      {/* Empty State */}
      {state === 'empty' && (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            Paste a tweet, and the AI will
            <br />
            craft the best replies for you
          </p>
        </div>
      )}

      {/* Loading State */}
      {state === 'loading' && (
        <div className={styles.loadingState}>
          <div className={styles.skeletonMeta} />
          {[...Array(getReplyCount())].map((_, i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
        </div>
      )}

      {/* Error State */}
      {state === 'error' && (
        <div className={styles.errorState}>
          <div className={styles.errorTitle}>Error</div>
          <div className={styles.errorMsg}>{error}</div>
          <button className={styles.retryBtn} onClick={handleGenerate}>
            Try Again
          </button>
        </div>
      )}

      {/* Results */}
      {state === 'results' && results && (
        <section className={styles.resultsSection}>
          <MetaBar confidence={results.confidence} angle={results.angle} />

          <div className={styles.repliesContainer}>
            {results.replies.length > 0 ? (
              results.replies.map((reply, i) => (
                <ReplyCard
                  key={i}
                  reply={reply}
                  index={i}
                  isRecommended={i === recommendedIndex}
                  delay={i * 50}
                  onCopy={() => showToast('Copied to clipboard')}
                />
              ))
            ) : (
              <ReplyCard
                reply={results.raw}
                index={0}
                isRecommended={false}
                delay={0}
                onCopy={() => showToast('Copied to clipboard')}
              />
            )}
          </div>

          {results.recommendation.reason && (
            <div
              className={styles.recommendationBox}
              style={{ animationDelay: `${results.replies.length * 50 + 100}ms` }}
            >
              <div className={styles.recoLabel}>Why this pick</div>
              <div className={styles.recoText}>{results.recommendation.reason}</div>
              {results.recommendation.technique && (
                <div className={styles.recoTechnique}>{results.recommendation.technique}</div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
        currentSettings={{
          providerId: getSelectedProviderId(),
          apiKey: getApiKey(getSelectedProviderId()),
          model: getModelForProvider(getSelectedProviderId()),
          language: getLanguage(),
          temperature: getTemperature(),
          replyCount: getReplyCount(),
          theme: getTheme(),
        }}
      />

      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} />

      {/* Edit Prompt Button */}
      <button
        className={styles.editPromptBtn}
        onClick={() => {
          setPromptDraft(getCustomSystemPrompt() || SYSTEM_PROMPT);
          setShowPromptEditor(true);
        }}
        aria-label="Edit System Prompt"
        title="Edit System Prompt"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>

      {/* X Profile Link */}
      <a
        href="https://x.com/m_amarudinn2"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.xLink}
        aria-label="Follow on X"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* System Prompt Editor Modal */}
      {showPromptEditor && (
        <div className={styles.promptOverlay} onClick={() => setShowPromptEditor(false)}>
          <div className={styles.promptModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.promptHeader}>
              <h2 className={styles.promptTitle}>System Prompt</h2>
              <button
                className={styles.promptCloseBtn}
                onClick={() => setShowPromptEditor(false)}
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <textarea
              className={styles.promptTextarea}
              value={promptDraft}
              onChange={(e) => setPromptDraft(e.target.value)}
              spellCheck={false}
            />
            <div className={styles.promptActions}>
              <button
                className={styles.promptResetBtn}
                onClick={() => {
                  resetSystemPrompt();
                  setPromptDraft(SYSTEM_PROMPT);
                  showToast('System prompt direset ke default');
                }}
              >
                Reset Default
              </button>
              <div className={styles.promptActionsRight}>
                <button className={styles.promptCancelBtn} onClick={() => setShowPromptEditor(false)}>Cancel</button>
                <button
                  className={styles.promptSaveBtn}
                  onClick={() => {
                    const trimmed = promptDraft.trim();
                    if (trimmed === SYSTEM_PROMPT || trimmed === '') {
                      resetSystemPrompt();
                    } else {
                      saveCustomSystemPrompt(trimmed);
                    }
                    setShowPromptEditor(false);
                    showToast('System prompt disimpan');
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
