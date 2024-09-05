import { Img } from '@/utilitiy/images';

export interface TaskCategory {
  title: string;
  icon?: string;
  tasks: Task[];
}

export interface Task {
  title: string;
  reward: number;
  completed: boolean;
  logo?: {
    uri?: string;
    color?: string;
  },
  resource?: string;
  caption?: string;
  referral?: boolean;
  cta?: string;
  active: boolean;
}

export const taskCategories = [
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
        active: false,
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
