
import React from 'react';
import { Container } from './Container';

interface MainWrapperProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

export function MainWrapper({ children, className = '', fluid = false }: MainWrapperProps) {
  return (
    <main className={`py-8 ${className}`}>
      <Container fluid={fluid}>
        {children}
      </Container>
    </main>
  );
}
