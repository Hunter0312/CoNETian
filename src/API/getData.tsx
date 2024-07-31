import { createOrGetWallet, getWalletCCNTPBalance, importWallet, startMining, stopMining, getRouletteResult } from ".";

export const fetchWalletData = async () => {
    try {
        const response = await createOrGetWallet();
        if (Array.isArray(response) && response.length >= 2) {
            const [status] = response;
            if (status === "SUCCESS") {
                return response;
            } else {
                console.error("Failed to fetch wallet data");
            }
        }
    } catch (error) {
        console.error("Error fetching wallet Data", error);
    }
}

export const fetchCNTPBalance = async (walletAddress: string) => {
    try {
        const response = await getWalletCCNTPBalance(walletAddress);
        if (Array.isArray(response) && response.length >= 2) {
            const [status, balance] = response;
            if (status === "SUCCESS") {
                return response;
            } else {
                console.error("Failed to fetch CNTP balance");
            }
        }
    } catch (error) {
        console.error("Error fetching CNTP balance", error);
    }
};

export const fetchImportWallet = async (walletPrivateKey: string) => {
    try {
        const response = await importWallet(walletPrivateKey);
        if (Array.isArray(response) && response.length >= 2) {
            const [status] = response;
            if (status === "SUCCESS") {
                return response[1][0][0];
            } else {
                console.error("Failed to import wallet");
                return { error: true, message: "Failed to import wallet" };
            }
        }
    } catch (error) {
        console.error("Error importing wallet", error);
        return { error: true, message: "Error importing wallet" };
    }
}

export const fetchStartMining = async (walletAddress: string) => {
    try {
        const response = await startMining(walletAddress);

        if (Array.isArray(response) && response.length >= 2) {
            const [status, data] = response;
            if (status === "SUCCESS") {
                try {
                    const parsedData = JSON.parse(data[1]);
                    return parsedData;
                } catch (error) {
                    console.error("Error parsing mining data", error);
                }
            } else {
                console.error("Failed to start mining");
            }
        }
    } catch (error) {
        console.error("Error in startMining", error);
    }
}

export const fetchstopMining = async (walletAddress: string) => {
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
        console.error("Error stopMining", error);
    }
}


export const fetchRouletteResult = async (walletAddress: string) => {
    if (walletAddress) {
        try {
            const response = await getRouletteResult(walletAddress);

            if (Array.isArray(response) && response.length >= 2) {
                const [status, data] = response;
                if (status === "SUCCESS") {
                    try {
                        return data[0].lottery;
                    } catch (error) {
                        console.error("Error fetching roulette data", error);
                    }
                } else {
                    console.error("Failed to fetch roulette data");
                }
            }
        } catch (error) {
            console.error("Error in fetching roulette data", error);
        }
    }
}
