import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ padding: 'var(--space-2xl)', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>💥</div>
          <h1>Ops! Algo deu errado.</h1>
          <p className="text-secondary" style={{ marginBottom: 'var(--space-xl)' }}>
            Ocorreu um erro inesperado na aplicação.
          </p>
          
          {this.state.error && (
            <div style={{ 
              textAlign: 'left', 
              background: 'rgba(0,0,0,0.3)', 
              padding: 'var(--space-lg)', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'auto',
              maxWidth: '800px',
              width: '100%',
              marginBottom: 'var(--space-xl)',
              border: '1px solid var(--border-color)'
            }}>
              <code style={{ color: 'var(--error)' }}>
                {this.state.error.toString()}
              </code>
            </div>
          )}
          
          <button 
            className="btn btn-primary" 
            onClick={() => window.location.reload()}
          >
            🔄 Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
