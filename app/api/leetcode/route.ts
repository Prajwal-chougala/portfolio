const LEETCODE_USERNAME = 'Prajwal_chougala';
const BASE_URL = 'https://alfa-leetcode-api.onrender.com';

// Revalidate every hour — ensures stats auto-update after you solve problems
export const revalidate = 3600;

interface SolvedData {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissionNum: Array<{
    difficulty: string;
    count: number;
    submissions: number;
  }>;
  acSubmissionNum: Array<{
    difficulty: string;
    count: number;
    submissions: number;
  }>;
}

interface CalendarData {
  activeYears: number[];
  streak: number;
  totalActiveDays: number;
  submissionCalendar: string;
}

interface ProfileData {
  username: string;
  name: string;
  avatar: string;
  ranking: number;
  reputation: number;
  gitHub: string | null;
}

interface ContestData {
  contestParticipation: Array<{
    contest: { title: string; startTime: number };
    rating: number;
    ranking: number;
    problemsSolved: number;
    totalProblems: number;
    finishTimeInSeconds: number;
  }>;
}

export interface LeetCodeResponse {
  solved: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  totalQuestions: {
    easy: number;
    medium: number;
    hard: number;
  };
  submissions: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  streak: number;
  totalActiveDays: number;
  ranking: number;
  contest: {
    rating: number;
    attended: number;
    globalRanking: number;
  } | null;
  submissionCalendar: Record<string, number>;
  error: false;
}

interface LeetCodeErrorResponse {
  error: true;
  message: string;
}

async function fetchWithTimeout(url: string, timeoutMs = 15000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch {
    clearTimeout(id);
    throw new Error(`Request to ${url} timed out after ${timeoutMs}ms`);
  }
}

export async function GET(): Promise<Response> {
  try {
    // Fetch all data in parallel for speed
    const [solvedRes, calendarRes, profileRes, contestRes] = await Promise.allSettled([
      fetchWithTimeout(`${BASE_URL}/${LEETCODE_USERNAME}/solved`),
      fetchWithTimeout(`${BASE_URL}/${LEETCODE_USERNAME}/calendar`),
      fetchWithTimeout(`${BASE_URL}/${LEETCODE_USERNAME}`),
      fetchWithTimeout(`${BASE_URL}/${LEETCODE_USERNAME}/contest`),
    ]);

    // Parse solved data
    let solvedData: SolvedData | null = null;
    if (solvedRes.status === 'fulfilled' && solvedRes.value.ok) {
      solvedData = await solvedRes.value.json();
    }

    // Parse calendar data
    let calendarData: CalendarData | null = null;
    if (calendarRes.status === 'fulfilled' && calendarRes.value.ok) {
      calendarData = await calendarRes.value.json();
    }

    // Parse profile data
    let profileData: ProfileData | null = null;
    if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
      profileData = await profileRes.value.json();
    }

    // Parse contest data
    let contestData: ContestData | null = null;
    if (contestRes.status === 'fulfilled' && contestRes.value.ok) {
      contestData = await contestRes.value.json();
    }

    // If we can't get even the basic solved data, return an error
    if (!solvedData) {
      const errorBody: LeetCodeErrorResponse = {
        error: true,
        message: 'Failed to fetch LeetCode data. The upstream API may be unavailable.',
      };
      return Response.json(errorBody, { status: 502 });
    }

    // Build the total questions count from submission data
    const totalSubmissions = solvedData.totalSubmissionNum || [];
    const easyTotal = totalSubmissions.find((s) => s.difficulty === 'Easy');
    const mediumTotal = totalSubmissions.find((s) => s.difficulty === 'Medium');
    const hardTotal = totalSubmissions.find((s) => s.difficulty === 'Hard');

    // Parse submission calendar
    let submissionCalendar: Record<string, number> = {};
    if (calendarData?.submissionCalendar) {
      try {
        submissionCalendar = JSON.parse(calendarData.submissionCalendar);
      } catch {
        // Ignore parse errors
      }
    }

    // Build contest info
    let contest: LeetCodeResponse['contest'] = null;
    if (contestData?.contestParticipation && contestData.contestParticipation.length > 0) {
      const latestContest =
        contestData.contestParticipation[contestData.contestParticipation.length - 1];
      contest = {
        rating: Math.round(latestContest.rating),
        attended: contestData.contestParticipation.length,
        globalRanking: latestContest.ranking,
      };
    }

    const responseBody: LeetCodeResponse = {
      solved: {
        total: solvedData.solvedProblem,
        easy: solvedData.easySolved,
        medium: solvedData.mediumSolved,
        hard: solvedData.hardSolved,
      },
      totalQuestions: {
        easy: easyTotal?.submissions ?? 850,
        medium: mediumTotal?.submissions ?? 1800,
        hard: hardTotal?.submissions ?? 800,
      },
      submissions: {
        total: totalSubmissions.find((s) => s.difficulty === 'All')?.submissions ?? 0,
        easy: easyTotal?.submissions ?? 0,
        medium: mediumTotal?.submissions ?? 0,
        hard: hardTotal?.submissions ?? 0,
      },
      streak: calendarData?.streak ?? 0,
      totalActiveDays: calendarData?.totalActiveDays ?? 0,
      ranking: profileData?.ranking ?? 0,
      contest,
      submissionCalendar,
      error: false,
    };

    return Response.json(responseBody);
  } catch (err) {
    console.error('LeetCode API error:', err);
    const errorBody: LeetCodeErrorResponse = {
      error: true,
      message: 'Internal server error while fetching LeetCode data.',
    };
    return Response.json(errorBody, { status: 500 });
  }
}
