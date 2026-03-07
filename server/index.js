import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Change these if you ever rename your handles
const CF_HANDLE = 'swayamsn123';
const CC_HANDLE = 'swayamn73';
const LC_HANDLE = 'swayamn';
const AT_HANDLE = 'swayamn72';

app.use(cors());

// ── Codeforces ─────────────────────────────────────────────────────
// Uses the official public Codeforces API.
app.get('/api/codeforces', async (_req, res) => {
    try {
        const r = await fetch(
            `https://codeforces.com/api/user.rating?handle=${CF_HANDLE}`
        );
        const json = await r.json();
        if (json.status !== 'OK') throw new Error(json.comment || 'CF API error');
        res.json({ ok: true, data: json.result });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

// ── CodeChef ───────────────────────────────────────────────────────
// CodeChef has no official public API. We scrape the user profile page
// which embeds the full rating history as a JS variable: var all_rating = [...].
app.get('/api/codechef', async (_req, res) => {
    try {
        const r = await fetch(`https://www.codechef.com/users/${CC_HANDLE}`, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
                Accept:
                    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            },
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const html = await r.text();

        const match = html.match(/var all_rating\s*=\s*(\[[\s\S]*?\]);/);
        if (!match) throw new Error('Rating data not found in CodeChef page');

        const raw = JSON.parse(match[1]);
        const data = raw.map((c) => ({
            contestName: c.name || c.code,
            code: c.code,
            rating: parseInt(c.rating, 10),
            date: `${c.getyear}-${String(c.getmonth).padStart(2, '0')}-${String(c.getday).padStart(2, '0')}`,
        }));

        res.json({ ok: true, data });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

// ── LeetCode ───────────────────────────────────────────────────────
// LeetCode's GraphQL API is CORS-blocked from browsers but works fine
// from a Node server.
app.get('/api/leetcode', async (_req, res) => {
    try {
        const r = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Referer: 'https://leetcode.com',
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
            body: JSON.stringify({
                query: `query userContestRankingInfo($username: String!) {
          userContestRankingHistory(username: $username) {
            attended
            rating
            ranking
            contest { title startTime }
          }
        }`,
                variables: { username: LC_HANDLE },
            }),
        });
        const json = await r.json();
        const history = (json.data?.userContestRankingHistory || []).filter(
            (c) => c.attended
        );
        res.json({ ok: true, data: history });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

// ── AtCoder ────────────────────────────────────────────────────────
// AtCoder exposes a public JSON endpoint for rating history.
app.get('/api/atcoder', async (_req, res) => {
    try {
        const r = await fetch(
            `https://atcoder.jp/users/${AT_HANDLE}/history/json`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                },
            }
        );
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        res.json({ ok: true, data });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`\n✓  Portfolio API  →  http://localhost:${PORT}`);
    console.log(
        '   /api/codeforces  /api/codechef  /api/leetcode  /api/atcoder\n'
    );
});
