import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { CookieConsent } from '../../components/analytics/CookieConsent';

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
    (localStorage.getItem as ReturnType<typeof vi.fn>).mockClear();
    (localStorage.setItem as ReturnType<typeof vi.fn>).mockClear();
  });

  it('shows banner when no consent in localStorage', () => {
    render(<CookieConsent />);

    expect(screen.getByText(/We use cookies/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
  });

  it('does not show banner when consent already exists', () => {
    localStorage.setItem('murphys_turf_cookie_consent', 'accepted');

    render(<CookieConsent />);

    expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();
  });

  it('Accept button hides banner and sets localStorage', async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    expect(screen.getByText(/We use cookies/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Accept' }));

    expect(localStorage.setItem).toHaveBeenCalledWith('murphys_turf_cookie_consent', 'accepted');
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
