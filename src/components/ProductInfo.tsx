import { Sector, SectorOption } from '../types';

interface ProductInfoProps {
  productName: string;
  sector: Sector;
  quantity: number;
  sectors: SectorOption[];
  onProductNameChange: (name: string) => void;
  onSectorChange: (sector: Sector) => void;
  onQuantityChange: (quantity: number) => void;
}

export function ProductInfo({
  productName,
  sector,
  quantity,
  sectors,
  onProductNameChange,
  onSectorChange,
  onQuantityChange
}: ProductInfoProps) {
  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h3 className="card-title">📦 Informações do Produto</h3>
        <p className="card-subtitle">Defina as informações básicas do seu produto</p>
      </div>
      
      <div className="form-group">
        <label className="form-label">Nome do Produto</label>
        <input
          type="text"
          className="form-input"
          placeholder="Ex: Bolo de chocolate"
          value={productName}
          onChange={(e) => onProductNameChange(e.target.value)}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Setor</label>
          <select
            className="form-select"
            value={sector}
            onChange={(e) => onSectorChange(e.target.value as Sector)}
          >
            {sectors.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label} (margem sugerida: {s.suggestedMargin}%)
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Quantidade Produzida</label>
          <input
            type="number"
            className="form-input"
            placeholder="Ex: 10"
            min="1"
            value={quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
