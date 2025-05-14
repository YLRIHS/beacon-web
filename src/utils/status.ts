export const showMessage = (status: number | string): string => {
    let message: string = "";
    switch (status) {
      // case 400:
      //   message = "Request Error(400)";
      //   break;
      case 401:
        message = "Unauthorized, please log in again.(401)";
        break;
      case 403:
        message = "Access Denied.(403)";
        break;
      case 404:
        message = "Request Error.(404)";
        break;
      case 408:
        message = "Request Timeout.(408)";
        break;
      case 500:
        message = "Server Error.(500)";
        break;
      case 501:
        message = "Service Unavailable.(501)";
        break;
      case 502:
        message = "Network Error.(502)";
        break;
      case 503:
        message = "Service Unavailable.(503)";
        break;
      case 504:
        message = "Network Timeout.(504)";
        break;
      case 505:
        message = "HTTP Version Not Supported.(505)";
        break;
      default:
        message = `Connection Error (${status})!`;
    }
    return `${message}`;
  };