# Nosso Tempo Juntos
Nosso Tempo Juntos é um site simples e romântico desenvolvido em HTML, CSS e JavaScript puro, criado para que casais possam acompanhar, em tempo real, o tempo do seu relacionamento e suas metas importantes.

O site permite personalizar nomes, datas e até a imagem de fundo, criando uma experiência única e emocional para cada casal. Todos os dados são salvos automaticamente no navegador, garantindo que nada seja perdido ao atualizar a página.

## Correção importante (2026-01-04)

Corrigi um bug que impedia o script de rodar quando a data era adicionada. Alterações realizadas:

- Movi as declarações e capturas dos elementos DOM (`namesInput`, `startDateInput`, `enableGoal`, etc.) para o início de `script.js` para evitar referências indefinidas.
- Atualizei o listener do checkbox para usar a variável `enableGoal` já declarada.

Como testar:

1. Abra `index.html` no navegador.
2. Verifique se o contador inicia após informar a data de início.
3. Se houver problema, abra o Console do DevTools (F12) e me envie o erro exibido.