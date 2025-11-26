import { RawMaterial } from '../types';

interface RawMaterialsFormProps {
  materials: RawMaterial[];
  onMaterialsChange: (materials: RawMaterial[]) => void;
}

export function RawMaterialsForm({ materials, onMaterialsChange }: RawMaterialsFormProps) {
  const addMaterial = () => {
    onMaterialsChange([
      ...(materials || []),
      {
        name: '',
        quantityUsed: 0,
        unitUsed: 'g',
        totalQuantity: 0,
        totalUnit: 'kg',
        totalCost: 0
      }
    ]);
  };
  
  const removeMaterial = (index: number) => {
    if (!materials) return;
    onMaterialsChange(materials.filter((_, i) => i !== index));
  };
  
  const updateMaterial = (index: number, field: keyof RawMaterial, value: any) => {
    if (!materials) return;
    const updated = [...materials];
    if (!updated[index]) return;
    updated[index] = { ...updated[index], [field]: value };
    onMaterialsChange(updated);
  };
  
  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h3 className="card-title">🥄 Matérias-Primas</h3>
        <p className="card-subtitle">Adicione os ingredientes ou materiais utilizados</p>
      </div>
      
      {(materials || []).map((material, index) => {
        if (!material) return null;
        
        return (
        <div key={index} className="card-glass mb-md" style={{ padding: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
          <div className="flex justify-between items-center mb-sm">
            <strong>Material {index + 1}</strong>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeMaterial(index)}
            >
              ✕ Remover
            </button>
          </div>
          
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Farinha de trigo"
              value={material.name || ''}
              onChange={(e) => updateMaterial(index, 'name', e.target.value)}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Qtd. Usada</label>
              <input
                type="number"
                className="form-input"
                placeholder="500"
                min="0"
                step="0.01"
                value={material.quantityUsed || ''}
                onChange={(e) => updateMaterial(index, 'quantityUsed', Number(e.target.value))}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Unidade</label>
              <select
                className="form-select"
                value={material.unitUsed || 'g'}
                onChange={(e) => updateMaterial(index, 'unitUsed', e.target.value)}
              >
                <option value="g">g (gramas)</option>
                <option value="kg">kg (quilogramas)</option>
                <option value="ml">ml (mililitros)</option>
                <option value="l">L (litros)</option>
                <option value="un">un (unidades)</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Qtd. Total do Pacote</label>
              <input
                type="number"
                className="form-input"
                placeholder="1"
                min="0"
                step="0.01"
                value={material.totalQuantity || ''}
                onChange={(e) => updateMaterial(index, 'totalQuantity', Number(e.target.value))}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Unidade do Pacote</label>
              <select
                className="form-select"
                value={material.totalUnit || 'kg'}
                onChange={(e) => updateMaterial(index, 'totalUnit', e.target.value)}
              >
                <option value="g">g (gramas)</option>
                <option value="kg">kg (quilogramas)</option>
                <option value="ml">ml (mililitros)</option>
                <option value="l">L (litros)</option>
                <option value="un">un (unidades)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Custo Total (R$)</label>
              <input
                type="number"
                className="form-input"
                placeholder="10.00"
                min="0"
                step="0.01"
                value={material.totalCost || ''}
                onChange={(e) => updateMaterial(index, 'totalCost', Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      );
      })}
      
      <button className="btn btn-primary" onClick={addMaterial}>
        ➕ Adicionar Material
      </button>
    </div>
  );
}
