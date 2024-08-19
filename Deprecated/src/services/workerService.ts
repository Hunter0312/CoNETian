import { startWorker } from '@conet.project/seguro-worker-lib/build'

export const initializeWorkerService = async () => {
	const [status, container] = await startWorker()
}