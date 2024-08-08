import { v4 } from "uuid";

interface WorkerCommand {
  cmd: any;
  data?: any;
  uuid: string;
  err?: any;
}

const channelWrokerListenName = "toMainWroker";
export const _postMessage = (
  cmd: WorkerCommand,
  close: boolean,
  resolve: any,
  Callback?: (err: string, data: any[]) => void
) => {
  const channel = new BroadcastChannel(channelWrokerListenName);

  const kk = (e: any) => {
    listeningChannel(e.data, cmd.uuid);
  };

  const listenChannel = cmd.uuid ? new BroadcastChannel(cmd.uuid) : null;

  const listeningChannel = (data: any, uuid: string) => {
    let cmd: WorkerCommand;

    try {
      cmd = JSON.parse(data);
    } catch (ex) {
      return console.log(
        "class CONET_Platfrom_API",
        `listeningChannel JSON.parse(data) Error`
      );
    }

    if (close && listenChannel) {
      listenChannel.close();
    }

    if (cmd.err) {
      if (resolve) {
        return resolve([cmd.err, cmd.data]);
      }
      if (Callback) {
        return Callback(cmd.err, [cmd.data]);
      }
      return console.log(`postMessage Callback && resolve all null`, cmd.err);
    }
    if (resolve) {
      return resolve(["SUCCESS", cmd.data]);
    }
    if (Callback) {
      if (!cmd.data.length) {
        if (listenChannel) {
          listenChannel.close();
        }

        return Callback("", []);
      }
      return Callback("", cmd.data);
    }
    return console.log(`postMessage Callback && resolve all null`, cmd.data);
  };

  if (listenChannel) {
    listenChannel.addEventListener("message", kk);
  }
  channel.postMessage(JSON.stringify(cmd));
  channel.close();
};

export const createOrGetWallet: () => Promise<string> = () =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "createOrGetWallet",
      uuid: v4(),
      data: [],
    };
    return _postMessage(cmd, true, resolve);
  });

export const getWalletCCNTPBalance: (
  walletAddress: string
) => Promise<string> = (walletAddress: string) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "getWalletCCNTPBalance",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const importWallet: (walletPrivateKey: string) => Promise<string> = (
  walletPrivateKey: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "importWallet",
      uuid: v4(),
      data: [walletPrivateKey],
    };
    return _postMessage(cmd, true, resolve);
  });

export const startMining: (walletAddress: string) => Promise<string> = (
  walletAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "startMining",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const stopMining: (walletAddress: string) => Promise<string> = (
  walletAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "stopMining",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

export const getRouletteResult: (walletAddress: string) => Promise<string> = (
  walletAddress: string
) =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "getRouletteResult",
      uuid: v4(),
      data: [walletAddress],
    };
    return _postMessage(cmd, true, resolve);
  });

  export const registerReferrer: (
    referrerAddr: string
  ) => Promise<any> = (referrerAddr) =>
    new Promise((resolve) => {
      const cmd: WorkerCommand = {
        cmd: "registerReferrer",
        uuid: v4(),
        data: [referrerAddr],
      };
      return _postMessage(cmd, true, resolve);
    });
