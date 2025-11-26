import { UtilityCost } from '../types';

interface UtilitiesFormProps {
  energy?: UtilityCost;
  water?: UtilityCost;
  gas?: UtilityCost;
  defaultValues: {
    energy: number;
    water: number;
    gas: number;
  };
  onEnergyChange: (utility: UtilityCost | undefined) => void;
  onWaterChange: (utility: UtilityCost | undefined) => void;
  onGasChange: (utility: UtilityCost | undefined) => void;
}

export function UtilitiesForm({
  energy,
  water,
  gas,
  defaultValues,
  onEnergyChange,
  onWaterChange,
  onGasChange
}: UtilitiesFormProps) {
  const renderUtilitySection = (
    title: string,
    icon: string,
    utility: UtilityCost | undefined,
    onChange: (utility: UtilityCost | undefined) => void,
    unit: string,
    defaultPrice: number,
    unitLabel: string
  ) => {
    const enabled = utility?.enabled ?? false;
    
    return (
      <div className="card-glass mb-md" style={{ padding: 'var(--space-md)' }}>
        <div className="checkbox-wrapper mb-md">
          <input
            type="checkbox"
            className="checkbox"
            checked={enabled}
            onChange={(e) => {
              if (e.target.checked) {
                onChange({
                  enabled: true,
                  consumption: 0,
                  unit
                });
              } else {
                onChange(undefined);
              }
            }}
          />
          <strong>{icon} {title}</strong>
        </div>
        
        {enabled && (
          <>
            <div className="form-group">
              <label className="form-label">Consumo ({unit})</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                step="0.01"
                value={utility?.consumption || ''}
                onChange={(e) => onChange({
                  ...utility!,
                  consumption: Number(e.target.value)
                })}
              />
            </div>
            
            <div className="divider"></div>
            
            <p className="text-secondary mb-sm" style={{ fontSize: '0.85rem' }}>
              Opcional: Informe sua conta para cálculo personalizado
            </p>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Valor da Conta (R$)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder={`Padrão: R$ ${defaultPrice.toFixed(2)}/${unit}`}
                  min="0"
                  step="0.01"
                  value={utility?.totalBill || ''}
                  onChange={(e) => onChange({
                    ...utility!,
                    totalBill: e.target.value ? Number(e.target.value) : undefined
                  })}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Consumo Total da Conta ({unit})</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  value={utility?.totalConsumption || ''}
                  onChange={(e) => onChange({
                    ...utility!,
                    totalConsumption: e.target.value ? Number(e.target.value) : undefined
                  })}
                />
              </div>
            </div>
            
            <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: 'var(--space-sm)' }}>
              📊 {unitLabel}: R$ {defaultPrice.toFixed(2)}/{unit}
            </p>
          </>
        )}
      </div>
    );
  };
  
  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h3 className="card-title">⚡ Utilidades</h3>
        <p className="card-subtitle">Custos de energia, água e gás</p>
      </div>
      
      {renderUtilitySection(
        'Energia Elétrica',
        '💡',
        energy,
        onEnergyChange,
        'kWh',
        defaultValues.energy,
        'Média Brasil'
      )}
      
      {renderUtilitySection(
        'Água',
        '💧',
        water,
        onWaterChange,
        'm³',
        defaultValues.water,
        'Média Brasil'
      )}
      
      {renderUtilitySection(
        'Gás (GLP)',
        '🔥',
        gas,
        onGasChange,
        'kg',
        defaultValues.gas,
        'Baseado em botijão 13kg'
      )}
    </div>
  );
}
