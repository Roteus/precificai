interface FinalPriceDisplayProps {
  totalCost: number;
  finalPrice: number;
  pricePerUnit: number;
  appliedMargin: number;
  markup: number;
  quantity: number;
}

export function FinalPriceDisplay({
  totalCost,
  finalPrice,
  pricePerUnit,
  appliedMargin,
  markup,
  quantity
}: FinalPriceDisplayProps) {
  return (
    <div className="card animate-fade-in" style={{ background: 'linear-gradient(145deg, var(--surface), var(--background))' }}>
      <div className="card-header">
        <h3 className="card-title">💰 Preço Final Sugerido</h3>
        <p className="card-subtitle">Baseado nos custos e margem de lucro</p>
      </div>
      
      <div className="grid grid-2" style={{ alignItems: 'center' }}>
        <div>
          <div className="mb-md">
            <span className="text-secondary text-sm">Custo Total</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>
              R$ {(totalCost || 0).toFixed(2)}
            </div>
          </div>
          
          <div className="mb-md">
            <span className="text-secondary text-sm">Preço Sugerido</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>
              R$ {(finalPrice || 0).toFixed(2)}
            </div>
          </div>
          
          <div>
            <span className="text-secondary text-sm">Preço por Unidade ({quantity} un)</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>
              R$ {(pricePerUnit || 0).toFixed(2)}
            </div>
          </div>
        </div>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          padding: 'var(--space-lg)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <div className="flex justify-between mb-sm">
            <span className="text-secondary">Margem Aplicada:</span>
            <strong>{(appliedMargin || 0).toFixed(1)}%</strong>
          </div>
          
          <div className="flex justify-between mb-sm">
            <span className="text-secondary">Lucro Estimado:</span>
            <strong style={{ color: 'var(--success)' }}>
              R$ {((finalPrice || 0) - (totalCost || 0)).toFixed(2)}
            </strong>
          </div>
          
          <div className="flex justify-between">
            <span className="text-secondary">Markup:</span>
            <strong>{(markup || 0).toFixed(1)}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
