import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { CookieConsent } from '../../components/analytics/CookieConsent';

describe('CookieConsent', () => {
  beforeEach(() => {
    delete window.murphysConsentChoice;
    localStorage.clear();
    (localStorage.getItem as ReturnType<typeof vi.fn>).mockClear();
    (localStorage.setItem as ReturnType<typeof vi.fn>).mockClear();
    window.dataLayer = [];
    Reflect.deleteProperty(window, 'gtag');
    delete window.murphysConsentInitialized;
  });

  it('shows banner when no consent in localStorage', () => {
    render(<CookieConsent />);

    expect(screen.getByRole('region', { name: 'Cookie preferences' })).toBeInTheDocument();
    expect(screen.getByText(/We use cookies/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
  });

  it('does not show banner when consent already exists', () => {
    localStorage.setItem('murphys_turf_cookie_consent', 'accepted');

    render(<CookieConsent />);

    expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();
  });

  it('asks again for an invalid stored choice', () => {
    localStorage.setItem('murphys_turf_cookie_consent', 'true');
    render(<CookieConsent />);
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
  });

  it('Accept button hides banner and sets localStorage', async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    expect(screen.getByText(/We use cookies/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Accept' }));

    expect(localStorage.setItem).toHaveBeenCalledWith('murphys_turf_cookie_consent', 'accepted');
    const commands = window.dataLayer.map((command) => Array.from(command as IArguments));
    expect(commands.at(-1)).toEqual(['consent', 'update', expect.objectContaining({ analytics_storage: 'granted' })]);
    await waitFor(() => {
      expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();
    });
  });

  it('Decline button hides banner and sets localStorage', async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    expect(screen.getByText(/We use cookies/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Decline' }));

    expect(localStorage.setItem).toHaveBeenCalledWith('murphys_turf_cookie_consent', 'declined');
    const commands = window.dataLayer.map((command) => Array.from(command as IArguments));
    expect(commands.at(-1)).toEqual(['consent', 'update', expect.objectContaining({ analytics_storage: 'denied' })]);
    await waitFor(() => {
      expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();
    });
  });

  it('renders cookie consent text', () => {
    render(<CookieConsent />);

    expect(
      screen.getByText(/We use cookies to improve your experience and analyze site traffic/),
    ).toBeInTheDocument();
  });
});
