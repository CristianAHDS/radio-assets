# Script para mover componentes para a pasta components

# Criar pastas necessárias
New-Item -ItemType Directory -Path "src/components/clockEsporte" -Force
New-Item -ItemType Directory -Path "src/components/clockFenadoce" -Force

# Mover componentes clock
Move-Item "src/clockEsporte.jsx" "src/components/clockEsporte/index.jsx" -Force
Move-Item "src/clockEsporte.styled.jsx" "src/components/clockEsporte/clockEsporte.styled.jsx" -Force
Move-Item "src/clockFenadoce.jsx" "src/components/clockFenadoce/index.jsx" -Force
Move-Item "src/clockFenadoce.styled.jsx" "src/components/clockFenadoce/clockFenadoce.styled.jsx" -Force

# Mover componentes lower
Move-Item "src/lower.jsx" "src/components/lower/index.jsx" -Force
Move-Item "src/lower.styled.jsx" "src/components/lower/lower.styled.jsx" -Force
Move-Item "src/lowerConexao.jsx" "src/components/lowerConexao/index.jsx" -Force
Move-Item "src/lowerConexao.styled.jsx" "src/components/lowerConexao/lowerConexao.styled.jsx" -Force
Move-Item "src/lowerEsporte.jsx" "src/components/lowerEsporte/index.jsx" -Force
Move-Item "src/lowerEsporte.styled.jsx" "src/components/lowerEsporte/lowerEsporte.styled.jsx" -Force
Move-Item "src/lowerFenadoce.jsx" "src/components/lowerFenadoce/index.jsx" -Force
Move-Item "src/lowerFenadoce.styled.jsx" "src/components/lowerFenadoce/lowerFenadoce.styled.jsx" -Force

# Mover componentes de páginas
Move-Item "src/conexao.jsx" "src/components/pages/conexao.jsx" -Force
Move-Item "src/conexao.styled.jsx" "src/components/pages/conexao.styled.jsx" -Force
Move-Item "src/esporte.jsx" "src/components/pages/esporte.jsx" -Force
Move-Item "src/esporte.styled.jsx" "src/components/pages/esporte.styled.jsx" -Force
Move-Item "src/fenadoce.jsx" "src/components/pages/fenadoce.jsx" -Force
Move-Item "src/fenadoce.styled.jsx" "src/components/pages/fenadoce.styled.jsx" -Force
Move-Item "src/geral.jsx" "src/components/pages/geral.jsx" -Force

Write-Host "Componentes movidos com sucesso!" 