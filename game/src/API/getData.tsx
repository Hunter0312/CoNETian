import { importWallet, startMining, stopMining, getRouletteResult, registerReferrer, clearStorage, getTicketResult, checkTwitter, checkTelegram, saveGameProfileInfo, unlockTicket } from ".";

export const fetchImportWallet = async (walletPrivateKey: string): Promise<any> => {
    try {
        const response = await importWallet(walletPrivateKey);
        if (Array.isArray(response) && response.length >= 2) {
            const [status] = response;
            if (status === "SUCCESS") {
                return response[1][0];
            } else {
                console.error("Failed to import wallet");
            }
        }
    } catch (error) {
        console.error("Failed to import wallet", error);
    }

    return { error: true, message: "Failed to import wallet" };
}

export const fetchStartMining = async (walletAddress: string): Promise<any> => {
    try {
        const response = await startMining(walletAddress);

        if (Array.isArray(response) && response.length >= 2) {
            const [status, data] = response;
            if (status === "SUCCESS") {
                try {
                    const parsedData = JSON.parse(data[1]);
                    return parsedData;
                } catch (error) {
                    console.error("Failed to parse mining data", error);
                }
            } else {
                console.error("Failed to start mining");
            }
        }
    } catch (error) {
        console.error("Error to start mining", error);
    }

    return { error: true, message: `Failed to start mining. Please check if someone else is mining in your network.` };
}

export const fetchstopMining = async (walletAddress: string): Promise<any> => {
    try {
        const response = await stopMining(walletAddress);
        if (Array.isArray(response) && response.length >= 2) {
            const [status, address] = response;
            if (status === "SUCCESS") {
                return status;
            } else {
                console.error("Failed to stop mining");
            }
        }
    } catch (error) {
        console.error("Failed to stop mining", error);
    }

    return { error: true, message: "Failed to stop mining" };
}

export const fetchRouletteResult = async (walletAddress: string): Promise<any> => {
    if (walletAddress) {
        try {
            const response = await getRouletteResult(walletAddress);

            if (Array.isArray(response) && response.length >= 2) {
                const [status, data] = response;
                if (status === "SUCCESS") {
                    return { possibleValues: data[0]?.lotterRate || null, valueWon: data[0]?.lottery || 0 };
                } else {
                    console.error("Failed to fetch roulette result. Please try again later.");
                }
            }
        } catch (error) {
            console.error("Failed to fetch roulette result. Please try again later.", error);
        }
    }

    return { error: true, message: "Failed to fetch roulette result. Please try again later." };
}

export const fetchUnlockTicket = async (walletAddress: string): Promise<any> => {
    if (walletAddress) {
        try {
            const response = await unlockTicket(walletAddress);

            if (Array.isArray(response) && response.length >= 2) {
                const [status, data] = response;
                if (status === "SUCCESS") {
                    const isUnlockProcessStarted = data[0];
                    return isUnlockProcessStarted;
                } else {
                    console.error("Failed to unlock ticket. Please try again later.");
                    return { error: true, message: "Failed to unlock ticket. Please try again later." };
                }
            }
        } catch (error) {
            console.error("Failed to unlock ticket. Please try again later.", error);
            return { error: true, message: "Failed to unlock ticket. Please try again later." };
        }
    }

    return { error: true, message: "Failed to unlock ticket. Please try again later." };
}

export const fetchCheckTwitter = async (walletAddress: string, userName: string): Promise<any> => {
    if (walletAddress && userName) {
        try {
            const response = await checkTwitter(walletAddress, userName);
            if (Array.isArray(response) && response.length >= 2) {
                const [status, data] = response;
                if (status === "SUCCESS") {
                    return { response: data[0] || {} };
                } else {
                    console.error("Failed to check twitter. Please try again later.");
                }
            }
        } catch (error) {
            console.error("Failed to check twitter. Please try again later.", error);
        }
    }
}

export const fetchCheckTelegram = async (walletAddress: string, telegramId: string): Promise<any> => {
    if (walletAddress && telegramId) {
        try {
            const response = await checkTelegram(walletAddress, telegramId);
            if (Array.isArray(response) && response.length >= 2) {
                const [status, data] = response;
                if (status === "SUCCESS") {
                    return { response: data[0] || {} };
                } else {
                    console.error("Failed to check telegram. Please try again later.");
                }
            }
        } catch (error) {
            console.error("Failed to check telegram. Please try again later.", error);
        }
    }
}

export const fetchTicketResult = async (walletAddress: string): Promise<any> => {
    if (walletAddress) {
        try {
            const response = await getTicketResult(walletAddress);

            if (Array.isArray(response) && response.length >= 2) {
                const [status, data] = response;
                if (status === "SUCCESS") {
                    return { ticket: data[0]?.ticket || 0 };
                } else {
                    console.error("Failed to fetch ticket result. Please try again later.");
                }
            }
        } catch (error) {
            console.error("Failed to fetch ticket result. Please try again later.", error);
        }
    }

    return { error: true, message: "Failed to fetch ticket result. Please try again later." };
}

export const fetchRegisterReferrer = async (referrerAddress: string): Promise<any> => {
    try {
        const response = await registerReferrer(referrerAddress);

        if (Array.isArray(response) && response.length >= 2) {
            const [status, data] = response;
            if (status === "SUCCESS") {
                return data[0];
            } else {
                console.error("Failed to add referrer");
            }
        }
    } catch (error) {
        console.error("Failed to add referrer", error);
    }

    return { error: true, message: "Failed to add referrer" };
}

export const fetchClearStorage = async (): Promise<any> => {
    try {
        const response = await clearStorage();

        if (Array.isArray(response) && response.length >= 2) {
            const [status, data] = response;
            if (status === "SUCCESS") {
                return true
            } else {
                console.error("Failed to clear storage");
            }
        }
    } catch (error) {
        console.error("Failed to clear storage", error);
    }

    return { error: true, message: "Failed to clear storage" };
}

export const fetchSaveGameProfileInfo = async (walletAddress: string, gameProfileData: any): Promise<any> => {
    try {
        const response = await saveGameProfileInfo(walletAddress, gameProfileData);

        if (Array.isArray(response) && response.length >= 2) {
            const [status, data] = response;
            if (status === "SUCCESS") {
                return true
            } else {
                console.error("Failed to save game profile info");
            }
        }
    } catch (error) {
        console.error("Failed to save game profile info", error);
    }

    return { error: true, message: "Failed to save game profile info" };
}
