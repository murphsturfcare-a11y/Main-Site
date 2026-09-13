import { render } from '@testing-library/react';
import TestimonialSection from '@/components/sections/TestimonialSection';

describe('TestimonialSection', () => {
  it('renders no review section or rating summary when there are no sourced reviews', () => {
    const { container } = render(<TestimonialSection />);
    expect(container).toBeEmptyDOMElement();
  });
});
