import { Img } from "@/utilitiy/images";
import { PartnerLogos } from "@/utilitiy/partnerLogos";

type RewardType = "CNTP" | "Key" | "Ticket";
type TaskType = "social" | "partner";

export enum Partners {
  mhaya = "4",
  stabilityAi = "5",
}

export interface Quiz {
  title: string;
  caption: string;
  questions: QuizQuestion[];
  reward: number;
  rewardAsset?: RewardType;
}

export interface QuizQuestion {
  quest: string;
  options: string[];
  answerIndex: number;
  timer: number;
}

export interface TaskCategory {
  categoryId: string;
  title: string;
  icon?: string;
  tasks: Task[];
  reward?: number;
  rewardAsset?: RewardType;
  completed?: boolean;
}

export interface Task {
  taskId: string;
  title: string;
  type?: TaskType;
  completed?: boolean;
  logo?: {
    uri?: string;
    color?: string;
    size?: number;
  };
  resource?: string;
  caption?: string;
  referral?: boolean;
  extraInstruction?: string;
  cta?: string;
  quiz?: boolean;
  claim?: boolean;
  active: boolean;
  comingSoon?: boolean;
  reward?: number;
  rewardAsset?: RewardType;
}

export const dailyQuiz: Quiz = {
  reward: 1,
  rewardAsset: "Ticket",
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

export const taskCategories: TaskCategory[] = [
  {
    categoryId: "referral",
    title: "Send Invitation",
    icon: Img.TaskInvitation,
    completed: false,
    tasks: [
      {
        taskId: "referral_task-1",
        title: "Invite Friends",
        completed: false,
        caption:
          "Share your referral link and earn CNTP when your friends are mining!",
        referral: true,
        active: true,
      },
    ],
  },
  {
    categoryId: "daily-rewards",
    title: "Daily Rewards",
    icon: Img.TaskDaily,
    tasks: [
      {
        taskId: "daily-rewards_task-1",
        title: "Daily Claim",
        claim: true,
        logo: {
          uri: Img.DailyClaim,
        },
        caption:
          "Claim daily rewards and earn Tickets by logging in each day without skipping!",
        cta: "Claim today’s reward",
        active: true,
        comingSoon: false,
      },
    ],
  },
  {
    categoryId: "social",
    title: "Join Us",
    icon: Img.TaskJoin,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "social_task-1",
        title: "Follow Us on X",
        type: "social",
        completed: false,
        logo: {
          uri: Img.TwitterX,
          color: "#000000",
        },
        caption:
          "Follow Us on X, like and share our pinned post, earn Tickets just for staying connected!",
        extraInstruction:
          "*You have 2 minutes to do it so we can confirm that the task has been completed",
        cta: "Open X",
        resource: "https://x.com/conet_network?lang=en",
        active: true,
      },
      {
        taskId: "social_task-2",
        title: "Join our Community",
        type: "social",
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
        taskId: "social_task-3",
        title: "Join our Server",
        type: "social",
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
        comingSoon: true,
      },
    ],
  },
  {
    categoryId: "daily-tasks",
    title: "Daily Tasks",
    icon: Img.TaskDaily,
    completed: false,
    tasks: [
      {
        taskId: "daily-tasks_task-1",
        title: "Quiz",
        completed: false,
        logo: {
          uri: Img.TaskQuiz,
        },
        quiz: true,
        active: true,
        comingSoon: true,
      },
      {
        taskId: "daily-tasks_task-2",
        title: "Interact with Us on X",
        completed: false,
        logo: {
          uri: Img.TwitterX,
          color: "#000000",
        },
        active: false,
        comingSoon: true,
      },
    ],
  },
  {
    categoryId: "partners",
    title: "Partners",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "partners_task-1",
        title: "TITLE HERE",
        completed: false,
        caption: "CAPTION HERE",
        extraInstruction: "EXTRA INSTRUCTION HERE",
        logo: {
          uri: Img.CoNETPartner,
          size: 100,
        },
        active: false,
        comingSoon: false,
      },
    ],
  },
  {
    categoryId: "mhaya",
    title: "Mhaya",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "mhaya_task-1",
        title: "Join Mhaya Bot",
        type: "partner",
        completed: false,
        caption: "Monopoly Airdrop USDT",
        extraInstruction: "Ends on 10/03/2022 11:59 PM",
        reward: 1,
        rewardAsset: "Ticket",
        resource: "https://t.me/mhaya_bot?start=28ABuxL1YEC",
        logo: {
          uri: PartnerLogos.MhayaLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram",
      },
    ],
  },
  {
    categoryId: "stability-world-ai",
    title: "Stability World AI",
    icon: Img.TaskExtras,
    reward: 1,
    rewardAsset: "Ticket",
    completed: false,
    tasks: [
      {
        taskId: "stability-world-ai_task-1",
        title: "Follow Stability World AI",
        type: "partner",
        completed: false,
        caption:
          "🎨 Stability World AI: Your One-Stop Generative AI Platform for Web3 Users",
        extraInstruction: "Ends on 10/03/2022 11:59 PM",
        resource: "https://x.com/StabilityW_AI",
        logo: {
          uri: PartnerLogos.StabilityAiLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open X",
      },
      {
        taskId: "stability-world-ai_task-2",
        title: "Join Stability World AI Bot",
        type: "partner",
        completed: false,
        caption:
          "🎨 Stability World AI: Your One-Stop Generative AI Platform for Web3 Users",
        extraInstruction: "Ends on 10/03/2022 11:59 PM",
        resource:
          "https://t.me/stabilityworld_ai_bot/start?startapp=4AED88A3FDFCA3B3",
        logo: {
          uri: PartnerLogos.StabilityAiLogo,
          size: 100,
        },
        active: true,
        comingSoon: false,
        cta: "Open Telegram",
      },
    ],
  },
  {
    categoryId: "finished-tasks",
    title: "Finished Tasks",
    icon: Img.TaskFinished,
    tasks: [
      {
        taskId: "finished-tasks_task-1",
        title: "Daily Task",
        completed: true,
        logo: {
          uri: Img.CommonTask,
        },
        active: true,
        comingSoon: true,
      },
      {
        taskId: "finished-tasks_task-2",
        title: "Watch Video",
        completed: true,
        logo: {
          uri: Img.WatchVideo,
        },
        active: false,
        comingSoon: true,
      },
    ],
  },
];
