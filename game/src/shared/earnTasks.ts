import { Img } from "@/utilitiy/images";

type RewardType = "CNTP" | "KEY" | "TICKET";

export interface Quiz {
  title: string;
  caption: string;
  questions: QuizQuestion[];
  reward: number;
}

export interface QuizQuestion {
  quest: string;
  options: string[];
  answerIndex: number;
  timer: number;
}

export interface TaskCategory {
  title: string;
  icon?: string;
  tasks: Task[];
  reward?: number;
  completed?: boolean;
}

export interface Day {
  day: number;
  reward: number;
  type: RewardType;
}

export interface Task {
  title: string;
  completed?: boolean;
  logo?: {
    uri?: string;
    color?: string;
  };
  resource?: string;
  caption?: string;
  referral?: boolean;
  cta?: string;
  quiz?: boolean;
  claim?: boolean;
  active: boolean;
  reward?: number;
}

export const dailyQuiz: Quiz = {
  reward: 1,
  title: "What is a Wallet?",
  caption:
    "A digital wallet is a software application that allows you to store, send, and receive cryptocurrencies. It interacts with blockchain networks and manages your private and public keys, which are crucial for conducting transactions.",
  questions: [
    {
      quest: "What is the primary function of a cryptocurrency wallet?",
      options: [
        "To store physical coins",
        "To securely store and manage your cryptocurrencies and keys",
        "To make online purchases only",
      ],
      answerIndex: 1,
      timer: 15,
    },
  ],
};

export const dailyClaims: Day[] = [
  {
    day: 1,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 2,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 3,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 4,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 5,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 6,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 7,
    reward: 1,
    type: "KEY",
  },
];

export const taskCategories: TaskCategory[] = [
  {
    title: "Send Invitation",
    icon: Img.TaskInvitation,
    reward: 1,
    completed: false,
    tasks: [
      {
        title: "Invite Friends",
        completed: false,
        caption:
          "Share your referral link and earn Tickets when your friends join us! It might take a time to process it.",
        referral: true,
        active: true,
      },
    ],
  },
  {
    title: "Daily Rewards",
    icon: Img.TaskDaily,
    tasks: [
      {
        title: "Daily Claim",
        claim: true,
        logo: {
          uri: Img.DailyClaim,
        },
        caption:
          "Claim daily rewards and earn Tickets by logging in each day without skipping!",
        cta: "Claim today’s reward",
        active: false,
      },
    ],
  },
  {
    title: "Join Us",
    icon: Img.TaskJoin,
    reward: 1,
    completed: false,
    tasks: [
      {
        title: "Follow Us on X",
        completed: true,
        logo: {
          uri: Img.TwitterX,
          color: "#000000",
        },
        caption: "Follow Us on X and earn Tickets just for staying connected!",
        cta: "Open X",
        resource: "x.com/conet_network?lang=en",
        active: true,
      },
      {
        title: "Join our Community",
        completed: false,
        logo: {
          uri: Img.Telegram,
          color: "#66ACDD",
        },
        caption:
          "Join our Community on Telegram and earn Tickets just for staying connected!",
        cta: "Open Telegram",
        resource: "https://t.me/conet_network",
        active: true,
      },
      {
        title: "Join our Server",
        completed: false,
        logo: {
          uri: Img.Discord,
          color: "#5865F2",
        },
        caption:
          "Join our Server on Discord and earn Tickets just for staying connected!",
        cta: "Open Discord",
        resource: "https://discord.gg/JrpMBFkewd",
        active: true,
      },
    ],
  },
  {
    title: "Daily Tasks",
    icon: Img.TaskDaily,
    reward: 1,
    completed: false,
    tasks: [
      {
        title: "Quiz",
        completed: false,
        logo: {
          uri: Img.TaskQuiz,
        },
        quiz: true,
        active: false,
      },
      {
        title: "Interact with Us on X",
        completed: false,
        logo: {
          uri: Img.TwitterX,
          color: "#000000",
        },
        active: false,
      },
    ],
  },
  {
    title: "Extras",
    icon: Img.TaskExtras,
    reward: 1,
    completed: false,
    tasks: [
      {
        title: "Follow Collaborator",
        completed: true,
        logo: {
          color: "#CC00D0",
        },
        active: false,
      },
      {
        title: "Join Collab Community",
        completed: false,
        logo: {
          color: "#CC00D0",
        },
        active: false,
      },
      {
        title: "Try Collab Mini App",
        completed: false,
        logo: {
          color: "#CC00D0",
        },
        active: false,
      },
    ],
  },
  {
    title: "Finished Tasks",
    icon: Img.TaskFinished,
    tasks: [
      {
        title: "Daily Task",
        completed: true,
        logo: {
          uri: Img.CommonTask,
        },
        active: false,
      },
      {
        title: "Watch Video",
        completed: true,
        logo: {
          uri: Img.WatchVideo,
        },
        active: false,
      },
    ],
  },
];
