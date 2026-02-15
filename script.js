// Mock data for demonstration
const portfolioData = {
  totalValue: 127847.32,
  change24h: 4829.41,
  changePercent: 3.93,
  tokens: [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      chain: 'ethereum',
      balance: 24.5,
      price: 2847.32,
      change24h: 2.4,
      icon: '🔷',
      color: '#627EEA'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      chain: 'solana',
      balance: 342.8,
      price: 98.45,
      change24h: 5.8,
      icon: '◆',
      color: '#9945FF'
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      chain: 'bsc',
      balance: 45.2,
      price: 312.67,
      change24h: -1.2,
      icon: '◆',
      color: '#F3BA2F'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      chain: 'ethereum',
      balance: 15420.00,
      price: 1.00,
      change24h: 0.01,
      icon: '●',
      color: '#2775CA'
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      chain: 'ethereum',
      balance: 892.4,
      price: 15.23,
      change24h: 4.2,
      icon: '🔗',
      color: '#375BD2'
    },
    {
      symbol: 'MATIC',
      name: 'Polygon',
      chain: 'ethereum',
      balance: 3240.5,
      price: 0.87,
      change24h: -2.1,
      icon: '◆',
      color: '#8247E5'
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      chain: 'ethereum',
      balance: 125.8,
      price: 6.42,
      change24h: 1.8,
      icon: '🦄',
      color: '#FF007A'
    },
    {
      symbol: 'AVAX',
      name: 'Avalanche',
      chain: 'ethereum',
      balance: 78.3,
      price: 38.92,
      change24h: 3.5,
      icon: '▲',
      color: '#E84142'
    }
  ],
  transactions: [
    {
      type: 'receive',
      token: 'ETH',
      amount: 2.5,
      from: '0x742d35Cc6634C0532925a3b8D3E8E3f4a',
      timestamp: '2 hours ago',
      chain: 'ethereum'
    },
    {
      type: 'send',
      token: 'USDC',
      amount: 1500,
      to: '0x8f3E9D4b2c1a7F6e5d4C3b2A1',
      timestamp: '5 hours ago',
      chain: 'ethereum'
    },
    {
      type: 'receive',
      token: 'SOL',
      amount: 42.8,
      from: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      timestamp: '1 day ago',
      chain: 'solana'
    },
    {
      type: 'send',
      token: 'BNB',
      amount: 5.2,
      to: '0x9c8A3F2D1e4B7c6a5d3E2f1B0',
      timestamp: '1 day ago',
      chain: 'bsc'
    },
    {
      type: 'receive',
      token: 'LINK',
      amount: 125.4,
      from: '0x1a2B3c4D5e6F7a8B9c0D1e2F3',
      timestamp: '2 days ago',
      chain: 'ethereum'
    },
    {
      type: 'send',
      token: 'MATIC',
      amount: 500,
      to: '0x4f5E6d7C8b9A0e1F2d3C4b5A6',
      timestamp: '3 days ago',
      chain: 'ethereum'
    }
  ]
};

// Animate portfolio value counter
function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = '$' + current.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  }, 16);
}

// Initialize portfolio summary
function initPortfolioSummary() {
  const valueElement = document.getElementById('portfolioValue');
  const pnlElement = document.getElementById('pnl24h');
  const pnlPercentElement = document.getElementById('pnlPercent');
  
  setTimeout(() => {
    animateValue(valueElement, 0, portfolioData.totalValue, 1200);
  }, 300);
  
  const isPositive = portfolioData.change24h >= 0;
  pnlElement.textContent = `${isPositive ? '+' : ''}$${portfolioData.change24h.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  pnlElement.className = isPositive ? 'text-emerald-500 text-sm font-mono font-semibold' : 'text-red-500 text-sm font-mono font-semibold';
  
  pnlPercentElement.textContent = `${isPositive ? '+' : ''}${portfolioData.changePercent.toFixed(2)}%`;
  pnlPercentElement.className = isPositive ? 'text-emerald-500 text-sm' : 'text-red-500 text-sm';
}

// Render token table
function renderTokenTable(filterChain = 'all') {
  const tableBody = document.getElementById('tokenTable');
  const filteredTokens = filterChain === 'all' 
    ? portfolioData.tokens 
    : portfolioData.tokens.filter(t => t.chain === filterChain);
  
  tableBody.innerHTML = filteredTokens.map(token => {
    const value = token.balance * token.price;
    const isPositive = token.change24h >= 0;
    const changeClass = isPositive ? 'positive' : 'negative';
    
    return `
      <tr class="token-row">
        <td class="py-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-xl" style="background: ${token.color}20; color: ${token.color}">
              ${token.icon}
            </div>
            <div>
              <p class="font-semibold">${token.symbol}</p>
              <p class="text-xs text-slate-500">${token.name}</p>
            </div>
          </div>
        </td>
        <td class="text-right font-mono text-sm">${token.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="text-right font-mono text-sm">$${token.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="text-right font-mono text-sm ${changeClass}">${isPositive ? '+' : ''}${token.change24h.toFixed(2)}%</td>
        <td class="text-right font-semibold">$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      </tr>
    `;
  }).join('');
}

// Render allocation chart
function renderAllocationChart() {
  const ctx = document.getElementById('allocationChart').getContext('2d');
  
  const sortedTokens = [...portfolioData.tokens]
    .map(token => ({
      ...token,
      value: token.balance * token.price
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
  
  const totalValue = sortedTokens.reduce((sum, token) => sum + token.value, 0);
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sortedTokens.map(t => t.symbol),
      datasets: [{
        data: sortedTokens.map(t => t.value),
        backgroundColor: sortedTokens.map(t => t.color),
        borderColor: '#0f172a',
        borderWidth: 3,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleColor: '#f1f5f9',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const value = context.parsed;
              const percentage = ((value / totalValue) * 100).toFixed(1);
              return `${context.label}: $${value.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
  
  // Render legend
  const legendContainer = document.getElementById('chartLegend');
  legendContainer.innerHTML = sortedTokens.map(token => {
    const percentage = ((token.value / totalValue) * 100).toFixed(1);
    return `
      <div class="legend-item flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full" style="background: ${token.color}"></div>
          <span class="text-sm font-medium">${token.symbol}</span>
        </div>
        <span class="text-sm font-mono text-slate-400">${percentage}%</span>
      </div>
    `;
  }).join('');
}

// Render transaction history
function renderTransactions(filterChain = 'all') {
  const transactionList = document.getElementById('transactionList');
  const filteredTxs = filterChain === 'all'
    ? portfolioData.transactions
    : portfolioData.transactions.filter(t => t.chain === filterChain);
  
  transactionList.innerHTML = filteredTxs.map(tx => {
    const isReceive = tx.type === 'receive';
    const address = isReceive ? tx.from : tx.to;
    const truncated = `${address.slice(0, 6)}...${address.slice(-4)}`;
    
    return `
      <div class="transaction-row glass-light rounded-xl p-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center ${isReceive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              ${isReceive 
                ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>'
                : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>'
              }
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <p class="font-semibold">${isReceive ? 'Received' : 'Sent'} ${tx.token}</p>
              <span class="text-xs text-slate-500 font-mono">${truncated}</span>
            </div>
            <p class="text-xs text-slate-500">${tx.timestamp}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-mono font-semibold ${isReceive ? 'text-emerald-500' : 'text-slate-300'}">
            ${isReceive ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${tx.token}
          </p>
        </div>
      </div>
    `;
  }).join('');
}

// Chain filter functionality
function initChainFilter() {
  const chainButtons = document.querySelectorAll('.chain-pill');
  
  chainButtons.forEach(button => {
    button.addEventListener('click', () => {
      chainButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const chain = button.getAttribute('data-chain');
      renderTokenTable(chain);
      renderTransactions(chain);
    });
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initPortfolioSummary();
  renderTokenTable();
  renderAllocationChart();
  renderTransactions();
  initChainFilter();
});