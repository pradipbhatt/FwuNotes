import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import Navbar from '../Navbar';
import Footer from '../home/Footer';
import Chat from '../AI/Chat';
import logo from '../../../public/fwu.png';
import FacebookComments from '../FacebookComments';

const FIELD_COLORS = {
  Computer:     'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300',
  Civil:        'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  Architecture: 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
};

function pct(solved, total) {
  if (!total) return 0;
  return Math.round((solved / total) * 100);
}

function RankBadge({ rank }) {
  if (rank === 1) return (
    <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center justify-center ring-2 ring-amber-300 dark:ring-amber-600">
      1
    </span>
  );
  if (rank === 2) return (
    <span className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-xs font-bold flex items-center justify-center ring-2 ring-gray-300 dark:ring-gray-500">
      2
    </span>
  );
  if (rank === 3) return (
    <span className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 text-xs font-bold flex items-center justify-center ring-2 ring-orange-300 dark:ring-orange-600">
      3
    </span>
  );
  return (
    <span className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold flex items-center justify-center">
      {rank}
    </span>
  );
}

function ScoreBar({ value }) {
  const color =
    value >= 80 ? 'bg-emerald-500' :
    value >= 60 ? 'bg-amber-500' :
    value >= 40 ? 'bg-orange-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden min-w-[60px]">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 tabular-nums w-9 text-right shrink-0">
        {value}%
      </span>
    </div>
  );
}

/* Top-3 podium card */
function PodiumCard({ performer, rank }) {
  const p = pct(performer.solvedQuestions, performer.totalQuestions);
  const ringColor = rank === 1 ? 'ring-amber-400' : rank === 2 ? 'ring-gray-400' : 'ring-orange-400';
  const labelColor = rank === 1 ? 'text-amber-600 dark:text-amber-400' : rank === 2 ? 'text-gray-500 dark:text-gray-400' : 'text-orange-600 dark:text-orange-400';

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm ${rank === 1 ? 'ring-2 ring-amber-300 dark:ring-amber-600' : ''}`}>
      <div className={`w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 ring-4 ${ringColor} flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-200 mb-1`}>
        {performer.userName?.charAt(0)?.toUpperCase() || '?'}
      </div>
      <RankBadge rank={rank} />
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 text-center leading-tight">{performer.userName}</p>
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${FIELD_COLORS[performer.engineeringField] ?? FIELD_COLORS.Computer}`}>
        {performer.engineeringField}
      </span>
      <p className={`text-2xl font-bold ${labelColor}`}>{p}%</p>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        {performer.solvedQuestions}/{performer.totalQuestions} correct
      </p>
    </div>
  );
}

export default function QuizResult() {
  const [topPerformers, setTopPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageUrl = 'https://www.soenotes.com/';

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/quiz-results/`)
      .then(r => r.json())
      .then(data => {
        const sorted = data
          .map(r => ({ ...r, _pct: pct(r.solvedQuestions, r.totalQuestions) }))
          .sort((a, b) => b._pct - a._pct)
          .slice(0, 30);
        setTopPerformers(sorted);
      })
      .catch(() => setError('Could not load results. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const top3 = topPerformers.slice(0, 3);
  const rest  = topPerformers.slice(3);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-14 pb-24">

        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-4 py-10 text-center">
            <img src={logo} alt="FWU Logo" className="w-14 h-auto mx-auto mb-4 drop-shadow" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Entrance Exam Leaderboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Far Western University · School of Engineering</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Top 30 performers ranked by score percentage</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">

          {loading && (
            <div className="flex flex-col items-center gap-4 py-20">
              <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-sm text-gray-400 dark:text-gray-500">Loading results…</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-red-500 dark:text-red-400 text-sm">{error}</div>
          )}

          {!loading && !error && topPerformers.length === 0 && (
            <div className="text-center py-20 text-gray-400 dark:text-gray-500 text-sm">No results yet. Be the first to take a mock exam!</div>
          )}

          {!loading && !error && topPerformers.length > 0 && (
            <>
              {/* Podium — top 3 */}
              {top3.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Top Performers</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {top3.map((p, i) => <PodiumCard key={p._id} performer={p} rank={i + 1} />)}
                  </div>
                </div>
              )}

              {/* Rest of the list */}
              {rest.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Full Rankings</p>
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">

                    {/* Table header */}
                    <div className="hidden sm:grid grid-cols-[40px_1fr_110px_90px_140px] gap-4 px-5 py-3 border-b border-gray-100 dark:border-gray-700 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      <span>#</span>
                      <span>Name</span>
                      <span>Field</span>
                      <span>Score</span>
                      <span>Percentage</span>
                    </div>

                    {rest.map((performer, i) => {
                      const rank = i + 4;
                      const p = performer._pct;
                      return (
                        <div
                          key={performer._id}
                          className="grid grid-cols-[40px_1fr] sm:grid-cols-[40px_1fr_110px_90px_140px] gap-4 items-center px-5 py-4 border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          {/* Rank */}
                          <div className="flex items-center justify-center">
                            <RankBadge rank={rank} />
                          </div>

                          {/* Name + mobile meta */}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{performer.userName}</p>
                            <div className="sm:hidden flex items-center gap-2 mt-1 flex-wrap">
                              <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${FIELD_COLORS[performer.engineeringField] ?? FIELD_COLORS.Computer}`}>
                                {performer.engineeringField}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {performer.solvedQuestions}/{performer.totalQuestions} · {p}%
                              </span>
                            </div>
                          </div>

                          {/* Field — desktop */}
                          <div className="hidden sm:block">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${FIELD_COLORS[performer.engineeringField] ?? FIELD_COLORS.Computer}`}>
                              {performer.engineeringField}
                            </span>
                          </div>

                          {/* Score — desktop */}
                          <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300 tabular-nums">
                            {performer.solvedQuestions}/{performer.totalQuestions}
                          </div>

                          {/* Bar — desktop */}
                          <div className="hidden sm:block">
                            <ScoreBar value={p} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notice */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Only the top 30 scores are shown</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Take a mock exam and aim for the top. Give it your best shot!</p>
              </div>
            </>
          )}
        </div>
      </div>

      <FacebookComments pageUrl={pageUrl} />
      <Chat />
      <Footer />
    </>
  );
}
