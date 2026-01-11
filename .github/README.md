# GitHub Repository pro Retro Kredenc

Tento repository obsahuje kód pro e-shop Retro Kredenc - prodej československého retro porcelánu z let 1950-1989.

## 🚀 Deployment

Web je automaticky nasazován na GitHub Pages pomocí GitHub Actions workflow při každém push na `main` branch.

### Konfigurace

- **Custom domain:** retrokredenc.cz
- **Build:** Next.js static export
- **Workflow:** `.github/workflows/deploy.yml`

### První deployment

1. Nastavte GitHub Pages v Settings → Pages
2. Přidejte custom domain: `retrokredenc.cz`
3. Zaškrtněte "Enforce HTTPS"

Více informací: Viz `NASTAVENI_HOSTINGU.md` v root adresáři projektu.
