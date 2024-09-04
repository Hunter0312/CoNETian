export interface TaskCategory {
  title: string;
  tasks: Task[];
}

export interface Task {
  title: string;
  reward: number;
  completed: boolean;
  logo?: {
    uri?: string;
    color: string;
  },
  resource?: string;
  caption?: string;
  referral?: boolean;
  cta?: string;
}

export const taskCategories = [
  {
    title: "Send Invitation",
    tasks: [
      {
        title: "Invite Friends",
        reward: 2,
        completed: false,
        caption: "Share your referral link and earn CNTP when your friends join us! It might take a time to process it.",
        referral: true,
      }
    ]
  },
  {
    title: "Join Us",
    tasks: [
      {
        title: "Follow Us on X",
        reward: 2,
        completed: true,
        logo: {
          color: "#000000",
        },
        caption: "Follow Us on X and earn CNTPs just for staying connected!",
        cta: "Open X",
        resource: "x.com/conet_network?lang=en"
      },
      {
        title: "Join our Community",
        reward: 2,
        completed: false,
        logo: {
          color: "#66ACDD",
        },
        caption: "Join our Community on Telegram and earn CNTPs just for staying connected!",
        cta: "Open Telegram",
        resource: "https://t.me/conet_network",
      },
      {
        title: "Join our Server",
        reward: 2,
        completed: false,
        logo: {
          color: "#5865F2",
        },
        caption: "Join our Server on Discord and earn CNTPs just for staying connected!",
        cta: "Open Discord",
        resource: "https://discord.gg/JrpMBFkewd",
      }
    ]
  },
  {
    title: "Daily Tasks",
    tasks: [
      {
        title: "Quiz",
        reward: 2,
        completed: false,
      },
      {
        title: "Interact with Us on X",
        reward: 2,
        completed: false,
        logo: {
          color: "#000000",
        }
      }
    ]
  },
  {
    title: "Extras",
    tasks: [
      {
        title: "Follow Collaborator",
        reward: 2,
        completed: true,
        logo: {
          color: "#CC00D0"
        }
      },
      {
        title: "Join Collab Community",
        reward: 2,
        completed: false,
        logo: {
          color: "#CC00D0"
        }
      },
      {
        title: "Try Collab Mini App",
        reward: 2,
        completed: false,
        logo: {
          color: "#CC00D0"
        }
      }
    ]
  },
  {
    title: "Finished Tasks",
    tasks: [
      {
        title: "Daily Task",
        reward: 2,
        completed: true,
      },
      {
        title: "Watch Video",
        reward: 2,
        completed: true,
      }
    ]
  }
];
