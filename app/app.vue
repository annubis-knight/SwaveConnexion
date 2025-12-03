<template>
  <div>
    <NuxtRouteAnnouncer />
    <div style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
      <h1>SwaveConnexion Design System - Phase 1 Test</h1>
      <p>Test de validation des polices custom et variables CSS</p>

      <section style="margin-top: 3rem;">
        <h2>Typographie - Clash Display (Titres)</h2>
        <h1>H1 - Titre principal (84px)</h1>
        <h2>H2 - Titre secondaire (64px)</h2>
        <h3>H3 - Titre tertiaire (48px)</h3>
        <h4>H4 - Titre quaternaire (36px)</h4>
        <h5>H5 - Titre quinaire (28px)</h5>
        <h6>H6 - Titre sixième niveau (20px)</h6>
      </section>

      <section style="margin-top: 3rem;">
        <h2>Corps de texte - Space Grotesk</h2>
        <p style="font-size: var(--text-base);">
          Paragraphe standard (16px) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Cette police <strong>Space Grotesk</strong> est géométrique et moderne, parfaite pour le corps de texte.
        </p>
        <p style="font-size: var(--text-lg);">
          Texte large (18px) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p style="font-size: var(--text-sm);">
          Texte petit (14px) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </section>

      <section style="margin-top: 3rem;">
        <h2>Code - JetBrains Mono</h2>
        <pre><code>function test() {
  const message = "Hello World";
  return message !== null;
}</code></pre>
        <p>Code inline: <code>const foo = 'bar';</code></p>
      </section>

      <section style="margin-top: 3rem;">
        <h2>Variables CSS - Couleurs</h2>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <div style="width: 100px; height: 100px; background-color: var(--primary); border-radius: 8px;"></div>
          <div style="width: 100px; height: 100px; background-color: var(--secondary); border-radius: 8px;"></div>
          <div style="width: 100px; height: 100px; background-color: var(--accent); border-radius: 8px;"></div>
          <div style="width: 100px; height: 100px; background-color: var(--success); border-radius: 8px;"></div>
          <div style="width: 100px; height: 100px; background-color: var(--warning); border-radius: 8px;"></div>
          <div style="width: 100px; height: 100px; background-color: var(--error); border-radius: 8px;"></div>
        </div>
      </section>

      <section style="margin-top: 3rem;">
        <h2>✅ Phase 1 Complétée</h2>
        <ul>
          <li>✅ Polices custom téléchargées (Space Grotesk, Clash Display, JetBrains Mono)</li>
          <li>✅ Structure de dossiers créée</li>
          <li>✅ _variables.css avec design tokens</li>
          <li>✅ _typography.css avec @font-face et type scale</li>
          <li>✅ _reset.css pour uniformisation</li>
          <li>✅ main.css configuré avec imports</li>
        </ul>
      </section>
    </div>
  </div>
</template>
