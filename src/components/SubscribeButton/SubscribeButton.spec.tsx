import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils'; 
import { signIn, useSession } from 'next-auth/client';
import { SubscribeButton } from '.';

jest.mock('next-auth/client');

jest.mock('next/router');

describe('SubscribeButton component', () => {

  it('renders correctly', () => {

    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(
      <SubscribeButton/>
    )
  
    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });
  
  it('redirect user to sign when not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signInMoked = mocked(signIn);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton/>);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMoked).toHaveBeenCalled();
  });

  it('redirects to  post when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);

    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      { 
        user: { name: "John Doe", email: "jhondoe@exaple.com.br" },
        expires: 'fake-expires', activeSubscription: {}
      },
       false
    ]);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton/>);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
 
});
