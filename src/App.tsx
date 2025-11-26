import { useState, useEffect } from 'react';
import { ProductInfo } from './components/ProductInfo';
import { RawMaterialsForm } from './components/RawMaterialsForm';
import { UtilitiesForm } from './components/UtilitiesForm';
import { AdditionalCostsForm } from './components/AdditionalCostsForm';
import { ProfitMarginSelector } from './components/ProfitMarginSelector';
import { CostBreakdownDisplay } from './components/CostBreakdownDisplay';
import { FinalPriceDisplay } from './components/FinalPriceDisplay';
import { pricingApi } from './api/pricingApi';
import { Sector } from './types';
import type { 
  RawMaterial, 
  UtilityCost, 
  PricingResponse,
  SectorOption 
} from './types';
import './index.css';

function App() {
  // Estado básico
  const [productName, setProductName] = useState('');
  const [sector, setSector] = useState<Sector>(Sector.FOOD);
  const [quantity, setQuantity] = useState(1);
  
  // Matérias-primas
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  
  // Utilidades
  const [energy, setEnergy] = useState<UtilityCost | undefined>();
  const [water, setWater] = useState<UtilityCost | undefined>();
  const [gas, setGas] = useState<UtilityCost | undefined>();
  
  // Custos adicionais
  const [labor, setLabor] = useState(0);
  const [packaging, setPackaging] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [fixedCosts, setFixedCosts] = useState(0);
  
  // Margem de lucro
  const [profitMargin, setProfitMargin] = useState<number | undefined>();
  
  // Dados da API
  const [sectors, setSectors] = useState<SectorOption[]>([]);
  const [defaultValues, setDefaultValues] = useState({
    energy: 0.85,
    water: 4.50,
    gas: 9.23
  });
  
  // Resultado
  const [result, setResult] = useState<PricingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Carregar dados iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Verificar se API está rodando
        await pricingApi.healthCheck();
        
        // Carregar setores
        const sectorsData = await pricingApi.getSectors();
        setSectors(sectorsData);
        
        // Carregar valores padrão
        const defaults = await pricingApi.getDefaults();
        setDefaultValues({
          energy: defaults.utilities.energy,
          water: defaults.utilities.water,
          gas: defaults.utilities.gasPerKg
        });
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Erro ao conectar com a API. Certifique-se de que o servidor está rodando.');
      }
    };
    
    loadInitialData();
  }, []);
  
  // Calcular preço quando dados mudarem
  useEffect(() => {
    const calculatePrice = async () => {
      // Validar dados mínimos
      if (!productName || materials.length === 0) {
        setResult(null);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await pricingApi.calculatePricing({
          productName,
          sector,
          quantity,
          rawMaterials: materials,
          utilities: {
            energy,
            water,
            gas
          },
          labor,
          packaging,
          taxes,
          fixedCosts,
          profitMargin
        });
        
        setResult(response);
        
        // Se não definiu margem, usa a sugerida
        if (profitMargin === undefined) {
          setProfitMargin(response.suggestedMargin);
        }
      } catch (err) {
        console.error('Error calculating pricing:', err);
        setError('Erro ao calcular precificação. Verifique os dados informados.');
        setResult(null);
      } finally {
        setLoading(false);
      }
    };
    
    // Debounce para evitar muitas requisições
    const timeoutId = setTimeout(calculatePrice, 500);
    
    return () => clearTimeout(timeoutId);
  }, [
    productName,
    sector,
    quantity,
    materials,
    energy,
    water,
    gas,
    labor,
    packaging,
    taxes,
    fixedCosts,
    profitMargin
  ]);
  
  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1>💰 Sistema de Precificação</h1>
          <p>Calcule o preço ideal para seus produtos com precisão</p>
        </div>
      </header>
      
      <div className="container">
        {error && (
          <div className="error animate-fade-in">
            ⚠️ {error}
          </div>
        )}
        
        <div className="grid grid-2">
          {/* Coluna Esquerda - Inputs */}
          <div>
            <ProductInfo
              productName={productName}
              sector={sector}
              quantity={quantity}
              sectors={sectors}
              onProductNameChange={setProductName}
              onSectorChange={setSector}
              onQuantityChange={setQuantity}
            />
            
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <RawMaterialsForm
                materials={materials}
                onMaterialsChange={setMaterials}
              />
            </div>
            
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <UtilitiesForm
                energy={energy}
                water={water}
                gas={gas}
                defaultValues={defaultValues}
                onEnergyChange={setEnergy}
                onWaterChange={setWater}
                onGasChange={setGas}
              />
            </div>
            
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <AdditionalCostsForm
                labor={labor}
                packaging={packaging}
                taxes={taxes}
                fixedCosts={fixedCosts}
                onLaborChange={setLabor}
                onPackagingChange={setPackaging}
                onTaxesChange={setTaxes}
                onFixedCostsChange={setFixedCosts}
              />
            </div>
          </div>
          
          {/* Coluna Direita - Results */}
          <div>
            <ProfitMarginSelector
              suggestedMargin={result?.suggestedMargin || 30}
              appliedMargin={profitMargin || result?.suggestedMargin || 30}
              onMarginChange={setProfitMargin}
            />
            
            {loading && (
              <div className="loading mt-xl">
                <div className="spinner"></div>
                <p style={{ marginLeft: 'var(--space-md)' }}>Calculando...</p>
              </div>
            )}
            
            {result && !loading && (
              <>
                <div style={{ marginTop: 'var(--space-xl)' }}>
                  <FinalPriceDisplay
                    totalCost={result.totalCost}
                    finalPrice={result.finalPrice}
                    pricePerUnit={result.pricePerUnit}
                    appliedMargin={result.appliedMargin}
                    markup={result.markup}
                    quantity={quantity}
                  />
                </div>
                
                <div style={{ marginTop: 'var(--space-xl)' }}>
                  <CostBreakdownDisplay breakdown={result.costBreakdown} />
                </div>
              </>
            )}
            
            {!result && !loading && !error && (
              <div className="card mt-xl" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
                <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>📊</div>
                <h3>Preencha as informações</h3>
                <p className="text-secondary">
                  Adicione o nome do produto e pelo menos uma matéria-prima para calcular o preço
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
