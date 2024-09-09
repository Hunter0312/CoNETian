import { Img } from '@/utilitiy/images';

type RewardType = "CNTP" | "KEY" | "TICKET";

export interface TaskCategory {
  title: string;
  icon?: string;
  tasks: Task[];
}

export interface Day {
  day: number;
  reward: number;
  type: RewardType;
}

export interface Task {
  title: string;
  reward?: number;
  completed?: boolean;
  logo?: {
    uri?: string;
    color?: string;
  },
  resource?: string;
  caption?: string;
  referral?: boolean;
  cta?: string;
  quiz?: boolean;
  claim?: boolean;
  active: boolean;
}

export const dailyClaims: Day[] = [
  {
    day: 1,
    reward: 1,
    type: "CNTP",
  },
  {
    day: 2,
    reward: 1,
    type: "CNTP",
  },
  {
    day: 3,
    reward: 1,
    type: "CNTP",
  },
  {
    day: 4,
    reward: 1,
    type: "CNTP",
  },
  {
    day: 5,
    reward: 1,
    type: "TICKET",
  },
  {
    day: 6,
    reward: 1,
    type: "CNTP",
  },
  {
    day: 7,
    reward: 1,
    type: "KEY",
  },
]

export const taskCategories: TaskCategory[] = [
  {
    title: "Send Invitation",
    icon: Img.TaskInvitation,
    tasks: [
      {
        title: "Invite Friends",
        reward: 2,
        completed: false,
        caption: "Share your referral link and earn CNTP when your friends join us! It might take a time to process it.",
        referral: true,
        active: true,
      }
    ]
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
        caption: "Claim daily rewards and earn CNTPs by logging in each day without skipping!",
        cta: "Claim today’s reward",
        active: true,
      }
    ]
  },
  {
    title: "Join Us",
    icon: Img.TaskJoin,
    tasks: [
      {
        title: "Follow Us on X",
        reward: 2,
        completed: true,
        logo: {
          uri: Img.TwitterX,
          color: "#000000",
        },
        caption: "Follow Us on X and earn CNTPs just for staying connected!",
        cta: "Open X",
        resource: "x.com/conet_network?lang=en",
        active: true,
      },
      {
        title: "Join our Community",
        reward: 2,
        completed: false,
        logo: {
          uri: Img.Telegram,
          color: "#66ACDD",
        },
        caption: "Join our Community on Telegram and earn CNTPs just for staying connected!",
        cta: "Open Telegram",
        resource: "https://t.me/conet_network",
        active: true,
      },
      {
        title: "Join our Server",
        reward: 2,
        completed: false,
        logo: {
          uri: Img.Discord,
          color: "#5865F2",
        },
        caption: "Join our Server on Discord and earn CNTPs just for staying connected!",
        cta: "Open Discord",
        resource: "https://discord.gg/JrpMBFkewd",
        active: true,
      }
    ]
  },
  {
    title: "Daily Tasks",
    icon: Img.TaskDaily,
    tasks: [
      {
        title: "Quiz",
        reward: 2,
        completed: false,
        logo: {
          uri: Img.TaskQuiz,
        },
        quiz: true,
        active: true,
      },
      {
        title: "Interact with Us on X",
        reward: 2,
        completed: false,
        logo: {
          uri: Img.TwitterX,
          color: "#000000",
        },
        active: true,
      }
    ]
  },
  {
    title: "Extras",
    icon: Img.TaskExtras,
    tasks: [
      {
        title: "Follow Collaborator",
        reward: 2,
        completed: true,
        logo: {
          color: "#CC00D0"
        },
        active: true,
      },
      {
        title: "Join Collab Community",
        reward: 2,
        completed: false,
        logo: {
          color: "#CC00D0"
        },
        active: true,
      },
      {
        title: "Try Collab Mini App",
        reward: 2,
        completed: false,
        logo: {
          color: "#CC00D0"
        },
        active: true,
      }
    ]
  },
  {
    title: "Finished Tasks",
    icon: Img.TaskFinished,
    tasks: [
      {
        title: "Daily Task",
        reward: 2,
        completed: true,
        logo: {
          uri: Img.CommonTask,
        },
        active: true,
      },
      {
        title: "Watch Video",
        reward: 2,
        completed: true,
        logo: {
          uri: Img.WatchVideo,
        },
        active: true,
      }
    ]
  }
];
