import { render, screen } from '@testing-library/react';

import JobListing from './JobListing';

describe('JobListing component', () => {
  const mockJobData = {
    company: "Account",
    logo: "/logos/account.svg",
    new: true,
    featured: true,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA Only",
    languages: ["JavaScript", "HTML"],
    tools: ["React", "Sass"]
  };

  const mockDispatch = jest.fn();

  it('renders Card with "featured" className (if given "featured" prop)', () => {
    render(<JobListing {...mockJobData} dispatch={mockDispatch} />);

    const cardComponent = screen.getByRole('article');
    expect(cardComponent).toHaveClass('featured');
  });

  it('renders proper company logo', () => {
    render(<JobListing {...mockJobData} dispatch={mockDispatch} />);
    
    const companyLogo = screen.getByRole('img');
    expect(companyLogo.src).toContain(mockJobData.logo);
  });

  it('renders proper job offer details from props', () => {
    render(<JobListing {...mockJobData} dispatch={mockDispatch} />);
    
    const companyName = screen.getByTestId('company-name');
    const jobPosition = screen.getByLabelText('link');
    const offerPostedAt = screen.getByTestId('posted');
    const contractType = screen.getByTestId('contract');
    const jobLocation = screen.getByTestId('location');

    const chipNew = screen.getByText('NEW!');
    const chipFeatured = screen.getByText('FEATURED');

    expect(companyName).toHaveTextContent(mockJobData.company);
    expect(jobPosition).toHaveTextContent(mockJobData.position);
    expect(offerPostedAt).toHaveTextContent(mockJobData.postedAt);
    expect(contractType).toHaveTextContent(mockJobData.contract);
    expect(jobLocation).toHaveTextContent(mockJobData.location);

    expect(chipNew).toBeVisible();
    expect(chipFeatured).toBeVisible();
  });

  it('renders proper filter keywords from props', () => {
    render(<JobListing {...mockJobData} dispatch={mockDispatch} />);
    
    const roleFilter = screen.getByText(mockJobData.role);
    const levelFilter = screen.getByText(mockJobData.level);

    expect(roleFilter).toBeVisible();
    expect(levelFilter).toBeVisible();

    mockJobData.languages.forEach((language) => {
      const languageFilter = screen.getByText(language);
      expect(languageFilter).toBeVisible();
    });

    mockJobData.tools.forEach((tool) => {
      const toolFilter = screen.getByText(tool);
      expect(toolFilter).toBeVisible();
    });
  });
});