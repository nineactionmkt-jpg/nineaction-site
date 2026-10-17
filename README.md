# Site Nine Action Marketing

Site estático (HTML, CSS e JavaScript puro), sem etapa de build e sem dependências.

## Estrutura
- `site/index.html`: estrutura das seis áreas (Início, Por que Nine Action?, Portfólio, Peça uma análise, Quem somos, Contato).
- `site/assets/js/content.js`: **todo o conteúdo editável**: serviços, categorias, portfólio, destaques, cases, contatos e opções do formulário.
- `site/assets/js/main.js`: interações (menu, serviços, carrossel, filtros, lightbox, formulário → WhatsApp, animações).
- `site/assets/css/styles.css`: tokens de cor e tipografia no topo (`:root`) e estilos.
- `site/assets/img` e `site/assets/video`: mídias otimizadas a partir do Drive.
- `artifact/index.html`: mesma página no formato do Artifact do Claude (gerada por `python3 build-artifact.py`).
- `tests/`: scripts Playwright usados para testar responsividade e interações.

## Rodar localmente
```
cd site
python3 -m http.server 8080
# abra http://localhost:8080
```

## Publicar (Vercel, Netlify ou GitHub Pages)
Publique a pasta `site/` como site estático. Na Vercel: "Add New Project" → importe o repositório → em
"Root Directory" escolha `site` → Framework "Other" → Deploy. Na Netlify, arraste a pasta `site` para app.netlify.com/drop.

## Mídias do Google Drive
Vídeos e fotos acima de 10 MB não puderam ser baixados pelo conector e ficaram referenciados pelo ID do Drive
em `content.js`. No site publicado (Vercel/Netlify), eles aparecem com prévia (imagem via
`lh3.googleusercontent.com` e vídeo via player do Drive), desde que os arquivos continuem compartilhados como
"Qualquer pessoa com o link". Onde o Drive não carrega, eles aparecem como lista de links "Mais trabalhos no Google Drive".

## Pendências de configuração
- `contato.whatsappNumero`: com o número no formato 55DDDNÚMERO, o WhatsApp abre com a mensagem já preenchida.
- `mostrarClientes`: mude para `true` quando todos os clientes autorizarem a exibição do nome.
- `destaques[].objetivo / solucao / resultado` e os dados de contexto dos cases: preencher só com informação real.
- `socias`: nomes das sócias, se quiser exibi-los.
- `contato.email`, `cidade`, `cnpj`: aparecem no rodapé quando preenchidos.
- `og:image`: para prévias em redes sociais, troque o caminho relativo por URL absoluta depois de publicar.
