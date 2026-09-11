import type { Context, Config } from "@netlify/functions";

const STONES = [
  { id: 1, name: 'Quartz rose', desc: 'Ta pierre d\'origine, c\'est le Quartz rose. Elle porte l\'énergie de la douceur inconditionnelle, celle qui enveloppe et rassure avant même d\'agir. Si cette pierre est ta base, ton essence profonde cherche à créer un espace sécurisant, pour toi comme pour les autres. C\'est une des fondations les plus douces à porter, mais elle soulève une question intéressante : cette douceur, est-ce que tu la donnes davantage que tu ne te permets de la recevoir?' },
  { id: 2, name: 'Jaspe rouge', desc: 'Ta pierre d\'origine, c\'est le Jaspe rouge. Elle porte l\'énergie de l\'ancrage profond, celle qui relie directement à la terre et à la matière. Si cette pierre est ta base, ton essence profonde est construite autour de la stabilité, du besoin de sentir le sol sous tes pieds avant d\'avancer. Une fondation aussi terrienne pose une question importante : est-ce que tu te sens vraiment enraciné·e là où tu es, ou est-ce encore à construire?' },
  { id: 3, name: 'Calcite bleue', desc: 'Ta pierre d\'origine, c\'est la Calcite bleue. Elle porte l\'énergie de la paix intérieure, celle qui invite à ralentir et à vraiment écouter, soi-même comme les autres. Si cette pierre est ta base, ton essence profonde a besoin de calme pour se déployer pleinement. Une fondation de repos comme celle-là amène à se demander : est-ce que tu t\'accordes assez d\'espace pour simplement être, sans rien devoir accomplir?' },
  { id: 4, name: 'Jaspe impérial', desc: 'Ta pierre d\'origine, c\'est le Jaspe impérial. Elle porte l\'énergie du leadership naturel, celle qui pousse à prendre sa place et à définir son territoire. Si cette pierre est ta base, ton essence profonde est orientée vers l\'expansion, vers le désir de grandir au-delà de ce qui est déjà connu. Une fondation aussi affirmée soulève une question : comment tu vis le pouvoir, le tien et celui des autres?' },
  { id: 5, name: 'Émeraude', desc: 'Ta pierre d\'origine, c\'est l\'Émeraude. Elle porte l\'énergie du pouvoir personnel enraciné dans la nature, celle qui puise sa force dans ce qui est vivant autour de soi. Si cette pierre est ta base, ton essence profonde est sensible aux énergies, aux lieux, aux cycles naturels. Une fondation comme celle-là invite à te demander : où puises-tu vraiment ta force quand tout semble vaciller?' },
  { id: 6, name: 'Grenat', desc: 'Ta pierre d\'origine, c\'est le Grenat. Elle porte l\'énergie de la passion vivante, celle qui anime la créativité et la vitalité du corps. Si cette pierre est ta base, ton essence profonde a besoin d\'intensité pour se sentir pleinement vivante. Une fondation aussi ardente pose une question : est-ce que tu te permets vraiment de vivre cette intensité, ou tu la retiens?' },
  { id: 7, name: 'Citrine', desc: 'Ta pierre d\'origine, c\'est la Citrine. Elle porte l\'énergie du rayonnement personnel, celle qui attire la réussite en restant connectée à la joie. Si cette pierre est ta base, ton essence profonde cherche à briller, à sa manière et selon ses propres critères. Une fondation aussi lumineuse amène une question : ta définition de la réussite, est-ce vraiment la tienne, ou celle qu\'on t\'a montrée?' },
  { id: 8, name: 'Obsidienne', desc: 'Ta pierre d\'origine, c\'est l\'Obsidienne. Elle porte l\'énergie de la vérité brute, celle qui cherche l\'équilibre juste plutôt que le confort facile. Si cette pierre est ta base, ton essence profonde a un sens aigu du respect, de soi et des autres. Une fondation aussi tranchante invite à se demander : est-ce que tu es aussi juste envers toi-même que tu l\'es envers les autres?' },
  { id: 9, name: 'Aigue marine', desc: 'Ta pierre d\'origine, c\'est l\'Aigue marine. Elle porte l\'énergie de la communication claire, celle qui cherche à transmettre et à enseigner avec justesse. Si cette pierre est ta base, ton essence profonde a besoin de paix pour trouver les bons mots. Une fondation comme celle-là soulève une question : est-ce que tu dis vraiment ce que tu penses, ou tu adoucis pour éviter les vagues?' },
  { id: 10, name: 'Rhodonite', desc: 'Ta pierre d\'origine, c\'est la Rhodonite. Elle porte l\'énergie de la guérison affective, celle qui répare doucement ce qui a été blessé dans le cœur. Si cette pierre est ta base, ton essence profonde a un grand besoin de reconnaissance et d\'affection sincère. Une fondation aussi sensible amène une question : est-ce que tu attends cette reconnaissance de l\'extérieur, ou tu commences à te la donner toi-même?' },
  { id: 11, name: 'Cornaline', desc: 'Ta pierre d\'origine, c\'est la Cornaline. Elle porte l\'énergie de la confiance ancrée dans le corps, celle qui pousse à écouter ses propres signaux avant ceux des autres. Si cette pierre est ta base, ton essence profonde se construit dans l\'action et le mouvement plutôt que dans la réflexion seule. Une fondation aussi vivante invite à se demander : est-ce que tu fais vraiment confiance à ce que ton corps te dit?' },
  { id: 12, name: 'Bois fossilisé', desc: 'Ta pierre d\'origine, c\'est le Bois fossilisé. Elle porte l\'énergie de la sagesse patiente, celle qui transforme le temps et l\'épreuve en profondeur plutôt qu\'en dureté. Si cette pierre est ta base, ton essence profonde apprend à lâcher prise sur ce qui ne peut pas être contrôlé. Une fondation aussi ancienne pose une question : qu\'est-ce que tu tiens encore fermement alors que ça demande à être relâché?' },
  { id: 13, name: 'Hématite', desc: 'Ta pierre d\'origine, c\'est l\'Hématite. Elle porte l\'énergie de la reconstruction, celle qui permet de repartir à zéro avec méthode et détermination. Si cette pierre est ta base, ton essence profonde a besoin de concrétiser, de bâtir quelque chose de solide et de tangible. Une fondation aussi structurée amène une question : est-ce que tu te donnes le droit de recommencer, ou tu restes accroché·e à ce qui devait fonctionner?' },
  { id: 14, name: 'Améthyste', desc: 'Ta pierre d\'origine, c\'est l\'Améthyste. Elle porte l\'énergie du passage, celle qui accompagne les transitions et invite à la tempérance plutôt qu\'à l\'excès. Si cette pierre est ta base, ton essence profonde est naturellement tournée vers le spirituel et l\'invisible. Une fondation aussi subtile soulève une question : dans quelle transition es-tu actuellement, même si tu n\'as pas encore de mots pour la nommer?' },
  { id: 15, name: 'Malachite', desc: 'Ta pierre d\'origine, c\'est la Malachite. Elle porte l\'énergie du miroir relationnel, celle qui révèle à travers les autres ce qui reste à guérir en soi. Si cette pierre est ta base, ton essence profonde se construit et se comprend surtout dans le contact avec l\'autre. Une fondation aussi relationnelle amène une question : qu\'est-ce que tes relations les plus intenses te renvoient de toi-même, encore et encore?' },
  { id: 16, name: 'Opale verte fossilisée', desc: 'Ta pierre d\'origine, c\'est l\'Opale verte fossilisée. Elle porte l\'énergie de la reconnaissance de sa propre valeur, celle qui permet de recevoir sans culpabilité. Si cette pierre est ta base, ton essence profonde est liée à ta capacité à te sentir digne de ce qui est bon dans ta vie. Une fondation d\'abondance comme celle-là peut se vivre de deux façons bien différentes selon le reste de ta carte : soit elle rayonne naturellement, soit elle se cherche encore.' },
  { id: 17, name: 'Aragonite', desc: 'Ta pierre d\'origine, c\'est l\'Aragonite. Elle porte l\'énergie de la connexion structurée, celle qui relie les idées entre elles avec précision et logique. Si cette pierre est ta base, ton essence profonde a besoin d\'analyser, de comprendre avant de ressentir pleinement. Une fondation aussi mentale invite à se demander : est-ce que tu te laisses le droit de ressentir avant de tout comprendre?' },
  { id: 18, name: 'Pierre de lune noire', desc: 'Ta pierre d\'origine, c\'est la Pierre de lune noire. Elle porte l\'énergie de l\'intuition profonde, celle qui capte les signes et les synchronicités avant que la raison ne les explique. Si cette pierre est ta base, ton essence profonde vit une grande vie intérieure, souvent plus riche que ce qu\'elle laisse paraître. Une fondation aussi introspective pose une question : est-ce que tu fais confiance à ce que tu ressens, même quand ça ne s\'explique pas?' },
  { id: 19, name: 'Topaze', desc: 'Ta pierre d\'origine, c\'est la Topaze. Elle porte l\'énergie de l\'éveil, celle qui cherche du sens dans chaque expérience vécue. Si cette pierre est ta base, ton essence profonde est tournée vers l\'humain, vers la compréhension large de ce que ça signifie d\'être vivant. Une fondation aussi consciente amène une question : quel sens donnes-tu vraiment à ce que tu traverses en ce moment?' },
  { id: 20, name: 'Lapis lazuli', desc: 'Ta pierre d\'origine, c\'est le Lapis-lazuli. Elle porte l\'énergie de la clairvoyance, celle qui perçoit au-delà du visible et se sent reliée à quelque chose de plus vaste. Si cette pierre est ta base, ton essence profonde cherche naturellement à comprendre les grandes questions de l\'existence. Une fondation aussi vaste invite à se demander : est-ce que tu écoutes cette part de toi qui perçoit plus qu\'elle ne peut expliquer?' },
  { id: 21, name: 'Tourmaline noire', desc: 'Ta pierre d\'origine, c\'est la Tourmaline noire. Elle porte l\'énergie d\'une protection qui permet justement de s\'ouvrir au monde sans danger. Si cette pierre est ta base, ton essence profonde conjugue la solidité d\'un ancrage et le besoin de bouger, d\'explorer, de te sentir chez toi partout. Une fondation de protection comme celle-là amène une question clé : qu\'est-ce que tu protèges exactement, et depuis quand?' },
  { id: 22, name: 'Quartz clair', desc: 'Ta pierre d\'origine, c\'est le Quartz clair. Elle porte l\'énergie de la clarté, celle qui élève et purifie tout ce qui l\'entoure. Si cette pierre est ta base, ton essence profonde cherche la lumière, la tolérance, une forme d\'élévation constante. Une fondation aussi pure amène une question : est-ce que tu te donnes la même tolérance que celle que tu offres si facilement aux autres?' },
  { id: 23, name: 'Azurite', desc: 'Ta pierre d\'origine, c\'est l\'Azurite. Elle porte l\'énergie du rêve éveillé, celle qui inspire et pousse à viser au-delà de ce qui semble réaliste. Si cette pierre est ta base, ton essence profonde a besoin d\'un espace pour imaginer, créer, viser haut. Une fondation aussi inspirée soulève une question : qu\'est-ce que tu as arrêté de rêver parce que ça semblait trop grand?' },
  { id: 24, name: 'Amazonite', desc: 'Ta pierre d\'origine, c\'est l\'Amazonite. Elle porte l\'énergie de la réconciliation du cœur, celle qui adoucit les blessures et ramène vers la tendresse. Si cette pierre est ta base, ton essence profonde cherche l\'harmonie, autant en elle-même qu\'avec les autres. Une fondation aussi tendre amène une question : avec qui, ou avec quelle partie de toi, aurais-tu besoin de te réconcilier?' },
  { id: 25, name: 'Septaria', desc: 'Ta pierre d\'origine, c\'est la Septaria. Elle porte l\'énergie de la mémoire transgénérationnelle, celle qui relie à l\'histoire familiale et à ce qui s\'est transmis sans être dit. Si cette pierre est ta base, ton essence profonde est sensible à ce qui vient d\'avant elle, parfois sans même le savoir. Une fondation aussi ancienne invite à se demander : qu\'est-ce que tu portes qui, en fait, ne t\'appartient pas vraiment?' },
  { id: 26, name: 'Pyrite', desc: 'Ta pierre d\'origine, c\'est la Pyrite. Elle porte l\'énergie de l\'exploration, celle qui pousse à essayer, à tester son potentiel sans avoir toutes les réponses d\'avance. Si cette pierre est ta base, ton essence profonde reste optimiste face à l\'inconnu. Une fondation aussi audacieuse amène une question : qu\'est-ce que tu n\'as pas encore osé explorer par peur de te tromper?' },
  { id: 27, name: 'Fluorine verte', desc: 'Ta pierre d\'origine, c\'est la Fluorine verte. Elle porte l\'énergie de la perception fine, celle qui capte ce qui échappe aux sens habituels. Si cette pierre est ta base, ton essence profonde vit dans un flux constant d\'informations subtiles, parfois difficile à trier. Une fondation aussi perceptive pose une question : est-ce que tu sais faire la différence entre ce que tu perçois et ce que tu crains?' },
  { id: 28, name: 'Apatite', desc: 'Ta pierre d\'origine, c\'est l\'Apatite. Elle porte l\'énergie de l\'émotion vive, celle qui ressent tout intensément et cherche la fluidité plutôt que la retenue. Si cette pierre est ta base, ton essence profonde est hypersensible, souvent plus qu\'elle ne le laisse voir. Une fondation aussi émotive invite à se demander : où mets-tu tes émotions quand tu n\'as pas d\'espace sécurisant pour les vivre?' },
  { id: 29, name: 'Sodalite', desc: 'Ta pierre d\'origine, c\'est la Sodalite. Elle porte l\'énergie des valeurs familiales, celle qui cherche l\'appartenance et le partage sincère. Si cette pierre est ta base, ton essence profonde se construit en lien avec ce qui a été transmis dans ta famille, en accord ou en opposition. Une fondation aussi identitaire amène une question : est-ce que tes valeurs actuelles sont vraiment les tiennes, ou celles qu\'on t\'a données?' },
  { id: 30, name: 'Quartz fumé', desc: 'Ta pierre d\'origine, c\'est le Quartz fumé. Elle porte l\'énergie de la stratégie posée, celle qui agit avec profondeur plutôt qu\'impulsivité. Si cette pierre est ta base, ton essence profonde dégage un magnétisme discret, qui se remarque sans avoir besoin de s\'imposer. Une fondation aussi stratégique soulève une question : est-ce que tu prends vraiment le temps de réfléchir, ou tu agis parfois juste pour éviter d\'attendre?' },
  { id: 31, name: 'Soufre', desc: 'Ta pierre d\'origine, c\'est le Soufre. Elle porte l\'énergie de la transformation alchimique, celle qui passe par le mystère avant d\'arriver à la clarté. Si cette pierre est ta base, ton essence profonde n\'a pas peur de traverser l\'inconfort pour se transformer réellement. Une fondation aussi intense amène une question : qu\'est-ce qui, dans ta vie, demande vraiment à être transformé plutôt que juste amélioré?' },
  { id: 32, name: 'Labradorite', desc: 'Ta pierre d\'origine, c\'est la Labradorite. Elle porte l\'énergie de la pensée profonde, celle qui conçoit et réfléchit avant de se révéler. Si cette pierre est ta base, ton essence profonde garde souvent une part de mystère, même pour les gens proches. Une fondation aussi réfléchie invite à se demander : qu\'est-ce que tu gardes pour toi que tu gagnerais à partager?' },
  { id: 33, name: 'Apophyllite', desc: 'Ta pierre d\'origine, c\'est l\'Apophyllite. Elle porte l\'énergie de la conscience élevée, celle qui cherche la pureté d\'intention avant l\'accomplissement. Si cette pierre est ta base, ton essence profonde a besoin d\'aligner ses actions avec quelque chose de plus grand qu\'elle-même. Une fondation aussi consciente amène une question : est-ce que ce que tu accomplis aujourd\'hui a vraiment du sens pour toi, ou c\'est accompli pour être vu?' },
];

const BREVO_LIST_ID = 3;
const NOTIFY_EMAIL = "gemmesendouceur@gmail.com";
const SENDER = { email: "gemmesendouceur@gmail.com", name: "Gemmes en douceur" };

function stripAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function letterValue(letter: string): number {
  const c = stripAccents(letter).toUpperCase();
  const code = c.charCodeAt(0) - 65;
  if (code < 0 || code > 25) return 0;
  return (code % 9) + 1;
}

function firstLetterValue(word: string): number {
  const cleaned = stripAccents(word).replace(/[^a-zA-Z]/g, "");
  if (!cleaned) return 0;
  return letterValue(cleaned[0]);
}

function reduceToStoneRange(n: number): number {
  let total = n;
  while (total > 33) {
    total = String(total).split("").reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return total;
}

function calculatePierreOrigine(prenoms: string, nomNaissance: string): number {
  const prenomTokens = prenoms.trim().split(/\s+/).filter(Boolean);
  let total = 0;
  for (const p of prenomTokens) {
    total += firstLetterValue(p);
  }
  total += firstLetterValue(nomNaissance);
  return reduceToStoneRange(total);
}

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const body = await req.json();
    const { prenoms, nomNaissance, dateNaissance, courriel } = body;

    if (!prenoms || !nomNaissance || !dateNaissance || !courriel) {
      return new Response(JSON.stringify({ error: "Champs manquants" }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(courriel)) {
      return new Response(JSON.stringify({ error: "Courriel invalide" }), { status: 400 });
    }

    const stoneId = calculatePierreOrigine(prenoms, nomNaissance);
    const stone = STONES.find((s) => s.id === stoneId) || STONES[0];

    const apiKey = Netlify.env.get("BREVO_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Configuration serveur manquante" }), { status: 500 });
    }

    const firstPrenom = prenoms.trim().split(/\s+/)[0];

    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": apiKey },
      body: JSON.stringify({
        email: courriel,
        attributes: {
          PRENOM: firstPrenom,
          NOM: nomNaissance,
          PIERRE: stone.name,
          PIERRE_DESC: stone.desc,
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    if (!contactRes.ok) {
      const errText = await contactRes.text();
      console.error("Erreur Brevo contact:", errText);
      return new Response(JSON.stringify({ error: "Erreur lors de l'enregistrement" }), { status: 502 });
    }

    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": apiKey },
      body: JSON.stringify({
        sender: SENDER,
        to: [{ email: NOTIFY_EMAIL }],
        subject: `Nouveau lead ADN Minéral : ${firstPrenom} ${nomNaissance}`,
        htmlContent: `
          <p><strong>Nom complet :</strong> ${prenoms} ${nomNaissance}</p>
          <p><strong>Date de naissance :</strong> ${dateNaissance}</p>
          <p><strong>Courriel :</strong> ${courriel}</p>
          <p><strong>Pierre calculée :</strong> ${stone.name}</p>
        `,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Erreur:", err);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
};

export const config: Config = {
  path: "/api/submit-pierre",
};
