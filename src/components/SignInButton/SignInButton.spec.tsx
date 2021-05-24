import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils'; 
import { SignInButtom } from '.';

jest.mock('next-auth/client');

describe('SignInButton', () => {

  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(
      <SignInButtom/>
    )
  
    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {

    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      { 
        user: { name: "John Doe", email: "jhondoe@exaple.com.br" },
        expires: 'fake-expires', activeSubscription:{}
      },
       false
      ]);
    render(
      <SignInButtom/>
    )
  
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
