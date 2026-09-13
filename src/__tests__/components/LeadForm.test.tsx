import { renderToStaticMarkup } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import LeadForm from '@/components/forms/LeadForm';

describe('LeadForm progressive enhancement', () => {
  it('does not expose contact fields in a native GET before JavaScript is ready', () => {
    const html = renderToStaticMarkup(<LeadForm locationCity="Palm Desert" locationSlug="palm-desert" />);
    const document = new DOMParser().parseFromString(html, 'text/html');
    expect(document.querySelector('form')?.getAttribute('method')).toBe('post');
    expect(document.querySelector('button[type="submit"]')?.hasAttribute('disabled')).toBe(true);
    expect(document.querySelector('noscript')?.textContent).toContain('call the regional number');
  });

  it('enables submission once the client handler is ready', () => {
    render(<LeadForm locationCity="Palm Desert" locationSlug="palm-desert" />);
    expect(screen.getByRole('button', { name: 'Get Quote' })).toBeEnabled();
  });
});
