import { useEffect, useState } from 'react';

interface ProfitMarginSelectorProps {
  suggestedMargin: number;
  appliedMargin: number;
  onMarginChange: (margin: number) => void;
}

export function ProfitMarginSelector({
  suggestedMargin,
  appliedMargin,
  onMarginChange
}: ProfitMarginSelectorProps) {
  const [useCustom, setUseCustom] = useState(false);
  
  useEffect(() => {
    if (!useCustom && appliedMargin !== suggestedMargin) {
      setUseCustom(true);
    }
  }, [appliedMargin, suggestedMargin, useCustom]);
  
  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h3 className="card-title">📈 Margem de Lucro</h3>
        <p className="card-subtitle">Defina sua margem de lucro desejada</p>
      </div>
      
      <div className="checkbox-wrapper mb-md">
        <input
          type="checkbox"
          className="checkbox"
          checked={useCustom}
          onChange={(e) => {
            setUseCustom(e.target.checked);
            if (!e.target.checked) {
              onMarginChange(suggestedMargin);
            }
          }}
        />
        <label>Usar margem personalizada</label>
      </div>
      
      {!useCustom ? (
        <div className="card-glass" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
          <div className="badge badge-primary mb-sm">Margem Sugerida</div>
          <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--success)' }}>
            {suggestedMargin}%
          </div>
          <p className="text-secondary" style={{ marginTop: 'var(--space-sm)' }}>
            Baseado no setor selecionado
          </p>
        </div>
      ) : (
        <div className="form-group">
          <label className="form-label">Margem de Lucro (%)</label>
          <input
            type="number"
            className="form-input"
            placeholder="30"
            min="0"
            max="1000"
            step="0.1"
            value={appliedMargin}
            onChange={(e) => onMarginChange(Number(e.target.value) || 0)}
            style={{ fontSize: '1.5rem', textAlign: 'center', fontWeight: '700' }}
          />
          <small className="text-muted">
            Margem sugerida para este setor: {suggestedMargin}%
          </small>
        </div>
      )}
    </div>
  );
}
