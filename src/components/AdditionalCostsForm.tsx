interface AdditionalCostsFormProps {
  labor: number;
  packaging: number;
  taxes: number;
  fixedCosts: number;
  onLaborChange: (value: number) => void;
  onPackagingChange: (value: number) => void;
  onTaxesChange: (value: number) => void;
  onFixedCostsChange: (value: number) => void;
}

export function AdditionalCostsForm({
  labor,
  packaging,
  taxes,
  fixedCosts,
  onLaborChange,
  onPackagingChange,
  onTaxesChange,
  onFixedCostsChange
}: AdditionalCostsFormProps) {
  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h3 className="card-title">💰 Custos Adicionais</h3>
        <p className="card-subtitle">Mão de obra, embalagem, impostos e custos fixos</p>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">👷 Mão de Obra (R$)</label>
          <input
            type="number"
            className="form-input"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={labor || ''}
            onChange={(e) => onLaborChange(Number(e.target.value) || 0)}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">📦 Embalagem (R$)</label>
          <input
            type="number"
            className="form-input"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={packaging || ''}
            onChange={(e) => onPackagingChange(Number(e.target.value) || 0)}
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">📋 Impostos (R$)</label>
          <input
            type="number"
            className="form-input"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={taxes || ''}
            onChange={(e) => onTaxesChange(Number(e.target.value) || 0)}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">🏢 Custos Fixos - Rateio (R$)</label>
          <input
            type="number"
            className="form-input"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={fixedCosts || ''}
            onChange={(e) => onFixedCostsChange(Number(e.target.value) || 0)}
          />
          <small className="text-muted" style={{ fontSize: '0.8rem' }}>
            Aluguel, internet, etc. proporcional ao produto
          </small>
        </div>
      </div>
    </div>
  );
}
