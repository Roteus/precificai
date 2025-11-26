import { CostBreakdown } from '../types';

interface CostBreakdownDisplayProps {
  breakdown: CostBreakdown;
}

export function CostBreakdownDisplay({ breakdown }: CostBreakdownDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const getPercentage = (value: number) => {
    if (breakdown.total === 0) return 0;
    return ((value / breakdown.total) * 100).toFixed(1);
  };
  
  const costs = [
    { label: 'Matérias-Primas', value: breakdown.rawMaterials, icon: '🥄' },
    { label: 'Energia Elétrica', value: breakdown.utilities.energy, icon: '💡' },
    { label: 'Água', value: breakdown.utilities.water, icon: '💧' },
    { label: 'Gás', value: breakdown.utilities.gas, icon: '🔥' },
    { label: 'Mão de Obra', value: breakdown.labor, icon: '👷' },
    { label: 'Embalagem', value: breakdown.packaging, icon: '📦' },
    { label: 'Impostos', value: breakdown.taxes, icon: '📋' },
    { label: 'Custos Fixos', value: breakdown.fixedCosts, icon: '🏢' }
  ].filter(cost => cost.value > 0);
  
  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h3 className="card-title">📊 Detalhamento de Custos</h3>
        <p className="card-subtitle">Breakdown completo dos custos do produto</p>
      </div>
      
      {costs.length === 0 ? (
        <p className="text-secondary text-center" style={{ padding: 'var(--space-xl)' }}>
          Preencha os custos para ver o detalhamento
        </p>
      ) : (
        <>
          {costs.map((cost, index) => (
            <div key={index} className="cost-item">
              <div className="cost-label">
                <span style={{ marginRight: 'var(--space-xs)' }}>{cost.icon}</span>
                {cost.label}
              </div>
              <div className="flex items-center gap-md">
                <span className="badge">{getPercentage(cost.value)}%</span>
                <span className="cost-value">{formatCurrency(cost.value)}</span>
              </div>
            </div>
          ))}
          
          <div className="cost-total">
            <div className="flex justify-between items-center">
              <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                💰 Custo Total
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800' }}>
                {formatCurrency(breakdown.total)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
