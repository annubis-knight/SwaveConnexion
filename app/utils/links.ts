/**
 * Liens externes centralisés (plateforme de réservation Pomgrenad).
 *
 * SSOT pour toutes les URLs de sortie du site vers l'app de réservation.
 * Toujours ouverts dans un nouvel onglet avec rel="noopener noreferrer"
 * (voir ButtonSwave / CardFeature, prop `external`).
 *
 * Auto-importé par Nuxt (dossier ~/utils) : utilisable sans import.
 */
/*
  Adresse de contact publique. SSOT : reprise par le Footer, la section
  contact et les donnees structurees (useSeo). Ne pas la dupliquer en dur.
*/
export const CONTACT_EMAIL = 'infos@swaveconnection.com';

export const BOOKING_LINKS = {
  /* Programme Bachata (cours collectifs, débutant, CTA "réserver un cours") */
  bachata: 'https://app.pomgrenad.com/programmes/bachata',
  /* Programme Lady Styling */
  ladystyle: 'https://app.pomgrenad.com/programmes/ladystyle',
} as const;
