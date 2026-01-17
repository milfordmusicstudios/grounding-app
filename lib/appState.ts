// lib/appState.ts
// AppState schema (local-only). Mirrors locked object model.
// No Supabase assumptions.

export type ID = string;

export type Difficulty = "easy" | "medium" | "hard";

export type DraftKind = "task" | "habit" | "log" | "idea" | "unknown";

export type DraftStatus = "needs_clarification" | "set_aside" | "confirmed" | "deleted";

export type TaskStatus = "active" | "completed" | "archived";

export type HabitStatus = "active" | "archived";

export type GoalTimeframe = "short" | "long" | "someday";

export type DraftItem = {
  id: ID;
  text: string; // raw brain dump text
  createdAt: string; // ISO
  kind: DraftKind; // suggestion/choice
  status: DraftStatus;
  suggested?: {
    category?: string;
    kind?: DraftKind;
    schedule?: string; // human-ish; UI can refine later
    difficulty?: Difficulty;
  };
  clarified?: {
    category?: string;
    kind?: DraftKind;
  };
};

export type TaskItem = {
  id: ID;
  title: string;
  notes?: string;
  category?: string;

  difficulty: Difficulty; // default easy
  scheduledFor?: string; // YYYY-MM-DD (optional)
  eventAt?: string; // ISO datetime (optional)

  status: TaskStatus;

  createdAt: string;
  completedAt?: string;

  // Linking (optional)
  projectId?: ID;
  goalIds?: ID[];
};

export type HabitItem = {
  id: ID;
  title: string;
  notes?: string;
  category?: string;

  // setup required
  frequency: {
    type: "daily" | "weekly";
    daysOfWeek?: number[]; // 0-6 if weekly
  };

  skipBehavior: "skip_and_move_on" | "carry_over"; // default skip_and_move_on

  status: HabitStatus;

  createdAt: string;

  // Linking (optional)
  goalIds?: ID[];
};

export type HabitCheckIn = {
  id: ID;
  habitId: ID;
  date: string; // YYYY-MM-DD
  createdAt: string; // ISO
};

export type LogEntry = {
  id: ID;
  type: string; // preset or user-defined
  date: string; // YYYY-MM-DD
  value?: string; // flexible (text now, can expand later)
  note?: string;

  createdAt: string;

  // Linking (optional)
  goalIds?: ID[];
};

export type GoalItem = {
  id: ID;
  title: string; // mantra/aspiration
  notes?: string;
  timeframe?: GoalTimeframe;

  createdAt: string;

  // optional reflection notes (only surfaced in reviews later)
  reflections?: { id: ID; createdAt: string; text: string }[];
};

export type ProjectItem = {
  id: ID;
  title: string;
  createdAt: string;
  status: "active" | "set_aside" | "completed" | "deleted";
  taskIds: ID[]; // enforce min 3 in UI logic later
};

export type MealPlan = {
  id: ID;
  date: string; // YYYY-MM-DD (single-day entry rule)
  items: { id: ID; name: string; createCookingTask?: boolean }[];
  createdAt: string;
};

export type GroceryItem = {
  id: ID;
  text: string;
  checked: boolean;
  createdAt: string;
  checkedAt?: string;
};

export type XPState = {
  // visual-only in UI; numbers can exist internally
  globalTotal: number;
  byCategory: Record<string, number>;
};

export type BadgeState = {
  // minimal placeholder for now
  unlocked: ID[]; // badge ids
  // category evolutions can be computed later
};

export type AppState = {
  drafts: DraftItem[];
  tasks: TaskItem[];
  habits: HabitItem[];
  habitCheckIns: HabitCheckIn[];

  logs: LogEntry[];
  goals: GoalItem[];
  projects: ProjectItem[];

  meals: MealPlan[];
  groceries: GroceryItem[];

  xp: XPState;
  badges: BadgeState;

  // user preferences (local only for now)
  settings: {
    showOverdue: boolean;
  };
};

export const DEFAULT_STATE: AppState = {
  drafts: [],
  tasks: [],
  habits: [],
  habitCheckIns: [],

  logs: [],
  goals: [],
  projects: [],

  meals: [],
  groceries: [],

  xp: { globalTotal: 0, byCategory: {} },
  badges: { unlocked: [] },

  settings: { showOverdue: false },
};
