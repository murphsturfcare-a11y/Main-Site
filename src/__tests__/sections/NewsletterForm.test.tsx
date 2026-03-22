import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import NewsletterForm from '../../components/forms/NewsletterForm';

describe('NewsletterForm', () => {
  beforeEach(() => {
    render(<NewsletterForm />);
  });

  it('renders email input and submit button', () => {
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });

  it('shows validation error for empty email', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText('Email address');

    await user.type(input, 'not-an-email');
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('shows success message for valid email submission', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText('Email address');

    await user.type(input, 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    expect(
      screen.getByText(/Thanks! Visit your/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/to get started with a free quote\./),
    ).toBeInTheDocument();
  });

  it('success message contains link to /locations', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText('Email address');

    await user.type(input, 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    const link = screen.getByRole('link', { name: 'local office page' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/locations');
  });
});
