import { render } from '@testing-library/react';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { pageview } from '@/lib/analytics/gtag';
import { CONSENT_KEY, saveConsent } from '@/lib/analytics/consent';

const navigation = vi.hoisted(() => ({ pathname: '/locations/palm-desert' }));
vi.mock('next/navigation', () => ({ usePathname: () => navigation.pathname }));
vi.mock('@/lib/analytics/gtag', () => ({ GA_MEASUREMENT_ID: 'G-TEST1234', pageview: vi.fn() }));
vi.mock('next/script', () => ({
  default: ({ strategy, ...props }: { strategy: string; id?: string; src?: string; dangerouslySetInnerHTML?: { __html: string } }) => <script data-strategy={strategy} {...props} />,
}));

function queuedCommands() {
  return window.dataLayer.map((command) => Array.from(command as IArguments));
}

beforeEach(() => {
  delete window.murphysConsentChoice;
  vi.clearAllMocks();
  localStorage.clear();
  navigation.pathname = '/locations/palm-desert';
  window.dataLayer = [];
  Reflect.deleteProperty(window, 'gtag');
  delete window.murphysConsentInitialized;
});

it('initializes stored consent before GA config and preserves one initial pageview', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  const { container, rerender } = render(<GoogleAnalytics />);
  const scripts = container.querySelectorAll('script');
  expect(scripts[0].id).toBe('google-analytics');
  expect(scripts[1].src).toBe('https://www.googletagmanager.com/gtag/js?id=G-TEST1234');
  new Function('window', scripts[0].textContent ?? '')(window);
  expect(queuedCommands()[0]).toEqual(['consent', 'default', expect.objectContaining({ analytics_storage: 'granted' })]);
  expect(queuedCommands()[1][0]).toBe('js');
  expect(queuedCommands()[2][0]).toBe('config');
  expect(pageview).not.toHaveBeenCalled();
  navigation.pathname = '/locations/palm-desert/turf-cleaning-in-indio';
  rerender(<GoogleAnalytics />);
  expect(pageview).toHaveBeenCalledExactlyOnceWith(navigation.pathname);
});

it('retains a queued choice when analytics initializes after a banner click', () => {
  saveConsent('accepted');
  const { container } = render(<GoogleAnalytics />);
  new Function('window', container.querySelector('#google-analytics')?.textContent ?? '')(window);
  const commands = queuedCommands();
  expect(commands.map((command) => command.slice(0, 2))).toEqual([
    ['consent', 'default'], ['consent', 'update'], ['js', expect.any(Date)], ['config', 'G-TEST1234'],
  ]);
  expect(commands[1][2]).toMatchObject({ analytics_storage: 'granted' });
});
