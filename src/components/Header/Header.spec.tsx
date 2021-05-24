import { render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
});

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <Header/>
    )

    screen.logTestingPlaygroundURL(); // abre um log com algumas informacoes no navegador.
  
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
