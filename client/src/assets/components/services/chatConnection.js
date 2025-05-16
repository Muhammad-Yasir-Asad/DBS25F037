import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const chatConnection = new HubConnectionBuilder()
  .withUrl("https://localhost:7067/messagehub", {
    withCredentials: false, 
  })
  .withAutomaticReconnect({
    nextRetryDelayInMilliseconds: retryContext => {
      // Exponential backoff: retry after 0s, 2s, 10s, then 30s
      const delays = [0, 2000, 10000, 30000];
      return delays[retryContext.previousRetryCount] ?? 30000;
    }
  })
  .configureLogging(LogLevel.Information)
  .build();

export default chatConnection;
