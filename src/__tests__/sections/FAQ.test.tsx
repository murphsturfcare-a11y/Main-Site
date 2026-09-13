import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import FAQ from '@/components/sections/FAQ';
import { homeFaqs } from '@/data/home-faqs';

describe('FAQ', () => {
  it('renders the heading and every shared question and answer', () => {
    render(<FAQ />);
    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();
    for (const item of homeFaqs) {
      expect(screen.getByText(item.question).closest('summary')).not.toBeNull();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }
  });

  it('starts collapsed and opens and closes through native disclosure behavior', async () => {
    const user = userEvent.setup();
    const { container } = render(<FAQ />);
    const items = container.querySelectorAll('details');
    for (const item of items) expect(item.open).toBe(false);
    const question = screen.getByText(homeFaqs[0].question);
    await user.click(question);
    expect(items[0].open).toBe(true);
    await user.click(question);
    expect(items[0].open).toBe(false);
  });

  it('groups disclosures per instance without coupling separate FAQ sections', () => {
    const { container } = render(<><FAQ /><FAQ /></>);
    const sections = container.querySelectorAll('section');
    const names = [...sections].map((section) => [...section.querySelectorAll('details')].map((item) => item.getAttribute('name')));
    expect(new Set(names[0]).size).toBe(1);
    expect(new Set(names[1]).size).toBe(1);
    expect(names[0][0]).not.toBe(names[1][0]);
  });

  it('renders the supplied local questions and answers', () => {
    const items = [{ question: 'Which community is covered?', answer: 'Palm Desert and the listed nearby cities.' }];
    const { container } = render(<FAQ items={items} />);
    expect(container.querySelectorAll('details')).toHaveLength(1);
    expect(screen.getByText(items[0].question)).toBeInTheDocument();
    expect(screen.getByText(items[0].answer)).toBeInTheDocument();
  });
});
