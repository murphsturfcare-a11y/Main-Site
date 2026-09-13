import { CONSENT_INITIALIZATION_SCRIPT, CONSENT_KEY, initializeConsent, readEffectiveConsent, readStoredConsent, saveConsent, subscribeToConsent } from '@/lib/analytics/consent';

function queuedCommands() {
  return window.dataLayer.map((command) => Array.from(command as IArguments));
}

function runInitialScript() {
  new Function('window', CONSENT_INITIALIZATION_SCRIPT)(window);
}

beforeEach(() => {
  localStorage.clear();
  window.dataLayer = [];
  Reflect.deleteProperty(window, 'gtag');
  delete window.murphysConsentInitialized;
  delete window.murphysConsentChoice;
});

afterEach(() => vi.restoreAllMocks());

describe('consent persistence and Google bootstrap ordering', () => {
  it.each([
    ['accepted', 'granted'],
    ['declined', 'denied'],
    ['true', 'denied'],
    ['', 'denied'],
    [null, 'denied'],
  ])('restores %s as %s before any measurement command', (stored, expected) => {
    if (stored !== null) localStorage.setItem(CONSENT_KEY, stored);
    runInitialScript();
    const commands = queuedCommands();
    expect(commands).toHaveLength(1);
    expect(commands[0].slice(0, 2)).toEqual(['consent', 'default']);
    expect(Object.values(commands[0][2])).toEqual([expected, expected, expected, expected]);
  });

  it('restores an explicit acceptance after a full-page reload', () => {
    saveConsent('accepted');
    window.dataLayer = [];
    Reflect.deleteProperty(window, 'gtag');
    delete window.murphysConsentInitialized;
    delete window.murphysConsentChoice;
    runInitialScript();
    expect(queuedCommands()[0][2]).toMatchObject({ analytics_storage: 'granted', ad_storage: 'granted' });
  });

  it('queues early acceptance after a default and does not overwrite it during bootstrap', () => {
    saveConsent('accepted');
    const queue = window.dataLayer;
    runInitialScript();
    expect(window.dataLayer).toBe(queue);
    expect(queuedCommands()).toEqual([
      ['consent', 'default', expect.objectContaining({ analytics_storage: 'denied' })],
      ['consent', 'update', expect.objectContaining({ analytics_storage: 'granted' })],
    ]);
  });

  it('keeps denied defaults when storage is inaccessible', () => {
    const blocked = () => { throw new DOMException('Blocked', 'SecurityError'); };
    vi.spyOn(localStorage, 'getItem').mockImplementationOnce(blocked).mockImplementationOnce(blocked);
    expect(readStoredConsent()).toBeNull();
    expect(runInitialScript).not.toThrow();
    expect(queuedCommands()[0][2]).toMatchObject({ analytics_storage: 'denied' });
  });

  it('honors an explicit choice for this page when storage writes fail', () => {
    vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => { throw new DOMException('Blocked', 'SecurityError'); });
    expect(() => saveConsent('accepted')).not.toThrow();
    runInitialScript();
    expect(queuedCommands()).toHaveLength(2);
    expect(queuedCommands()[1][2]).toMatchObject({ analytics_storage: 'granted' });
    expect(readStoredConsent()).toBeNull();
    expect(readEffectiveConsent()).toBe('accepted');
  });

  it('honors a declined choice despite a stale stored acceptance when writing fails', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => { throw new DOMException('Blocked', 'SecurityError'); });
    saveConsent('declined');
    expect(readStoredConsent()).toBe('accepted');
    expect(readEffectiveConsent()).toBe('declined');
    expect(queuedCommands().at(-1)).toEqual(['consent', 'update', expect.objectContaining({ analytics_storage: 'denied' })]);
  });

  it('preserves a pre-existing gtag and initializes it only once', () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    initializeConsent();
    runInitialScript();
    expect(window.gtag).toBe(gtag);
    expect(gtag).toHaveBeenCalledTimes(1);
    saveConsent('declined');
    expect(gtag).toHaveBeenLastCalledWith('consent', 'update', expect.objectContaining({ analytics_storage: 'denied' }));
  });

  it('applies a decline from another tab and ignores unrelated storage events', () => {
    saveConsent('accepted');
    const onChange = vi.fn();
    const unsubscribe = subscribeToConsent(onChange);
    localStorage.setItem(CONSENT_KEY, 'declined');
    window.dispatchEvent(new StorageEvent('storage', { key: 'unrelated' }));
    expect(onChange).not.toHaveBeenCalled();
    window.dispatchEvent(new StorageEvent('storage', { key: CONSENT_KEY, newValue: 'declined' }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(readEffectiveConsent()).toBe('declined');
    expect(queuedCommands().at(-1)).toEqual(['consent', 'update', expect.objectContaining({ analytics_storage: 'denied' })]);
    unsubscribe();
    window.dispatchEvent(new StorageEvent('storage', { key: CONSENT_KEY }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it.each([CONSENT_KEY, null])('clears an in-page choice when consent is deleted in another tab (%s)', (key) => {
    saveConsent('accepted');
    const observed: (string | null)[] = [];
    const unsubscribe = subscribeToConsent(() => observed.push(readEffectiveConsent()));
    localStorage.removeItem(CONSENT_KEY);
    window.dispatchEvent(new StorageEvent('storage', { key }));
    expect(observed).toEqual([null]);
    expect(readEffectiveConsent()).toBeNull();
    expect(queuedCommands().at(-1)).toEqual(['consent', 'update', expect.objectContaining({ analytics_storage: 'denied' })]);
    unsubscribe();
  });
});
