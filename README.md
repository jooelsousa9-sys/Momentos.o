# Nosso Tempo Juntos
Nosso Tempo Juntos é um site simples e romântico desenvolvido em HTML, CSS e JavaScript puro, criado para que casais possam acompanhar, em tempo real, o tempo do seu relacionamento e suas metas importantes.

O site permite personalizar nomes, datas e até a imagem de fundo, criando uma experiência única e emocional para cada casal. Todos os dados são salvos automaticamente no navegador, garantindo que nada seja perdido ao atualizar a página.

## Correções e atualizações (2026-01-04)

Fiz correções adicionais após atualizações do projeto que causavam falha ao inserir dados pelo usuário. Principais mudanças:

- Movi as declarações e capturas dos elementos DOM (`namesInput`, `startDateInput`, `goalDate`, etc.) para o topo de `script.js` para evitar referências indefinidas.
- Tornei o código resiliente à remoção do checkbox `enableGoal`: agora verifica a existência do elemento antes de adicionar listeners e salvar seu estado.
- Corrigi as funções do modal de meta (`openGoalModal`, `closeGoalModal`, `saveGoal`) — havia erros de digitação (`fuction`) e referências a IDs incorretos.
- Melhorei `saveData()` e `loadData()` para lidar com casos em que a meta vem do modal, atualizando `goalBox`, `goalLabel` e `goalDate` corretamente.

Como testar as correções:

1. Abra `index.html` no navegador.
2. Preencha `Nome do casal` e `Início do relacionamento`, clique em `Iniciar` e verifique se o contador aparece.
3. Clique em `Adicionar Meta`, preencha `Descrição da Meta` e `Data para alcançar`, clique em `Salvar Meta` e confira se a meta aparece em `Falta para a meta`.
4. Abra o Console do DevTools (F12) caso algo não funcione e envie a mensagem de erro para diagnóstico.

Se desejar, posso também adicionar validações visuais no formulário e mensagens de erro na interface.